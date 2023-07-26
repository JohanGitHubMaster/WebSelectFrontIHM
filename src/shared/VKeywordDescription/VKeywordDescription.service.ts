import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { VKeywordDescription } from "src/models/VKeywordDescription.model";

@Injectable({
    providedIn: 'root'
})
export class VKeywordDescriptionService {

    constructor(private http: HttpClient
    ) { }

    uri_api = 'http://localhost:8010/api/vKeywordDescription';

    getVKeywordDescriptionById(page: number, limit: number,orderId:Number): Observable<any> {  
        return this.http.get<VKeywordDescription[]>(this.uri_api+"?page=" + page + "&limit=" + limit+"&Orderid="+orderId)
    }
}