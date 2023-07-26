import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { MapLocation } from "src/models/MapLocation.model";

@Injectable({
    providedIn: 'root'
})
export class MapLocationService {

    constructor(private http: HttpClient
    ) { }

    uri_api = 'http://localhost:8010/api/mapLocation';
    getMapLocation(): Observable<any> {
        return this.http.get<MapLocation[]>(this.uri_api)
      }

    
}