import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { ArticleKeyword } from "src/models/ArticleKeyword.model";

@Injectable({
    providedIn: 'root'
})
export class ArticleKeywordService {

    constructor(private http: HttpClient
    ) { }

    uri_api = 'http://localhost:8010/api/keywordArticle';
    getArticleKeywordById(ArticleSelectedId:Number,page: number, limit: number): Observable<any> {
        return this.http.get<ArticleKeyword[]>(this.uri_api+"?page=" + page + "&limit=" + limit+"&ArticleSelectedId=" +ArticleSelectedId);
      }

    
}