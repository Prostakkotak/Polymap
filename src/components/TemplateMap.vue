<template>
    <div id="map" class="map_position">
      <div class="map__wrapper">
        <div class="map__find-block">
          <input v-model="roomName" id="find" class="map__find-input">
          <button v-on:click="findRoom" class="map__find-btn">Найти</button>
          </div>
          <div v-if="roomName" class="map__filter-list-block"> 
            <ul class="map__filter-list">
              <li v-if="getFilterRooms.length < 1" class="map__list-item">Не найдено</li>
              <li v-for="item in getFilterRooms" :key="item" @click="findPopupRoom(item)" class="map__list-item"><span>{{item}}</span></li>
            </ul>
        </div>
      </div>
    </div>
</template>
<script>
import L from 'leaflet/dist/leaflet-src.js';
import { LMap} from 'leaflet/dist/leaflet';
import fourFloor from '../map/geometry.js';
export default {
    component: {
      LMap,
    },
    data () {
      return {
      activeRoom: undefined,
      currentLayer: undefined,
      roomPolygon: {},
      roomName: '',
      currentRoomName: '',
    };
    }, 
    computed: {
      getFilterRooms () {
        let filterRooms = [];
        if (this.roomName != ''){
          for (let room in this.roomPolygon) {
            if (room.split("").slice(0, this.roomName.length).join("") == this.roomName.toUpperCase()) {
              filterRooms.push(room);
            }
          }
        }
        return filterRooms;
      }
    },
    mounted () {
      this.roomName = this.$route.params.name;
      this.initMap();
      if (this.roomName) {
        this.findRoom();
      }
    },
    methods: {
      initMap () {
        const floorsNames = [
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

        const w = 270;
        const h = 90;
        const ibounds = [[0,0], [h, w]];
        this.floors = this.getFloors(floorsNames, ibounds);
        this.map = this.createMap(ibounds);
        const controlFloors = this.addFloorController ();
        controlFloors.addTo(this.map);
      },
      getFloors(floorsNames, ibounds){
        let floors = floorsNames.map((floor) => {
          let layerFloor = L.imageOverlay(floor.path, ibounds);
          let roomsNames = [];
          let floorList = [layerFloor];
          const EachFeature = this.EachFeature;
          if (floor.polygons) {
            let layerPolygons = L.geoJSON(floor.polygons, {style: {fillOpacity: 0, opacity: 0}, onEachFeature() {
              roomsNames.push(EachFeature(...arguments, layerFloor))}});
            floorList.push(layerPolygons);
          }
          const layerGroup = L.layerGroup(floorList);
          roomsNames.forEach((name) => {
            this.roomPolygon[name.number.toUpperCase()] = {layerGroup: layerGroup, layer: name.layer, layerName: floor.name};
          });
          return {
            name: floor.name,
            floor: layerGroup,
          }
        });
        return floors;
      },
      createMap (ibounds) {
        this.currentLayer = this.floors[1].floor;
        console.log(this.floors);
        let map = L.map('map', {
        zoomSnap: 0.001,
        tileSize: 512,
        ratate: true,
        crs: L.CRS.Simple,
        rotate: true,
        minZoom: 1,
        maxZoom: 2.5,
        color: 'white',
        layers: [this.floors[1].floor],
        maxBounds: [
          [490, 370],
          [-400, -100]
      ],
      });
      map.fitBounds(ibounds);
      console.log(typeof map);
      return map;
    },
    addFloorController () {
      let baseMaps = {};
      for (let floor of this.floors){
        baseMaps[floor.name] = floor.floor;
      }
      let controlFloor = L.control.layers(baseMaps);
      return controlFloor;
    },
    changeActive(layer) {
      if (this.activeRoom) {
        this.activeRoom.setStyle({fillOpacity: 0});
      }
        this.activeRoom = layer;
        layer.setStyle({fillOpacity: 0.4});
        console.log(this.map);
        this.focutTo(layer);
    },
    findPopupRoom (room) {
      this.roomName = room;
      this.findRoom();
    },
    findRoom () {
      if (this.roomPolygon[this.roomName.toUpperCase()]) {
        this.changeLayer(this.roomPolygon[this.roomName.toUpperCase()]);
        this.changeActive(this.roomPolygon[this.roomName.toUpperCase()]['layer']);
      }
      this.roomName = '';
    },
    focutTo (el) {
      this.map.fitBounds(el.getBounds());
    },
    changeLayer (newLayer) {
      console.log(newLayer);
      newLayer['layerGroup'].addTo(this.map);
      this.floors.forEach((floor) => {
        if (floor.name != newLayer.layerName) {
          this.map.removeLayer(floor.floor);
        }
      });
      this.currentLayer = newLayer;
    },
    findRoomInArr (name) {
      let result = false;
      this.states.forEach((geometry) => {
        if (geometry.geometry.name.toUpperCase() == name) {
          result = geometry.parent;
        }
      });
      return result;
    },
    bindingEvents (feature, layer) {
      layer.on('click', () => {
        this.changeActive(layer);
      })
    },
    bindingPopup (feature, layer) {
      layer.bindPopup(feature.geometry.name);
    },
    EachFeature (feature, layer) {
      feature.parent = layer;
      this.bindingPopup(feature, layer);
      this.bindingEvents(feature, layer);
      return {number: feature.geometry.name, layer: layer};
    },
    addSearch (el, map) {
      const info = L.control();

        info.onAdd = function () {
          this._div = L.DomUtil.create('div', 'info');
          this._div.className = 'find-room';
          this.update();
          return this._div;
        };

        info.update = function () {
          this._div.innerHTML = el;
        };

        info.addTo(map);
      },
    }
}
</script>
<style>
    @import url('https://unpkg.com/leaflet@1.7.1/dist/leaflet.css');
    #map{
      height: calc(100vh - 120px);
      position: relative;
    }
    .map__list-item {
      cursor: pointer;
    }
    .map__list-item:hover {
      background-color: #C0C0C0;
    }
    .leaflet-container {
      background: #fff  !important; 
      outline: 0;
    }
    .leaflet-touch .leaflet-control-zoom-in {
      font-size: 20px;
      color: gray;
      border: none;
      }
      .leaflet-touch .leaflet-control-zoom-out {
      font-size: 20px;
      color: gray;
      border: none;
      }
    .leaflet-touch .leaflet-control-zoom-out {
      font-size: px;
      }
    .leaflet-touch .leaflet-bar a{
      width: 40px;
      height: 40px;
      line-height: 40px;
    }
    .find-room{
      display: flex;
      width: 100%;
      height: 50px;
    }
    .leaflet-right{
      margin-left: 10px;
    }
    .find-room input{
      width: 70%;
      width: 100%;
      padding: 0px 10px;
      font-size: 20px;
      line-height: 50px;
      border: none;
      border-bottom: 1px solid #e0e0e0; 
      outline: none;
      transition: 0.3s;
      border-radius: 5px;
      -webkit-box-shadow: 0px 0px 10px 5px rgba(34, 60, 80, 0.2);
-moz-box-shadow: 0px 0px 10px 5px rgba(34, 60, 80, 0.2);
 box-shadow: 0 2px 6px 0 rgb(0 0 0 / 20%);
    }
    .leaflet-container {
    background-color:black;
    }
    .leaflet-touch .leaflet-bar{

      box-shadow: 0 2px 6px 0 rgb(0 0 0 / 20%);
      border: none;
    }
    .leaflet-left {
      display: flex;
      justify-content: center;
      height: 100vh;
      flex-direction: column;
    }
    .leaflet-right .leaflet-control{
      margin: 0px;
    }
    .leaflet-right{
      margin: 0;
    }
    .leaflet-top{
      margin: 10px;
    }
    .map__find-block{
      display: flex;
    }
    .map__wrapper{
      z-index: 10000;
      position: absolute;
      left: 0;
      margin: 0px 20px;
      top: 20px;
    }
    .map__find-input{
      width: 70%;
      padding: 0px 10px;
      font-size: 20px;
      line-height: 50px;
      border: none;
      border-bottom: 1px solid #e0e0e0; 
      outline: none;
      transition: 0.3s;
      border-radius: 5px;
      -webkit-box-shadow: 0px 0px 10px 5px rgba(34, 60, 80, 0.2);
      -moz-box-shadow: 0px 0px 10px 5px rgba(34, 60, 80, 0.2);
      box-shadow: 0 2px 6px 0 rgb(0 0 0 / 20%);
    }
    .map__find-btn{
      padding: 0px;
      font-size: 20px;
      margin-left: 5px;
      width: 30%;
      padding: 10px 20px;
      border: none; 
      border-radius: 5px;
      font-family: sans-serif;
      letter-spacing: 1px;
      font-size: 16px;
      color :#fff ;
      background-color: #000;
      outline: none;
      cursor: pointer;
      transition: 0.3s;
    }
    .map__list-item{
      color: #000;
      text-align: left;
      padding: 20px;
      font-family: sans-serif;
      letter-spacing: 1px;
      font-size: 16px;
    }
    .map__filter-list-block{
      background-color: #fff;
      border-radius: 5px;
      margin-top: 10px;
      overflow: hidden;
      width: 100%;-webkit-box-shadow: 0px 0px 10px 5px rgba(34, 60, 80, 0.2);
      -moz-box-shadow: 0px 0px 10px 5px rgba(34, 60, 80, 0.2);
      box-shadow: 0 2px 6px 0 rgb(0 0 0 / 20%);
    }
    @media (max-width: 720px){
    .leaflet-right .leaflet-control{
      margin-left: 10px;
    }
    .map__find-block{
      width: calc(100% - 40px);
    }
    }
</style>