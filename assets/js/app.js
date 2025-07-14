// The below contents and contents from assets/json/stores.json created from:
// (1) https://developers.google.com/codelabs/maps-platform/google-maps-simple-store-locator
// (2) https://www.google.com/search?q=google+maps+api+how+to+load+list+of+place+ids+on+map&oq=google+maps+api+how+to+load+list+of+place+ids+on+map

/*global google*/

const mapStyle = [{
  'featureType': 'administrative',
  'elementType': 'all',
  'stylers': [{
    'visibility': 'on',
  },
  {
    'lightness': 33,
  },
  ],
},
{
  'featureType': 'landscape',
  'elementType': 'all',
  'stylers': [{
    'color': '#f2e5d4',
  }],
},
{
  'featureType': 'poi.park',
  'elementType': 'geometry',
  'stylers': [{
    'color': '#c5dac6',
  }],
},
{
  'featureType': 'poi.park',
  'elementType': 'labels',
  'stylers': [{
    'visibility': 'on',
  },
  {
    'lightness': 20,
  },
  ],
},
{
  'featureType': 'road',
  'elementType': 'all',
  'stylers': [{
    'lightness': 20,
  }],
},
{
  'featureType': 'road.highway',
  'elementType': 'geometry',
  'stylers': [{
    'color': '#c5c6c6',
  }],
},
{
  'featureType': 'road.arterial',
  'elementType': 'geometry',
  'stylers': [{
    'color': '#e4d7c6',
  }],
},
{
  'featureType': 'road.local',
  'elementType': 'geometry',
  'stylers': [{
    'color': '#fbfaf7',
  }],
},
{
  'featureType': 'water',
  'elementType': 'all',
  'stylers': [{
    'visibility': 'on',
  },
  {
    'color': '#acbcc9',
  },
  ],
},
];

function initMap() {
  // Create the map.
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: {lat: 31.79508, lng: -99.18768},  // cetered on the middle of Texas
    // styles: mapStyle,
  });
  
  // Create Places Service *(2)
  let service = new google.maps.places.PlacesService(map);
  
  // Array of place IDs to display
  var placeIds = '/assets/json/stores-v1.json';

  placeIds.forEach( placeId => {
    service.getDetails({ placeId: placeId }, function(place, status) {
      if (status === 'OK') {
        new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
      }
    });
  });


  // // Load the stores GeoJSON onto the map.
  // map.data.loadGeoJson('/assets/json/stores-v1.json', {idPropertyName: 'storeid'});
  
  // Define the custom marker icons, using the store's "category".
  map.data.setStyle((feature) => {
    return {
      icon: {
        url: `/test-map-images/icon_${feature.getProperty('category')}.png`,
        scaledSize: new google.maps.Size(64, 64),
      },
    };
  });

  const apiKey = 'AIzaSyCtXt5re5VwNqcAEm63KzkvmZSnKAJFI3o';
  const infoWindow = new google.maps.InfoWindow();

  // Show the information for a store when its marker is clicked.
  map.data.addListener('click', (event) => {
    const category = event.feature.getProperty('category');
    const name = event.feature.getProperty('name');
    const description = event.feature.getProperty('description');
    const hours = event.feature.getProperty('hours');
    const phone = event.feature.getProperty('phone');
    const position = event.feature.getGeometry().get();
    const content = `
      <img style="float:left; width:200px; margin-top:30px" src="/test-map-images/logo_${category}.png">
      <div style="margin-left:220px; margin-bottom:20px;">
        <h2>${name}</h2><p>${description}</p>
        <p><b>Open:</b> ${hours}<br/><b>Phone:</b> ${phone}</p>
        <p><img src="https://maps.googleapis.com/maps/api/streetview?size=350x120&location=${position.lat()},${position.lng()}&key=${apiKey}&solution_channel=GMP_codelabs_simplestorelocator_v1_a"></p>
      </div>
      `;

    infoWindow.setContent(content);
    infoWindow.setPosition(position);
    infoWindow.setOptions({pixelOffset: new google.maps.Size(0, -30)});
    infoWindow.open(map);
  });
  
  
}



