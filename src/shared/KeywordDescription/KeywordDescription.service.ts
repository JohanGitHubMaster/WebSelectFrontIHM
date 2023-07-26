import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { KeywordGeneral } from "src/models/KeywordGeneral.model";
import { KeywordDescription } from "src/models/KeywordDescription.model";

@Injectable({
    providedIn: 'root'
})
export class KeywordDescriptionService {

    constructor(private http: HttpClient
    ) { }

    uri_api = 'http://localhost:8010/api/KeywordDescription';
    getKeywordNameByName(KeywordName:String): Observable<any> {
        return this.http.get<KeywordDescription>(this.uri_api+"?&KeywordName="+KeywordName)
      }

    
}