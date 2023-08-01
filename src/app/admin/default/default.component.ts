import { Component, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import { AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { ArticlesToValidateComponent } from '../articles-to-validate/articles-to-validate.component';

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



@ViewChild('child') child!:ArticlesToValidateComponent;
status:any;

showStatus($event:any){
  // console.log($event);
  this.status=$event;
  
}

getBasket(){
  this.child.getBasket();
  console.log(this.status)
  //  this.dialog.open(BasketToValidateComponent);
}




}
