import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ArticleExtract } from 'src/models/ArticleExtract.model';
import { ArticleKeyword } from 'src/models/ArticleKeyword.model';
import { KeywordDescription } from 'src/models/KeywordDescription.model';
import { VKeywordDescription } from 'src/models/VKeywordDescription.model';
import { VWebOrders } from 'src/models/VWebOrders.model';
import { VarticleToValidate } from 'src/models/VarticleToValidate.model';
import { DialogComponent } from '../dialog/dialog.component';
import { ProfilDescriptionComponent } from '../profil-description/profil-description.component';
import { OtherProfilArticleComponent } from '../other-profil-article/other-profil-article.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { VarticleToValidateService } from 'src/shared/VarticleToValidate/VarticleToValidate.service';
import { VWebOrdersService } from 'src/shared/VWebOrders/VWebOrders.service';
import { VKeywordDescriptionService } from 'src/shared/VKeywordDescription/VKeywordDescription.service';
import { ArticleKeywordService } from 'src/shared/ArticleKeyword/ArticleKeyword.service';
import { ArticleExtractService } from 'src/shared/ArticleExtract/ArticleExtract.service';
import { KeywordDescriptionService } from 'src/shared/KeywordDescription/KeywordDescription.service';
import { BasketToValidateComponent } from '../basket-to-validate/basket-to-validate.component';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-articles-to-validate',
  templateUrl: './articles-to-validate.component.html',
  styleUrls: ['./articles-to-validate.component.scss']
})
export class ArticlesToValidateComponent {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  panelOpenState = false;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  

  constructor(private dialog: MatDialog, 
              private route: ActivatedRoute,
              private router: Router,
              private varticleToValidateService:VarticleToValidateService,
              private vweborderService:VWebOrdersService,
              private vkeywordDescriptionService:VKeywordDescriptionService,
              private keywordArticleService:ArticleKeywordService,
              private articleExtractService:ArticleExtractService,
              private keywordDescriptionService:KeywordDescriptionService
              ) {

  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    console.log("miditra after init")
   
  }



  length = 500;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  dataList !:VarticleToValidate[];//ELEMENT_DATA.slice(this.pageIndex, this.pageSize);
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  priorityId!: number;
  orderid!:number;
  // labelPosition: 'before' | 'after' = 'after';
  expandedIndex = 0;
  weborders:VWebOrders = new VWebOrders();
  articleKeyword!:ArticleKeyword[];
  articleExtract!:ArticleExtract[];
  keywordDescription !: VKeywordDescription[];
  keywordDescriptionHtml : KeywordDescription = new KeywordDescription();
  pageEvent!: PageEvent;
  modifVarticleToValidate: VarticleToValidate[] = [];
  datacomment: VarticleToValidate[] = [];

  ngOnInit(){
    localStorage.setItem("basketArticle", JSON.stringify(Array<VarticleToValidate>()));
    console.log("miditra  ngon init")
    const orderId = this.route.snapshot.params['id'];
    this.orderid = +orderId;
    this.vweborderService.getVWebOrderById(this.orderid).subscribe((result: VWebOrders)=>{
      // console.log(result)
      this.weborders = result;
    })
    this.varticleToValidateService.getVarticleToValidateById(0,10,this.orderid).subscribe((result)=>{
      console.log( result[0].Validated)
      this.dataList = result;
      for(let i=0;i<this.dataList.length;i++){
        // this.dataList[i].IsOk = this.dataList[i].Validated?true:false
        // this.dataList[i].IsNotOk = this.dataList[i].Validated?false:true
        // this.dataList[i].IsOk = this.dataList[i].Validated?true:false
        // this.dataList[i].IsNotOk = this.dataList[i].Validated?false:false
      }
      
    //   for(let i = 0; i<this.datacomment.length;i++){
    //     // data[i].Comment = this.dataList[i].Comment;
    //     var s = this.dataList.findIndex(x=>x.ArticleSelectedId == this.datacomment[i].ArticleSelectedId)
    //     if(s>=0){
    //       this.datacomment[i].Comment = this.dataList[s].Comment
    //     }       
    //   console.log(this.datacomment)
    // }
      //this.dataList = this.dataList;
    })
  }



