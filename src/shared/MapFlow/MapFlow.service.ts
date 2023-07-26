import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { MapFlow } from "src/models/MapFlow.model";

@Injectable({
    providedIn: 'root'
})
export class MapFlowService {

    constructor(private http: HttpClient
    ) { }

    uri_api = 'http://localhost:8010/api/mapFlow';
    getMapFlow(): Observable<any> {
        return this.http.get<MapFlow[]>(this.uri_api)
      }

    
}