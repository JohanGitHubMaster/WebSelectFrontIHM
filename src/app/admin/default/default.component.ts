import { Component, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import { AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { ArticlesToValidateComponent } from '../articles-to-validate/articles-to-validate.component';
import { BasketToValidateComponent } from '../basket-to-validate/basket-to-validate.component';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements AfterViewInit{
@ViewChild(MatSidenav)
sidenav! : MatSidenav;

constructor(private observer : BreakpointObserver,public dialog: MatDialog){}
ngAfterViewInit(): void {
    this.observer.observe('(max-width:800px)').subscribe((res)=>{
      if(res.matches){
        this.sidenav.mode = 'over';
        this.sidenav.close()
      }
      else{
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    })

}



getBasket(){
  if(localStorage.getItem("basketArticle")!=null){
    var storedNames = JSON.parse(localStorage.getItem("basketArticle")!);
    console.log(storedNames)
    this.dialog.open(BasketToValidateComponent,{data:storedNames, width: '140%', height: '90%'});
  }
}




}
