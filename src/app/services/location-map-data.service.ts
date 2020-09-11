import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationMapDataService {

  constructor(private httpClient: HttpClient) { }
  getOverlayLayerDetails() {
    const url = `http://localhost:3000/getOverlayLayerDetails`;
    return new Promise(resolve => {
      this.httpClient.get(url).subscribe(data => {
        resolve(data);
      }, error => {
        console.log(error);
      });
    });
  }
}
