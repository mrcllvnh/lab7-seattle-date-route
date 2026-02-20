// 1) Map + Scrollama
let map, scriptPanel = scrollama();

// 2) IMPORTANT: Add your Mapbox token
mapboxgl.accessToken = "PASTE_YOUR_MAPBOX_TOKEN_HERE";

// 3) Initialize the Mapbox map
map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v10",
  center: [-122.344, 47.651], // Fremont-ish
  zoom: 12.5,
  pitch: 0
});

// Optional: add navigation controls
map.addControl(new mapboxgl.NavigationControl());

// 4) (Optional) keep layout responsive
function adjustStoryboardlSize() {
  // Mapbox automatically handles resizing most of the time,
  // but this helps on some screens.
  map.resize();
}
window.addEventListener("resize", adjustStoryboardlSize);

// 5) Load GeoJSON dataset and then run dependent logic
async function geojsonFetch() {
  const response = await fetch("data/stops.geojson");
  const stops = await response.json();

  map.on("load", () => {
    // Add source + layer
    map.addSource("stops-src", {
      type: "geojson",
      data: stops
    });

    map.addLayer({
      id: "stops-layer",
      type: "circle",
      source: "stops-src",
      paint: {
        "circle-radius": 7,
        "circle-opacity": 0.85,
        "circle-stroke-width": 1.5
      }
    });

    // Popup on click
    map.on("click", "stops-layer", (e) => {
      const p = e.features[0].properties;
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(`<strong>${p.name}</strong><br/>${p.desc}`)
        .addTo(map);
    });

    // Change cursor on hover
    map.on("mouseenter", "stops-layer", () => {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", "stops-layer", () => {
      map.getCanvas().style.cursor = "";
    });

    // Initialize Scrollama
    scriptPanel
      .setup({
        step: ".scene",
        offset: 0.33,
        debug: false
      })
      .onStepEnter(handleSceneEnter)
      .onStepExit(handleSceneExit);

    // 6) Scene enter behavior
    function handleSceneEnter(response) {
      const index = response.index;

      if (index === 0) {
        // Scene 0: Afternoon
        map.flyTo({
          center: [-122.344, 47.651],
          zoom: 12.5,
          pitch: 0,
          speed: 0.6
        });

        map.setFilter("stops-layer", ["==", ["get", "scene"], 0]);

        document.getElementById("cover").style.visibility = "hidden";
      }

      if (index === 1) {
        // Scene 1: Evening
        map.flyTo({
          center: [-122.320, 47.614],
          zoom: 13.5,
          pitch: 0,
          speed: 0.6
        });

        map.setFilter("stops-layer", ["==", ["get", "scene"], 1]);

        document.getElementById("cover").style.visibility = "hidden";
      }
    }

    // 7) Scene exit behavior (mostly cover visibility)
    function handleSceneExit(response) {
      const index = response.index;

      if (index === 0) {
        if (response.direction === "up") {
          document.getElementById("cover").style.visibility = "visible";
        }
      }
    }

    // Start with Scene 0 filter by default
    map.setFilter("stops-layer", ["==", ["get", "scene"], 0]);
  });
}

// Run
geojsonFetch();
