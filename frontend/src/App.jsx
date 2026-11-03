import { useEffect, useRef } from "react";
import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import "./App.css";
import Navbar from './components/Navbar';

function App() {
  const cesiumContainer = useRef(null);

  useEffect(() => {
    const viewer = new Cesium.Viewer(cesiumContainer.current, {
      animation: false,
      timeline: false,
      baseLayerPicker: false,
      baselayer:false,
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      fullscreenButton: false,
      globe: new Cesium.Globe(Cesium.Ellipsoid.MARS),
    });
    viewer.imageryLayers.removeAll();
    viewer.imageryLayers.addImageryProvider(
  new Cesium.UrlTemplateImageryProvider({
    url: "https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg",
    tilingScheme: new Cesium.GeographicTilingScheme({
      ellipsoid: Cesium.Ellipsoid.MARS,
    }),
  })
);
  viewer.scene.skyAtmosphere.show = false;
  viewer.scene.globe.showGroundAtmosphere = false;
  const marsRadius = Cesium.Ellipsoid.MARS.maximumRadius;
  viewer.scene.screenSpaceCameraController.minimumZoomDistance = 1_000;
  viewer.scene.screenSpaceCameraController.maximumZoomDistance =
    marsRadius * 50;
  const markerLongitude = 77.58;
  const markerLatitude = 18.38;
  const markerPosition = Cesium.Cartesian3.fromDegrees(
    markerLongitude,
    markerLatitude,
    1000,
    Cesium.Ellipsoid.MARS,
  );
  viewer.entities.add({
    name: "Jezero Crater marker",
    position: markerPosition,
    label: {
      text: "●",
      font: "28px sans-serif",
      fillColor: Cesium.Color.YELLOW,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 3,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
    },
  });
  viewer.entities.add({
    name: "Jezero Crater label",
    position: markerPosition,
    label: {
      text: "Jezero Crater",
      font: "14px sans-serif",
      fillColor: Cesium.Color.WHITE,
      showBackground: true,
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      pixelOffset: new Cesium.Cartesian2(18, -22),
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
    },
  });

  viewer.camera.lookAt(
    markerPosition,
    new Cesium.HeadingPitchRange(
      0,
      -Cesium.Math.PI_OVER_FOUR,
      marsRadius * 2.5,
    ),
  );

    return () => {
      viewer.destroy();
    };
  }, []);

  return (
    <>
    <Navbar />
    <div
      ref={cesiumContainer}
      style={{
        width: "100%",
        height: "calc(100vh - 60px)",
      }}
      
      />
      </>
  );
}

export default App;