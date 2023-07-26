import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { KeywordGeneral } from "src/models/KeywordGeneral.model";
import { KeywordDescription } from "src/models/KeywordDescription.model";

@Injectable({
    providedIn: 'root'
})
export class ArticleSelectedService {

    constructor(private http: HttpClient
    ) { }

    uri_api = 'http://localhost:8010/api/UpdateArticle';
    UpdateArticle(ArticleSelectedId:Number,Validated:Boolean,validatedBy:String,ToTreat:Boolean,Comment:String): Observable<any> {
        return this.http.get<KeywordDescription>(this.uri_api+"?Validated="+Validated+"&ValidatedBy="+validatedBy+"&ToTreat="+ToTreat+"&ArticleSelectedId="+ArticleSelectedId+"&Comment="+Comment)
      }

    
}