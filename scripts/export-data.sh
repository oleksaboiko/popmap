#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 /absolute/path/to/admin_3_ua.gpkg" >&2
  exit 2
fi

SOURCE_GPKG="$1"
SCRIPT_DIRECTORY="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIRECTORY="$(dirname "$SCRIPT_DIRECTORY")"
OUTPUT_GEOJSON="$PROJECT_DIRECTORY/data/admin3-population.geojson"

ogr2ogr \
  -f GeoJSON \
  "$OUTPUT_GEOJSON" \
  "$SOURCE_GPKG" \
  -dialect SQLite \
  -sql "SELECT CASE WHEN COD_3 IS NULL OR TRIM(COD_3) = '' THEN 'FID-' || CAST(fid AS TEXT) ELSE COD_3 END AS unit_id, ADMIN_1, ADMIN_2, ADMIN_3, TYPE, CAST(ROUND(p2021) AS INTEGER) AS p2021, CAST(ROUND(p2022) AS INTEGER) AS p2022, CAST(ROUND(p2023) AS INTEGER) AS p2023, CAST(ROUND(p2024) AS INTEGER) AS p2024, CAST(ROUND(p2025) AS INTEGER) AS p2025, CAST(ROUND(p2026) AS INTEGER) AS p2026, geom FROM admin_3" \
  -simplify 100 \
  -t_srs EPSG:4326 \
  -lco RFC7946=YES \
  -lco COORDINATE_PRECISION=5

echo "Created $OUTPUT_GEOJSON"
