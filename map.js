var h = 400;
var w = 400;
var ibounds = [[0,0], [90,90]];

let activeRoom;
 
var map = L.map('map', {
  zoomSnap: 0.001,
  minZoom: -1.5,
  tileSize: 512,
  ratate: true,
  crs: L.CRS.Simple,
  rotate: true,
  minZoom: 1,
  maxZoom: 2.5,
  color: 'white',
  maxBounds: [
    [490, 370],
    [-400, -100]
],
});

addSearch('<input id="find"><button onClick="findRoom()">Найти</button>', map);

function changeActive(layer) {
  if (activeRoom) {
    console.log(activeRoom);
    activeRoom.setStyle({fillOpacity: 0});
  }
  if (activeRoom != layer) {
    activeRoom = layer;
    layer.setStyle({fillOpacity: 0.4});
    focutTo(layer);
  }else {
    activeRoom = null;
  }
}

var w = 270;
var h = 90;
var ibounds = [[0,0], [h, w]];
 
L.imageOverlay('map.svg', ibounds).addTo(map);
map.fitBounds(ibounds);

function findRoom () {
  let inputText = document.querySelector("#find");
  let room = inputText.value.toUpperCase();
  inputText.value = '';
  let currentRoom = findRoomInArr(room);
  if (currentRoom != false) {
    changeActive(currentRoom);
  }
}

function focutTo (el) {
  map.fitBounds(el.getBounds());
}

function findRoomInArr (name) {
  result = false;
  states.forEach((geometry) => {
    console.log(geometry.geometry);
    if (geometry.geometry.name.toUpperCase() == name) {
      result = geometry.parent;
    }
  });
  return result;
}

function bindingEvents (feature, layer) {
  layer.on('click', (e) => {
    changeActive(layer);
  })
}

function bindingPopup (feature, layer) {
  layer.bindPopup(feature.geometry.name);
}

function onEachFeature (feature, layer) {
  feature.parent = layer;
  bindingPopup(feature, layer);
  bindingEvents(feature, layer);
}

let geo = L.geoJSON(states, {style: {fillOpacity: 0, opacity: 0}, onEachFeature: onEachFeature}).addTo(map);
console.log(geo);
// zoom the map to the polygon

//Windows
function addSearch (el, map) {
var info = L.control();

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
    this._div.className = 'find-room';
		this.update();
		return this._div;
	};

	info.update = function () {
		this._div.innerHTML = el;
	};

	info.addTo(map);
}
