import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VarticleToValidate } from 'src/models/VarticleToValidate.model';
import { ArticleSelectedService } from 'src/shared/ArticleSelected/ArticleSelected.service';
import { VWebOrdersService } from 'src/shared/VWebOrders/VWebOrders.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data:Array<VarticleToValidate>,
                                       private articleSelectedService:ArticleSelectedService,
                                       private vweborderService:VWebOrdersService) 
  {
    console.log(this.data);
  }
  ngOnInit(): void {
    
  }
  UpdateArticle(){
    console.log(this.data)
    for(var item of this.data){
      this.articleSelectedService.UpdateArticle(item.ArticleSelectedId,item.Validated,"utilisateur",false,item.Comment).subscribe(result=>{
        console.log(result)
  
      })
    }
    
    // let user = new ActiveXObject("WSCRIPT.Network");
    // console.log("ito ny uq-ser " +this.vweborderService.getWindowsUsername());
  }
}
