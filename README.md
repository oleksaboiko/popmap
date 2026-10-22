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
- Bootstrap 5.3.8 / Bootswatch Default interface styling;
- an optimized 100 m simplified GeoJSON layer.

The web layer contains 1,780 polygons and is approximately 5.3 MB before HTTP compression and approximately 1.5 MB compressed.

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

## Publication checklist

Before publishing, document:

- the authoritative boundary and population sources;
- whether 2022–2026 values are observations, estimates or projections;
- the reference date for each year;
- the licence that permits public redistribution;
- why the layer includes 303 councils and six state territories in addition to territorial communities;
- the treatment of occupied territories and boundary changes.

The map currently uses MapLibre GL JS 6.15.0 from UNPKG and the Bootswatch Default (standard Bootstrap 5.3.8) stylesheet from jsDelivr. For a long-lived production deployment, consider vendoring these dependencies or adding an npm build that pins and bundles them.
