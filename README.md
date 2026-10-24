# Ukraine population change map

A buildless, GitHub-Pages-compatible prototype for exploring the population attributes in `admin_3_ua.gpkg` from 2021 through 2026.

## What is included

- animated 2021–2026 timeline;
- absolute population and change-since-2021 views;
- Viridis thematic colours imported from the supplied QGIS colour ramp;
- OpenStreetMap background tiles with attribution;
- admin-3 search;
- click details and a six-year sparkline;
- responsive desktop/mobile layout;
- Ukrainian and English interface locales;
- bilingual Dublin Core / DCAT metadata with JSON-LD and Turtle/RDF serializations;
- Bootstrap 5.3.8 / Bootswatch Default interface styling;
- an optimized 100 m simplified GeoJSON layer.

The web layer contains 1,780 polygons and is approximately 5.3 MB before HTTP compression and approximately 1.5 MB compressed.

## Authorship and AI assistance

The mapped dataset was created by [Oleksii Boiko](https://oleksaboyko.com). This repository and its GitHub Pages site were created with assistance from OpenAI GPT-5.6 Sol.

## Licence

Except where otherwise noted, the original material in this repository is licensed under the [Creative Commons Attribution-ShareAlike 4.0 International licence (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/). See [LICENSE.md](LICENSE.md) for attribution requirements and third-party licence exceptions.

## Dataset metadata

The [human-readable metadata page](metadata/) documents the dataset’s scope, methodology, administrative composition, territorial treatment, provenance, limitations and recommended uses in Ukrainian and English. Machine-readable records are available as [JSON-LD](metadata/dataset.jsonld) and [Turtle/RDF](metadata/dataset.ttl), using Dublin Core Terms, DCAT 3, PROV-O and the Data Quality Vocabulary (DQV).

The source URL, publication/reference date and licence for the Ministry of Infrastructure’s Ukraine Legacy Admin 3 boundary layer were not supplied when this metadata was prepared. The metadata records that gap explicitly; it should be completed when authoritative source details become available.

## Preview locally

Do not open `index.html` by double-clicking it: browsers block the module and GeoJSON requests from a `file://` URL. In this directory, run:

```bash
./serve-local.sh
```

Then open <http://127.0.0.1:8000>.

Alternatively, use Python directly:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Regenerate the web layer

Requires GDAL/OGR:

```bash
./scripts/export-data.sh "/absolute/path/to/admin_3_ua.gpkg"
```

The script rounds population values to whole people, transforms geometry from EPSG:3035 to EPSG:4326, simplifies it by 100 metres and writes RFC 7946 GeoJSON.

## Publish with GitHub Pages

1. Create a public GitHub repository.
2. Copy the contents of this directory to the repository root and push `main`.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main`, `/(root)`, and save.

The resulting address will normally be `https://<account>.github.io/<repository>/`.

The map currently uses MapLibre GL JS 6.15.0 from UNPKG and the Bootswatch Default (standard Bootstrap 5.3.8) stylesheet from jsDelivr. For a long-lived production deployment, consider vendoring these dependencies or adding an npm build that pins and bundles them.
