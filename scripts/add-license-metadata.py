#!/usr/bin/env python3
"""Embed project licence and attribution as GeoJSON foreign members."""

import json
import re
import sys
from pathlib import Path


LICENSE_FIELDS = {
    "license": {
        "name": "Creative Commons Attribution-ShareAlike 4.0 International",
        "identifier": "CC BY-SA 4.0",
        "url": "https://creativecommons.org/licenses/by-sa/4.0/",
    },
    "attribution": "Copyright © 2026 Oleksii Boiko (https://oleksaboyko.com).",
    "license_statement": (
        "Except where otherwise noted, this processed geospatial dataset is licensed "
        "under CC BY-SA 4.0. Credit Oleksii Boiko, link to the licence, indicate changes, "
        "and distribute adaptations under the same or a compatible licence. WorldPop "
        "source data remain under CC BY 4.0; other third-party material retains its "
        "original licence."
    ),
}


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit(f"Usage: {Path(sys.argv[0]).name} /path/to/dataset.geojson")

    path = Path(sys.argv[1])
    text = path.read_text()
    match = re.search(r'(?m)(?P<indent>^[ \t]*)?"features"\s*:\s*\[', text)
    if match is None:
        raise SystemExit(f"FeatureCollection marker not found in {path}")
    position = match.start()
    indent = match.group("indent") or ""

    header = text[:position]
    if '"license":' in header or '"license_statement":' in header:
        raise SystemExit(f"Licence metadata already exists in {path}")

    fields = "".join(
        f'{indent}"{key}": {json.dumps(value, ensure_ascii=False)},\n'
        for key, value in LICENSE_FIELDS.items()
    )
    updated = text[:position] + fields + text[position:]
    json.loads(updated)
    path.write_text(updated)


if __name__ == "__main__":
    main()
