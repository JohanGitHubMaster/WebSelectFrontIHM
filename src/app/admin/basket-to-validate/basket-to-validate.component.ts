import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleExtract } from 'src/models/ArticleExtract.model';
import { ArticleKeyword } from 'src/models/ArticleKeyword.model';
import { KeywordDescription } from 'src/models/KeywordDescription.model';
import { VarticleToValidate } from 'src/models/VarticleToValidate.model';
import { ArticleExtractService } from 'src/shared/ArticleExtract/ArticleExtract.service';
import { ArticleKeywordService } from 'src/shared/ArticleKeyword/ArticleKeyword.service';
import { KeywordDescriptionService } from 'src/shared/KeywordDescription/KeywordDescription.service';

@Component({
  selector: 'app-basket-to-validate',
  templateUrl: './basket-to-validate.component.html',
  styleUrls: ['./basket-to-validate.component.css']
})
export class BasketToValidateComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Array<VarticleToValidate>,
  private keywordArticleService:ArticleKeywordService,
  private keywordDescriptionService:KeywordDescriptionService,
  private articleExtractService:ArticleExtractService){}
  dataList !:VarticleToValidate[];
  modifVarticleToValidate: VarticleToValidate[] = [];
  articleKeyword!:ArticleKeyword[];
  articleExtract!:ArticleExtract[];
  keywordDescriptionHtml : KeywordDescription = new KeywordDescription();
  datacomment: VarticleToValidate[] = [];

  ngOnInit(){
    this.dataList = this.data;
    if(localStorage.getItem("basketArticle")!=null){
      var storedNames = JSON.parse(localStorage.getItem("basketArticle")!);
      console.log(storedNames)
    }
    
  }

  checkOk(item:VarticleToValidate,event:any){

    item.IsNotOk = false;
    item.IsOk = true;
    item.Validated = true;
    console.log("miditra check ok")
    // console.log(item.ArticleSelectedId)
    // console.log(this.dataList)

    if(this.modifVarticleToValidate.filter(x=>x.ArticleSelectedId == item.ArticleSelectedId).length<=0){
      this.modifVarticleToValidate.push(item)  
      // console.log(this.modifVarticleToValidate.find(x=>x.ArticleSelectedId == item.ArticleSelectedId)) 
    }   
    else{
      var index = this.modifVarticleToValidate.findIndex(x=>x.ArticleSelectedId == item.ArticleSelectedId);
      this.modifVarticleToValidate[index] = item;

    }
    console.log(this.modifVarticleToValidate.find(x=>x.ArticleSelectedId == item.ArticleSelectedId)) 
    // console.log(this.modifVarticleToValidate)
  }

  showelement(item:VarticleToValidate){
    // console.log(item)
    // item.IsOk = true;
    // item.IsNotOk = false;
    console.log(item)
    console.log(item.IsOk)
    this.keywordArticleService.getArticleKeywordById(item.ArticleSelectedId,0,10).subscribe((result: ArticleKeyword[])=>{
     
      this.articleKeyword = result;
      // console.log(result)
    })

    this.articleExtractService.getArticleExtractById(item.ArticleSelectedId,0,5).subscribe((result: ArticleExtract[])=>{
      this.articleExtract = result;
      // console.log(result)
    })
    if(this.datacomment.find(x=>x.ArticleSelectedId==item.ArticleSelectedId)!=null)
     item.Comment = this.datacomment.find(x=>x.ArticleSelectedId==item.ArticleSelectedId)?.Comment!
  }

  checkNotOk(item:VarticleToValidate,event:any){
    item.IsNotOk = true;
    item.IsOk = false;
    item.Validated = false;
    console.log(item)
    // console.log(event)
    // console.log(event.target.name)
    // console.log(item)
    // console.log(this.dataList)
    if(this.modifVarticleToValidate.filter(x=>x.ArticleSelectedId == item.ArticleSelectedId).length<=0){
      this.modifVarticleToValidate.push(item)   
      //console.log(item)
    }   
    else{
     var index = this.modifVarticleToValidate.findIndex(x=>x.ArticleSelectedId == item.ArticleSelectedId);
     this.modifVarticleToValidate[index] = item;
      // this.modifVarticleToValidate.push(item)  
      // console.log(item) 
    }
    console.log(this.modifVarticleToValidate.find(x=>x.ArticleSelectedId == item.ArticleSelectedId)) 
    
    // console.log(this.modifVarticleToValidate)
  }

  getkeyword(KeywordSource:String){
    
    this.keywordDescriptionService.getKeywordNameByName(KeywordSource).subscribe((result: KeywordDescription | null | undefined)=>{
      if(result!=undefined || result!=null)
      this.keywordDescriptionHtml = result
      else
      this.keywordDescriptionHtml = new KeywordDescription();
      console.log(result)
    })
    
  }

  changecomment(item:VarticleToValidate){
    console.log("tafiditra ")
    var index = this.datacomment.findIndex(x=>x.ArticleSelectedId == item.ArticleSelectedId) 
    if(index>= 0)
      this.datacomment[index].Comment = item.Comment;
      else
      this.datacomment.push(item)

      console.log(this.datacomment[index])
  }

}
