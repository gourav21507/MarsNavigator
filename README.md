# MarsNavigator

MarsNavigator is an interactive 3D Mars exploration platform. It combines NASA/JPL Mars Trek imagery and map services with a CesiumJS globe so users can inspect the Martian surface, explore recorded rover locations, and experiment with terrain-aware route planning.

## What you can explore

- Navigate a Mars-sized 3D globe: rotate, zoom, and tilt the view.
- View the global Viking MDIM 2.1 color mosaic, with optional higher-resolution image coverage over parts of Gale Crater (Curiosity HiRISE) and the InSight landing region (CTX).
- Turn on optional MOLA/HRSC color-shaded terrain and MGS TES thermal-inertia layers.
- Explore Curiosity and Perseverance traverse records, named stops, and landing information, plus named surface features and regional labels. These are historical map records, not live rover-location feeds.
- Look up place information and elevation samples from NASA Mars Trek services.
- Try the experimental “Find a lower-risk terrain route” planner between coordinates. It samples a bounded grid of elevation values and returns an any-angle route with terrain summaries and confidence limitations.

Optional overlays start off and can be enabled individually in the Layers view. The global Viking mosaic is approximately 232 m/pixel; local high-resolution layers only apply within their published coverage areas. Zooming farther in cannot reveal detail that the source imagery does not contain.

## Terrain-aware route planning

The route planner requests elevation samples from NASA Mars Trek’s MOLA/HRSC blended DEM at planning time; it does not bundle a global elevation raster. The backend evaluates sampled slope, local relief and elevation change, mapped geology zones, supplied hazard areas, and DEM-detected closed depressions. It assigns terrain costs and uses Theta* search to find any-angle paths. Restricted or unknown cells and slopes over the configured limit are blocked; supplied non-restricted hazard areas add cost. Endpoint adjustments and actual grid resolution are returned when applicable.

This is an experimental planning aid. The configured slope, roughness, elevation-change, geology, and hazard costs are prototype assumptions, not NASA human-traverse standards or NASA-endorsed recommendations. DEM-based depression detection can miss craters, and terrain between coarse samples is not evaluated. MOLA cannot resolve astronaut-scale hazards such as small rocks or cracks; the planner does not have a complete hazard inventory. Results are labelled low confidence and are not certified for mission use.

The backend endpoint is `POST /api/navigation/terrain`. It accepts `start` and `destination` objects with decimal-degree `latitude` and `longitude`, an optional `resolutionMeters`, and an optional `hazards` array. See [CONTRIBUTING.md](CONTRIBUTING.md) for request details, configuration, and the complete data-source notes.

## NASA/JPL data and map resources

MarsNavigator uses the following NASA/JPL Mars Trek services and asset. Optional map layers are loaded from these public services when enabled or when their map features are needed.

### Global imagery and terrain

- [NASA/JPL Mars Trek](https://trek.nasa.gov/mars/)
- [Viking MDIM 2.1 global color mosaic](https://trek.nasa.gov/mars/trekarcgis/rest/services/Mars_Viking_MDIM21_ClrMosaic_global_232m/ImageServer)
- [MOLA/HRSC blended digital elevation model](https://trek.nasa.gov/mars/trekarcgis/rest/services/Mars_MOLA_blend200ppx_HRSC_DEM_clon0dd_200mpp_lzw/ImageServer)
- [MOLA/HRSC color-shaded relief](https://trek.nasa.gov/mars/trekarcgis/rest/services/Mars_MOLA_blend200ppx_HRSC_ClrShade_clon0dd_200mpp/ImageServer)
- [MGS TES thermal inertia WMTS](https://trek.nasa.gov/tiles/Mars/EQ/TES_Thermal_Inertia/1.0.0/WMTSCapabilities.xml)

### Rover and regional imagery

- [Curiosity HiRISE Gale Crater mosaic](https://trek.nasa.gov/mars/trekarcgis/rest/services/curiosity_hirise_mosaic/ImageServer)
- [Curiosity traverse path](https://trek.nasa.gov/mars/trekarcgis/rest/services/curiosity_path/MapServer/0)
- [Curiosity waypoints](https://trek.nasa.gov/mars/trekarcgis/rest/services/curiosity_waypoints/MapServer/0)
- [InSight CTX regional mosaic](https://trek.nasa.gov/mars/trekarcgis/rest/services/InSightCTXMosaic_112917_gcs/ImageServer)
- [Perseverance traverse path](https://trek.nasa.gov/mars/trekarcgis/rest/services/Perseverance_Traverse_Path/MapServer/0)
- [Perseverance named locations](https://trek.nasa.gov/mars/trekarcgis/rest/services/mars2020_waypoints/MapServer/0)
- [Perseverance landing ellipse](https://trek.nasa.gov/mars/trekarcgis/rest/services/perseverance_landing_ellipse/MapServer/0)
- [Jezero Crater image preview](https://trek.nasa.gov/assets/bookmarks/mars/perseverance/jezero-crater/jezero_crater.jpg) (a static preview, not a georeferenced mosaic)

### Place names and features

- [Outreach nomenclature feature layer](https://trek.nasa.gov/mars/trekarcgis/rest/services/outreach_nomenclature/MapServer/0)
- [Major surface features layer](https://trek.nasa.gov/mars/trekarcgis/rest/services/major_features/MapServer/0)
- [Mars regions layer](https://trek.nasa.gov/mars/trekarcgis/rest/services/mars_regions/MapServer/0)
- [USGS Gazetteer of Planetary Nomenclature](https://planetarynames.wr.usgs.gov/) (reference for approved planetary names)

The app attributes 14 NASA/JPL Mars Trek service layers in its Credits view. Provider credits do not imply endorsement. Check each provider’s current attribution and redistribution terms before reusing its data or assets.

## Architecture and technologies

- **3D map:** CesiumJS renders the globe and map overlays.
- **Server and API:** Node.js and Express serve the frontend and API; `cors` configures cross-origin API access and `dotenv` loads local environment settings.
- **Navigation:** Backend terrain sampling and analysis, with Theta* path search.
- **Local demonstration data:** `backend/Data/marsData.json` contains example landing sites, routes, hazards, and environmental values. These are application examples, not a live NASA feed or certified operational guidance. Route distance, travel time, oxygen, and battery values are project estimates.

The project does not use Google Maps tiles, data, or APIs. NASA/JPL/USGS resource use does not indicate provider endorsement.

## Run locally

Install dependencies and start the app:

```sh
npm install
npm start
```

Then open the local URL printed by the server. The map imagery and live feature/elevation services require network access. If the project’s available scripts differ by checkout, inspect `package.json`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for coding conventions, data-source details, terrain-planner behavior, API request/response information, and suggested checks before opening a pull request.
