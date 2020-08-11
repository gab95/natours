export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZ2Fib29vb29vb29vb29vb29vIiwiYSI6ImNrZGdkcTd4NzJhaHgzNHNneHdyemF4NmQifQ.y_jxnSrm-SyU5OjhnxqVWw';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/gabooooooooooooooo/ckdgeemoq054t1jlja63wr4wp',
    scrollZoom: false,
    // center: [-118.036863, 34.103212],
    // zoom: 10,
    // interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();
  locations.forEach((loc) => {
    //create marker
    const el = document.createElement('div');
    el.className = 'marker';

    //add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    //add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    //extends map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
