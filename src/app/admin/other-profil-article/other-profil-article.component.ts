import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ArticleKeyword } from 'src/models/ArticleKeyword.model';
import { KeywordGeneral } from 'src/models/KeywordGeneral.model';
import { VKeywordDescription } from 'src/models/VKeywordDescription.model';
import { VWebOrders } from 'src/models/VWebOrders.model';
import { VarticleToValidate } from 'src/models/VarticleToValidate.model';
import { ArticleKeywordService } from 'src/shared/ArticleKeyword/ArticleKeyword.service';
import { KeywordGeneralService } from 'src/shared/KeywordGeneral/KeywordGeneral.service';
import { VKeywordDescriptionService } from 'src/shared/VKeywordDescription/VKeywordDescription.service';
import { VWebOrdersService } from 'src/shared/VWebOrders/VWebOrders.service';
import { VarticleToValidateService } from 'src/shared/VarticleToValidate/VarticleToValidate.service';

@Component({
  selector: 'app-other-profil-article-component',
  templateUrl: './other-profil-article.component.html',
  styleUrls: ['./other-profil-article.component.css']
})
export class OtherProfilArticleComponent {
  displayedColumns: string[] = ['priorite', 'commande', 'ID', 'client', 'Ok', 'NOK','Details'];
  priorityId!: number;
  OtherArticleToTreat!: VarticleToValidate[];
  keywordDescription !: VKeywordDescription[];
  dataSource = new MatTableDataSource<VarticleToValidate>();
  keywordgeneralid: KeywordGeneral = new KeywordGeneral();
  weborders:VWebOrders = new VWebOrders();
  NOk !: boolean[];
  ok !: boolean[];
  articleKeyword!:ArticleKeyword[];
  @ViewChild('divcontain') elementView!: any;
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  constructor(@Inject(MAT_DIALOG_DATA) public data: VarticleToValidate,
  private varticleToValidateService:VarticleToValidateService,
  private vkeywordDescriptionService:VKeywordDescriptionService,
  private keywordGeneralService:KeywordGeneralService,
  private vweborderService:VWebOrdersService,
  private keywordArticleService:ArticleKeywordService
  ) {
    console.log(this.data);
  }
  ngAfterViewInit() {
    console.log(+this.elementView.nativeElement.clientHeight)    
  }
  //ngOnInit
  ngOnInit(){
    // console.log(this.data.SourceId)

    

    this.varticleToValidateService.getVarticleToValidateBySourceId(0,10,this.data.SourceId).subscribe(result=>{
      
      console.log(this.data.SourceId)
      console.log(result.length)
      this.NOk = [];
      this.ok = [];
      for(var i=0;i<result.length;i++){
        if(result[i].Validated === true)
        {
          this.NOk.push(false);
          this.ok.push(true);
        }
        else{
          this.NOk.push(true);
          this.ok.push(false);
        }
      }
      
      console.log(this.ok)
      this.dataSource = new MatTableDataSource<VarticleToValidate>(result);
    })
  }

  ShowArticles(element: VarticleToValidate) {
    // console.log(element)
    this.keywordGeneralService.getKeywordGeneralById(0,10,element.OrderId).subscribe(result=>{
      // console.log(result)
      this.keywordgeneralid = result[0];
    })
    this.vkeywordDescriptionService.getVKeywordDescriptionById(0,10,element.OrderId).subscribe(result=>{
      this.keywordDescription = result;

      // console.log(result)
    })

    this.keywordArticleService.getArticleKeywordById(element.ArticleSelectedId,0,10).subscribe((result: ArticleKeyword[])=>{
      this.articleKeyword = result;
      console.log(result)
    })

    this.vweborderService.getVWebOrderById(element.OrderId).subscribe((result: any)=>{
      this.weborders = result
    })

  }

  clickcheckNok(element:boolean,index:number){
    
    if(element)
      {
       
        this.ok[index-1] = !element;
        this.NOk[index-1] = element;
        console.log(element)
      }
  }
  clickcheckOk(element:boolean,index:number){
    console.log(index)
    if(element)
      {
        this.ok[index-1] = element;
        this.NOk[index-1] = !element;
        // this.ok = !this.NOk;
        console.log(element)
      }
  }
}
