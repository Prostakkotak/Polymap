let activeRoom;
let currentLayer;
let roomPolygon = {};
let floorsNames = [
  {
    name: 'Второй этаж',
    path: 'https://raw.githubusercontent.com/Prostakkotak/Polymap/455051f88edd5375c416ba38ab75caee35bb4f71/2.svg',
  },
  {
    name: 'Третий этаж',
    path: 'https://raw.githubusercontent.com/Prostakkotak/Polymap/455051f88edd5375c416ba38ab75caee35bb4f71/3.svg',
  },
  {
    name: 'Четвертый этаж',
    path: 'https://raw.githubusercontent.com/Prostakkotak/Polymap/455051f88edd5375c416ba38ab75caee35bb4f71/4.svg',
    polygons: fourFloor,
  },
];

let w = 270;
let h = 90;
let ibounds = [[0,0], [h, w]];

let floors = getFloors(floorsNames, ibounds);
console.log(floors);
let map = createMap(floors, ibounds);
let controlFloors = addFloorController (floors);
controlFloors.addTo(map);
changeLayer(floors[1].floor);

//Создание этажей
function getFloors(floorsNames, ibounds){
  let floors = floorsNames.map((floor) => {
    let layerFloor = L.imageOverlay(floor.path, ibounds);
    let roomsNames = [];
    let floorList = [layerFloor];
    if (floor.polygons) {
      let layerPolygons = L.geoJSON(floor.polygons, {style: {fillOpacity: 0, opacity: 0}, onEachFeature() {
        roomsNames.push(onEachFeature(...arguments, layerFloor))}});
        floorList.push(layerPolygons);
    }
    let layerGroup = L.layerGroup(floorList);
    roomsNames.forEach((name) => {
      roomPolygon[name.number.toUpperCase()] = {layerGroup: layerGroup, layer: name.layer};
      console.log(roomPolygon);
    });
    console.log(roomsNames);
    return {
      name: floor.name,
      floor: layerGroup,
    }
  });
  return floors;
}

//Создание карты
function createMap (floors, ibounds) {
    currentLayer = floors[0].floor;
    let map = L.map('map', {
    zoomSnap: 0.001,
    minZoom: -1.5,
    tileSize: 512,
    ratate: true,
    crs: L.CRS.Simple,
    rotate: true,
    minZoom: 1,
    maxZoom: 2.5,
    color: 'white',
    layers: currentLayer,
    maxBounds: [
      [490, 370],
      [-400, -100]
  ],
  });
  map.fitBounds(ibounds);
  return map;
}

//Создание контроллера этажей
function addFloorController (floors) {
  let baseMaps = {};
  for (floor of floors){
    baseMaps[floor.name] = floor.floor;
  }
  let controlFloor = L.control.layers(baseMaps);
  return controlFloor;
}

//Смена активной комнаты
function changeActive(layer) {
  if (activeRoom) {
    activeRoom.setStyle({fillOpacity: 0});
  }
    activeRoom = layer;
    layer.setStyle({fillOpacity: 0.4});
    focutTo(layer);
}

addSearch('<input id="find"><button v-on:click="findRoom">Найти</button>', map);

function findRoom () {
  let inputText = document.querySelector("#find");
  let room = inputText.value.toUpperCase();
  inputText.value = '';
  console.log(room);
  console.log(roomPolygon['Туалет']);
  if (roomPolygon[room]) {
    console.log(room);
    changeLayer(roomPolygon[room]['layerGroup']);
    console.log(roomPolygon);
    changeActive(roomPolygon[room]['layer']);
  }
}

function focutTo (el) {
  map.fitBounds(el.getBounds());
}

function changeLayer (newLayer) {
  floors.forEach((floor) => {
    map.removeLayer(floor.floor);
  });
  console.log(newLayer);
  newLayer.addTo(map);
  currentLayer = newLayer;
  console.log(currentLayer);
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

function onEachFeature (feature, layer, layerFloor) {
  feature.parent = layer;
  console.log(layer);
  bindingPopup(feature, layer);
  bindingEvents(feature, layer);
  return {number: feature.geometry.name, layer: layer};
}

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
