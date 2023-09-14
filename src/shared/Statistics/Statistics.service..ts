import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Statistics } from "src/models/Statistique.model";

@Injectable({
    providedIn: 'root'
})
export class StatisticsService {

    constructor(private http: HttpClient
    ) { }

    uri_api = 'http://localhost:8010/api/statistics';
    uri_user = 'http://localhost:8010/api/StatisticsPerUser'
    uri_userInfo = 'http://localhost:8010/api/userInfos'

    getStatisticNbArticlePerOrder(limit:number): Observable<Statistics[]> {  
        return this.http.get<Statistics[]>(this.uri_api+"?limit="+limit)
      }

      getStatisticNbArticlePerUser(limit:number): Observable<Statistics[]> {  
        return this.http.get<Statistics[]>(this.uri_user+"?limit="+limit)
      }
      getUser(): Observable<any> {  
        return this.http.get<any>(this.uri_userInfo)
      }
}