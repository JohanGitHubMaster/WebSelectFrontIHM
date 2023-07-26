import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { VOrderToTreat } from "src/models/VOrderToTreat.model";
import { VarticleToValidate } from "src/models/VarticleToValidate.model";

@Injectable({
    providedIn: 'root'
})
export class VarticleToValidateService {

    constructor(private http: HttpClient
    ) { }

    uri_api = 'http://localhost:8010/api/vArticleToValidate';

    uri_api_source = 'http://localhost:8010/api/vArticleToValidateBysource';

    getVarticleToValidateById(page: number, limit: number,orderId:number): Observable<any> {  
        return this.http.get<VarticleToValidate[]>(this.uri_api+"?page=" + page + "&limit=" + limit+"&OrderId="+orderId)
      }

      getVarticleToValidateBySourceId(page: number, limit: number,SourceId:Number): Observable<any> {  
        return this.http.get<VarticleToValidate[]>(this.uri_api_source+"?page=" + page + "&limit=" + limit+"&SourceId="+SourceId)
      }
}