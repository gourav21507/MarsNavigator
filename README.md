# MarsNavigator

MarsNavigator is a browser-based 3D Mars globe prototype. It uses CesiumJS to display Mars as a navigable globe, NASA/JPL Mars Trek Viking imagery as the map layer, and a labeled marker for Jezero Crater.

## Current functionality

- Displays a Mars ellipsoid in CesiumJS with the global Viking MDIM 2.1 color mosaic served by NASA Mars Trek.
- Lets users navigate the globe by rotating, zooming, and tilting the camera.
- Opens the view around Jezero Crater and keeps its marker and label positioned as the globe moves.
- Uses Cesium's Mars ellipsoid and imagery tiling scheme.

This repository's current app is a small interactive globe prototype. It does not currently implement terrain-aware route planning, rover traverse layers, hazard analysis, or a backend API.

## Project identity and technology

The application is named **MarsNavigator** in its interface.

- **Language:** JavaScript with JSX and CSS
- **UI:** React and React DOM
- **3D planetary globe:** CesiumJS
- **Development server and build:** Vite
- **Cesium build integration:** `vite-plugin-cesium`

The frontend application and its dependencies are in `frontend/`. There is no backend service in the current project structure.

## Data source

The current globe imagery is requested from [NASA/JPL Mars Trek](https://trek.nasa.gov/mars/) using its [Viking MDIM 2.1 global color mosaic tiles](https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg).

The imagery is a global reference mosaic. Its source resolution limits the surface detail available at close zoom levels. NASA/JPL resource use does not imply NASA or JPL endorsement of this project.

## Run locally

From the repository root:

```sh
cd frontend
npm install
npm run dev
```

Vite prints a local development URL when the server starts. To create a production build or preview it locally:

```sh
npm run build
npm run preview
```

## Project structure

```text
frontend/
  index.html
  package.json
  vite.config.js
  src/
    App.jsx
    App.css
    index.css
    main.jsx
    components/
      Navbar.jsx
```

The React entry point mounts the app, and `App.jsx` creates and cleans up the Cesium viewer, configures the Mars globe and imagery, and draws the Jezero marker overlay.
