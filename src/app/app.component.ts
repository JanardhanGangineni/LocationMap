import { Component } from '@angular/core';
import * as Leaflet from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { LocationMapDataService } from './services/location-map-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LocationMap';
  map: Leaflet.Map;
  layersControl: any;
  constructor(private dataService: LocationMapDataService) { }
  ngOnInit() {
    this.map = Leaflet.map('map', {
      center: [28.644800, 77.216721],
      zoom: 4,
    });
    
    this.layersControl= Leaflet.control.layers({}, {}, { collapsed: false }).addTo(this.map);
    this.prepareBaseMapLayers();
    this.prepareOverlayLayers();
    this.prepareSearchControl();
  }
  prepareBaseMapLayers(){
    var mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
    var grayscale = Leaflet.tileLayer(mbUrl, { id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1 });
    var streets = Leaflet.tileLayer(mbUrl, { id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1 });
    var openStreetMap = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {    }).addTo(this.map);
  
    this.layersControl.addBaseLayer(openStreetMap,'OpenStreetMap');
    this.layersControl.addBaseLayer(grayscale,'Grayscale');
    this.layersControl.addBaseLayer(streets,'Streets');
  }
  prepareOverlayLayers() {
    this.dataService.getOverlayLayerDetails().then((data) => {
      if (data) {
        var layerdata: any = data;
        layerdata.forEach(element => {
          var layerObj = Leaflet.tileLayer.wms(element.url, {
            layers: element.layername
          });
          this.layersControl.addOverlay(layerObj,element.displayname);
        });
      }
    });
  }
  prepareSearchControl(){
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider: provider,
      autoComplete: true,
    });

    this.map.addControl(searchControl);
  }
}