  handlePageEvent(e: PageEvent) {
    var current = (e.pageIndex) * e.pageSize;
    // this.dataList = ELEMENT_DATA.slice(current, e.pageSize + current)
    const orderId = +this.route.snapshot.params['id'];

   

    this.varticleToValidateService.getVarticleToValidateById(e.pageIndex,e.pageSize,orderId).subscribe((result: VarticleToValidate[])=>{
      // console.log(result)
      // this.dataList = [];
      var data:Array<VarticleToValidate> = result;
      for(let i=0;i<data.length;i++){
        // data[i].IsOk = data[i].Validated?true:false
        // data[i].IsNotOk = data[i].Validated?false:true
        // data[i].IsOk = data[i].Validated?true:false
        // data[i].IsNotOk = data[i].Validated?false:false
      }
      for(let i = 0; i<this.modifVarticleToValidate.length;i++){
        if(data.filter(x=>x.ArticleSelectedId == this.modifVarticleToValidate[i].ArticleSelectedId).length>0){
          var s = data.findIndex(x=>x.ArticleSelectedId == this.modifVarticleToValidate[i].ArticleSelectedId)
          console.log(s);
          data[s].Validated = this.modifVarticleToValidate[i].Validated
          data[s].IsNotOk = this.modifVarticleToValidate[i].IsNotOk
          data[s].IsOk = this.modifVarticleToValidate[i].IsOk          
        }

        

      }
      
      // for(let i = 0; i<this.dataList.length;i++){
      //   console.log(this.dataList[i])
      //   if(this.dataList[i].Comment != null && this.dataList[i].Comment != undefined && this.dataList[i].Comment != 'null'){
      //     this.datacomment.push(this.dataList[i])
      //   }
      // }
     
      for(let i = 0; i<this.dataList.length;i++){
        // console.log(this.dataList[i])
        if(this.dataList[i].Comment != null && this.dataList[i].Comment != undefined && this.dataList[i].Comment != 'null'){
          var index = this.datacomment.findIndex(x=>x.ArticleSelectedId == this.dataList[i].ArticleSelectedId);
          if(index >= 0)
          this.datacomment[index].Comment = this.dataList[i].Comment       
          else if(index<0){
            if(this.dataList[i].IsNotOk != this.dataList[i].IsOk)
            this.datacomment.push(this.dataList[i])
          }
          
        
        }
      }

      
      localStorage.setItem("basketArticle", JSON.stringify(this.modifVarticleToValidate));
      console.log(this.modifVarticleToValidate)
      this.dataList = data;
      // console.log(this.dataList[0])

      // this.dataList[0].IsOk = true
      
    })
    this.pageEvent = e;
    this.length = 596;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  SelectedRows() {
    this.dialog.open(ProfilDescriptionComponent, {
      data: "toys.gif", width: '120%',
      height: '90%'
    });

  }
  OtherProfil(item:VarticleToValidate) {
    this.dialog.open(OtherProfilArticleComponent, { data: item, width: '140%', height: '90%' });
  }

  showelement(item:VarticleToValidate){
    // console.log(item)
    // item.IsOk = true;
    // item.IsNotOk = false;
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

  changecomment(item:VarticleToValidate){
    console.log("tafiditra ")
    console.log(item.ArticleSelectedId)
    var index = this.datacomment.findIndex(x=>x.ArticleSelectedId == item.ArticleSelectedId) 
    if(index>= 0)
      this.datacomment[index].Comment = item.Comment;
      else
      this.datacomment.push(item)

      // console.log(this.datacomment[index])
      var articl = JSON.parse(localStorage.getItem("basketArticle")!) as VarticleToValidate[];
    // for(var i=0;i<articl.length;i++){
    //   this.dataList.findIndex(x=>x.ArticleSelectedId == this.modifVarticleToValidate[i].ArticleSelectedId)
    // }
    for(var i=0;i<articl.length;i++){
      // console.log(this.datacomment[i])
      // if(this.datacomment[i]){
        // var index = articl.findIndex(x=>x.ArticleSelectedId == this.datacomment[i].ArticleSelectedId);
        var index = this.datacomment.findIndex(x=>x.ArticleSelectedId == articl[i].ArticleSelectedId);

        if(index>=0)
         {
          if(this.datacomment[index].IsOk != this.datacomment[index].IsNotOk)
          articl[i].Comment = this.datacomment[index].Comment;
          // articl[index].Comment = this.datacomment[i].Comment;
         }
      // }
      
    }
    localStorage.setItem("basketArticle", JSON.stringify(articl));
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

  GoTocutArticle(){
    for(let i = 0; i<this.dataList.length;i++){
      // console.log(this.dataList[i])
      if(this.dataList[i].Comment != null && this.dataList[i].Comment != undefined && this.dataList[i].Comment != 'null'){
        var index = this.datacomment.findIndex(x=>x.ArticleSelectedId == this.dataList[i].ArticleSelectedId);
        console.log(this.dataList[i].Comment)
        if(index >= 0){
          this.datacomment[index].Comment = this.dataList[i].Comment   
          console.log(index+" et le commentaire "+ this.dataList[i].Comment)
        }          
        else {
          this.datacomment.push(this.dataList[i])
          
        }
        
      }
    }
  //   for(let i = 0; i<this.datacomment.length;i++){
  //     // data[i].Comment = this.dataList[i].Comment;
  //     var s = this.dataList.findIndex(x=>x.ArticleSelectedId == this.datacomment[i].ArticleSelectedId)
  //     if(s>=0){
  //       this.datacomment[i].Comment = this.dataList[s].Comment
  //     }       
   
  // }
  console.log(this.datacomment)
  var articl = JSON.parse(localStorage.getItem("basketArticle")!) as VarticleToValidate[];
    // for(var i=0;i<articl.length;i++){
    //   this.dataList.findIndex(x=>x.ArticleSelectedId == this.modifVarticleToValidate[i].ArticleSelectedId)
    // }
    console.log(articl)
    for(var i=0;i<articl.length;i++){
      if(this.datacomment[i]!= undefined){
        var index = articl.findIndex(x=>x.ArticleSelectedId == this.datacomment[i].ArticleSelectedId);
        if(index>=0)
         articl[index].Comment = this.datacomment[i].Comment;
      }     
    }
    // var validatearticle = localStorage.setItem("basketArticle", JSON.stringify(this.modifVarticleToValidate));
    
    var dialogRef = this.dialog.open(DialogComponent, { data: articl });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
    
  }

  checkOk(item:VarticleToValidate,event:any){
    if(item.IsOk != false){
   item.IsNotOk = false;
    item.IsOk = true;
    item.Validated = true;
    }
 
    console.log("miditra check ok")
    // console.log(item.ArticleSelectedId)
    // console.log(this.dataList)

    if(this.modifVarticleToValidate.filter(x=>x.ArticleSelectedId == item.ArticleSelectedId).length<=0){
      // if(item.IsNotOk != item.IsOk)
      this.modifVarticleToValidate.push(item)  
      // console.log(this.modifVarticleToValidate.find(x=>x.ArticleSelectedId == item.ArticleSelectedId)) 
    }   
    else{
      var index = this.modifVarticleToValidate.findIndex(x=>x.ArticleSelectedId == item.ArticleSelectedId);
      this.modifVarticleToValidate[index] = item;

    }
    console.log(this.modifVarticleToValidate.find(x=>x.ArticleSelectedId == item.ArticleSelectedId)) 
    
    localStorage.setItem("basketArticle", JSON.stringify(this.modifVarticleToValidate));
    // console.log(this.modifVarticleToValidate)
  }

  @ViewChild('isnotok0-input')myCheckbox!: MatCheckbox;
public getChildren(index:number) {
 
  console.log(this.myCheckbox.checked)
}

  checkNotOk(item:VarticleToValidate,event:any){
    // this.getChildren(1)
      // console.log(item)
      if(item.IsNotOk != false){
        item.IsNotOk = true;
        item.IsOk = false;
      }
    
      // console.log(event.checked)
    
    item.Validated = false;
    // console.log(item)
    // console.log(event)
    // console.log(event.target.name)
    // console.log(item)
    // console.log(this.dataList)
    if(this.modifVarticleToValidate.filter(x=>x.ArticleSelectedId == item.ArticleSelectedId).length<=0){
      // if(item.IsNotOk != item.IsOk)
      this.modifVarticleToValidate.push(item)   
      //console.log(item)
    }   
    else{
     var index = this.modifVarticleToValidate.findIndex(x=>x.ArticleSelectedId == item.ArticleSelectedId);
     this.modifVarticleToValidate[index] = item;
      // this.modifVarticleToValidate.push(item)  
      // console.log(item) 
    }
    // console.log(this.modifVarticleToValidate.find(x=>x.ArticleSelectedId == item.ArticleSelectedId)) 
    localStorage.setItem("basketArticle", JSON.stringify(this.modifVarticleToValidate));
    // console.log(this.modifVarticleToValidate)
  }



}
