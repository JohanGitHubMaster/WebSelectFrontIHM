import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Statistics } from 'src/models/Statistique.model';
import { StatisticsService } from 'src/shared/Statistics/Statistics.service.';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  
  statistics!:Statistics[];
  top = new FormControl('10');
  topUser = new FormControl('10');
  limit = 10;
  chartOptions = {
	  
	}
  chartOptionsUser = {

  }
  constructor(private statisticService:StatisticsService){

  }
  onChange(){
    console.log(this.top)
    this.limit = +this.top.value!;
    console.log(this.limit)
    this.statisticService.getStatisticNbArticlePerOrder(this.limit).subscribe(result=>{     
      var datalist =[
          { name: "", y: 0 },        
        ];

        console.log(datalist)
      result.forEach((element => {
           datalist.push({name:element._id.toString(), y:+element.count});
        })
        );

      this.chartOptions = {
        animationEnabled: true,
        theme: "white",
        exportEnabled: true,
        title: {
        text: "top "+this.limit+" des nombres de tous les articles par commandes"
        },
        subtitles: [{
        text: "le numero des commandes / le nombres de ses articles"
        }],
        data: [{
        type: "doughnut", //change type to column, line, area, doughnut, etc
        indexLabel: "la commande {name} avec {y} articles",
        dataPoints: datalist,
         }]
      }
    })
  }

  onChangeUser(){
    console.log(this.top)
    this.limit = +this.topUser.value!;
    console.log(this.limit)
    this.statisticService.getStatisticNbArticlePerUser(this.limit).subscribe(result=>{     
      var datalist =[
          { name: "", y: 0 },        
        ];

      console.log(datalist)
      result.forEach((element => {
           datalist.push({name:element._id, y:+element.count});
        })
        );

      this.chartOptionsUser = {
        animationEnabled: true,
        theme: "white",
        exportEnabled: true,
        title: {
        text: "top "+this.limit+" des nombres de tous les articles validé par les utilisateurs"
        },
        subtitles: [{
        text: "le nom des utilisateurs / le nombres de ses articles"
        }],
        data: [{
        type: "pie", //change type to column, line, area, doughnut, etc
        indexLabel: "l'utilisateur {name} a validé {y} articles",
        dataPoints: datalist,
         }]
      }
    })
  }

  
  ngOnInit(){
    this.statisticService.getStatisticNbArticlePerOrder(this.limit).subscribe(result=>{
      var datalist =[
          { name: "", y: 0 },        
        ];

      result.forEach((element => {
           datalist.push({name:element._id.toString(), y:+element.count});
        })
        );

      this.chartOptions = {
        animationEnabled: true,
        theme: "white",
        exportEnabled: true,
        title: {
        text: "top "+this.limit+" des nombres de tous les articles par commandes"
        },
        subtitles: [{
        text: "le numero des commandes / le nombres de ses articles"
        }],
        data: [{
        type: "doughnut", //change type to column, line, area, doughnut, etc
        indexLabel: "la commande {name} avec {y} articles",
        dataPoints: datalist,
         }]
      }
    })
  }


}
