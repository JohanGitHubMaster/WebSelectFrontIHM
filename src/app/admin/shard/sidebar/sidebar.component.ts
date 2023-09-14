import { Component } from '@angular/core';
import { StatisticsService } from 'src/shared/Statistics/Statistics.service.';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
userInfo!:String;
constructor(private statisticService:StatisticsService){

}
ngOnInit(){
  this.statisticService.getUser().subscribe(result=>{
    this.userInfo = result.user;
  })
}
}
