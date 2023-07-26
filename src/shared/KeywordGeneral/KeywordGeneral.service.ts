import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { KeywordGeneral } from "src/models/KeywordGeneral.model";

@Injectable({
    providedIn: 'root'
})
export class KeywordGeneralService {

    constructor(private http: HttpClient
    ) { }

    uri_api = 'http://localhost:8010/api/keywordGeneral';
    getKeywordGeneralById(page: number, limit: number,orderId:Number): Observable<any> {
        return this.http.get<KeywordGeneral[]>(this.uri_api+"?page=" + page + "&limit=" + limit+"&Orderid="+orderId)
      }

    
}