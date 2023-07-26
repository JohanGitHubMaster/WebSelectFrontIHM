import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { ArticleExtract } from "src/models/ArticleExtract.model";

@Injectable({
    providedIn: 'root'
})
export class ArticleExtractService {

    constructor(private http: HttpClient
    ) { }

    uri_api = 'http://localhost:8010/api/ArticleKeyword';
    getArticleExtractById(ArticleSelectedId:Number,page: number, limit: number): Observable<any> {
        return this.http.get<ArticleExtract[]>(this.uri_api+"?page=" + page + "&limit=" + limit+"&ArticleSelectedId=" +ArticleSelectedId);
      }

    
}