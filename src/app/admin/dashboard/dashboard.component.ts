import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, of, startWith } from 'rxjs';
import { MapFlow } from 'src/models/MapFlow.model';
import { MapLocation } from 'src/models/MapLocation.model';
import { VOrderToTreat } from 'src/models/VOrderToTreat.model';
import { VWebOrders } from 'src/models/VWebOrders.model';
import { MapFlowService } from 'src/shared/MapFlow/MapFlow.service';
import { MapLocationService } from 'src/shared/MapLocation/MapLocations.service';
import { VOrderToTreatService } from 'src/shared/VarticleOrderToTreat/VarticleOrderToTreat.service';
import { VWebOrdersService } from 'src/shared/VWebOrders/VWebOrders.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  displayedColumns: string[] = ['priorite', 'commande', 'ID', 'client', 'hits', 'traitee', 'hitsValides', 'localisation', 'origine', 'lecteur'];
  vWebOrders!:VWebOrders[];
  myControl = new FormControl('');
  OrderControl = new FormControl('');
  CustomerIDControl = new FormControl('');
  OrderIdOptionsControl = new FormControl('');
  LocationControl = new FormControl('');
  origineControl= new FormControl('');
  priorityControl= new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;
  filteredCustomerIdOptions!: Observable<string[]>;
  filteredOrderOptions!: Observable<string[]>;
  filteredOrderIdOptions!: Observable<string[]>;
  filteredMapLocationOptions!: Observable<string[]>;
  filteredOrigine!: Observable<string[]>;
  filteredPriority!: Observable<string[]>;
  priorityId!: number;
  vorderToTreats!:VOrderToTreat[];
  maplocation!:MapLocation[];
  mapflow!:MapFlow[];
  //pagination
  length = 500;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 20];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  
  dataSource = new MatTableDataSource<VOrderToTreat>(this.vorderToTreats);

  @ViewChild
    (MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vWebOrdersService:VWebOrdersService,
    private vOrderToTreatService:VOrderToTreatService,
    private mapLocationService:MapLocationService,
    private mapFlowService:MapFlowService ) { }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
   
  }

  ngOnInit() {
    this.mapFlowService.getMapFlow().subscribe(result=>{
      this.mapflow = result;
    })

    this.mapLocationService.getMapLocation().subscribe(result=>{
      this.maplocation = result;
    })
    this.vOrderToTreatService.getVOrderToTreat(0,10,+this.CustomerIDControl.value!,
                                                    +this.OrderIdOptionsControl.value!,
                                                    this.LocationControl.value!,
                                                    this.origineControl.value!,
                                                    +this.priorityControl.value!,
                                                  ).subscribe(result=>{

    // this.vOrderToTreatService.getVOrderToTreat(0,10,+(this.OrderIdOptionsControl.value!),+this.CustomerIDControl.value!,this.LocationControl.value!,this.origineControl.value!,+this.priorityControl.value!).subscribe(result=>{
     
      // this.vorderToTreats = result.docs;
      this.length = 590//result.Length;
      // this.vorderToTreats = result.result;   
      this.vorderToTreats = result;   

      // console.log(this.vorderToTreats)
      this.dataSource = new MatTableDataSource<VOrderToTreat>(this.vorderToTreats);     
    })
      
    
    this.vWebOrdersService.getVWebOrders(1,1000).subscribe(result=>{
      this.vWebOrders = result.docs;
   

      //console.log(this.vWebOrders);
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
      //filtre des commandes
      this.filteredOrderOptions = this.OrderControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterOrder(value || '')),
      );

      //filtre par Id du client 
      this.filteredCustomerIdOptions = this.CustomerIDControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterCustomerID(value || '')),
      );

      //filtre par id de la Commande
      this.filteredOrderIdOptions = this.OrderIdOptionsControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterOrderID(value || '')),
      );

      this.filteredMapLocationOptions = this.LocationControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterMapLocation(value || '')),
      );

      this.filteredOrigine = this.origineControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterMapFlow(value || '')),
      );

    })
    
  }

  

  ShowArticles(element:VOrderToTreat) {
    // this.priorityId = element.priorite
    this.router.navigate(["/articleToValidate/"+element.OrderId])
    // console.log(element)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    // const customer = this.vWebOrders.map(function(customer){
    //   return customer.Customer
    // })
    const unique = [...new Set(this.vWebOrders?.map(item => item.Customer))];
    // var s = this.vWebOrders?.map(function (value) {
    //   return value.Customer
    // });
    //console.log(unique)
   

    return unique?.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterOrder(value: string): string[] {
    const filterValue = value.toLowerCase();
    const unique = [...new Set(this.vWebOrders?.map(item => item.OrderName.toString()))];
    //console.log(unique)
    return unique?.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterCustomerID(value: string): string[] {
    const filterValue = value.toLowerCase();
    const unique = [...new Set(this.vWebOrders?.map(item => item.CustomerId.toString()))];
    //console.log(unique)
    return unique?.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterOrderID(value: string): string[] {
    const filterValue = value.toLowerCase();
    const unique = [...new Set(this.vWebOrders?.map(item => item.OrderId.toString()))];
    // console.log(value)
    return unique?.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filterOrderByCustomer(value: string,vWebOrders:VWebOrders): string[] {
    const filterValue = value.toLowerCase();
    const unique = [...new Set(this.vWebOrders?.filter(item=>item.CustomerId==vWebOrders.CustomerId).map(item => item.OrderName.toString()))];
    // console.log(value)
    return unique?.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterOrderIDByCustomer(value: string,vWebOrders:VWebOrders): string[] {
    const filterValue = value.toLowerCase();
    const unique = [...new Set(this.vWebOrders?.filter(item=>item.CustomerId==vWebOrders.CustomerId).map(item => item.OrderId.toString()))];
    // console.log(value)
    return unique?.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterMapLocation(value: string): string[] {
    const filterValue = value.toLowerCase();
    const unique = [...new Set(this.maplocation?.map(item => item.DescFrench.toString()))];
    // console.log(value)
    return unique?.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterMapFlow(value: string): string[] {
    const filterValue = value.toLowerCase();
    const unique = [...new Set(this.mapflow?.map(item => item.DescFrench.toString()))];
    // console.log(value)
    return unique?.filter(option => option.toLowerCase().includes(filterValue));
  }

  setValueCustomer(event:any){
    // console.log(event);
    // console.log(this.vWebOrders?.filter(x=>x.CustomerId == event)[0])
    var result = this.vWebOrders?.filter(x=>x.CustomerId == event)[0];
    this.myControl.setValue(result.Customer)
    this.OrderControl.setValue('')
    this.OrderIdOptionsControl.setValue('')
    // const uniqueOrderId = [...new Set(this.vWebOrders?.filter(x=>x.CustomerId==result.CustomerId).map(item => item.OrderId.toString()))];
    // const uniqueOrderName = [...new Set(this.vWebOrders?.filter(x=>x.CustomerId==result.CustomerId).map(item => item.OrderName.toString()))];
    // this.filteredOrderIdOptions = of(uniqueOrderId)
    // this.filteredOrderOptions = of(uniqueOrderName)

     //filtre des commandes
     this.filteredOrderOptions = this.OrderControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterOrderByCustomer(value || '',result)),
    );

    this.filteredOrderIdOptions = this.OrderIdOptionsControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterOrderIDByCustomer(value || '',result)),
    );

 
    
    // console.log(of([...new Set(this.vWebOrders?.filter(x=>x.CustomerId==result.CustomerId).map(item => item.OrderId.toString()))]))
    //this.myControl = new FormControl(this.vWebOrders?.filter(x=>x.CustomerId == event)[0].Customer)
  }

  setValueCustomerID(event:any){
    // console.log(event);
    // console.log(this.vWebOrders?.filter(x=>x.Customer == event)[0])
    var result = this.vWebOrders?.filter(x=>x.Customer == event)[0];
    this.CustomerIDControl.setValue(result.CustomerId.toString())
    this.OrderControl.setValue('')
    this.OrderIdOptionsControl.setValue('')
    // const uniqueOrderId = [...new Set(this.vWebOrders?.filter(x=>x.CustomerId==result.CustomerId).map(item => item.OrderId.toString()))];
    // const uniqueOrderName = [...new Set(this.vWebOrders?.filter(x=>x.CustomerId==result.CustomerId).map(item => item.OrderName.toString()))];
    // this.filteredOrderIdOptions = of(uniqueOrderId)
    // this.filteredOrderOptions = of(uniqueOrderName)

    //filtre des commandes
    this.filteredOrderOptions = this.OrderControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterOrderByCustomer(value || '',result)),
    );

    this.filteredOrderIdOptions = this.OrderIdOptionsControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterOrderIDByCustomer(value || '',result)),
    );
    

    //this.myControl = new FormControl(this.vWebOrders?.filter(x=>x.CustomerId == event)[0].Customer)
  }

  setValueOrder(event:any){
    // console.log(event);
    // console.log(this.vWebOrders?.filter(x=>x.OrderId == event)[0])
    console.log(event)
    var result = this.vWebOrders?.filter(x=>x.OrderId == event)[0]
    this.OrderControl.setValue(result?.OrderName.toString())
    this.CustomerIDControl.setValue(result?.CustomerId.toString())
    this.myControl.setValue(result?.Customer)
    //this.myControl = new FormControl(this.vWebOrders?.filter(x=>x.CustomerId == event)[0].Customer)
  }

  setValueOrderID(event:any){
    // console.log(event);
    // console.log(this.vWebOrders?.filter(x=>x.OrderName == event)[0])
    var result = this.vWebOrders?.filter(x=>x.OrderName == event)[0]
    this.OrderIdOptionsControl.setValue(result?.OrderId.toString())
    this.CustomerIDControl.setValue(result?.CustomerId.toString())
    this.myControl.setValue(result?.Customer)
    //this.myControl = new FormControl(this.vWebOrders?.filter(x=>x.CustomerId == event)[0].Customer)
  }

  initializePriority(){
    this.priorityControl.setValue('');
  }

  initializeOrigin(){
    this.origineControl.setValue('');
  }

  initializeCustomer(){
          this.myControl.setValue('')
          this.CustomerIDControl.setValue('')

        //console.log(this.vWebOrders);
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
        //filtre des commandes
        this.filteredOrderOptions = this.OrderControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterOrder(value || '')),
        );

        //filtre par Id du client 
        this.filteredCustomerIdOptions = this.CustomerIDControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterCustomerID(value || '')),
        );

        //filtre par id de la Commande
        this.filteredOrderIdOptions = this.OrderIdOptionsControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterOrderID(value || '')),
        ); 
  }

  initializeOrder(){
          this.OrderControl.setValue('')
          this.OrderIdOptionsControl.setValue('') 
  }

  //pagination
  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    var current = (e.pageIndex) * e.pageSize;
    //this.vorderToTreats = ELEMENT_DATA.slice(current, e.pageSize + current)
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    console.log(this.LocationControl.value!)
 
    this.vOrderToTreatService.getVOrderToTreat(e.pageIndex, this.pageSize,+this.CustomerIDControl.value!,
                                                                          +this.OrderIdOptionsControl.value!,
                                                                          this.LocationControl.value!,
                                                                          this.origineControl.value!,
                                                                          +this.priorityControl.value!,
                                                                        ).subscribe(result=>{
    //this.vOrderToTreatService.getVOrderToTreat(current, this.pageSize,+(this.OrderIdOptionsControl.value!),+this.CustomerIDControl.value!,this.LocationControl.value!,this.origineControl.value!,+this.priorityControl.value!).subscribe(result=>{
    //  console.log("le plus "+e.pageSize)
    //  console.log(current)
      // this.vorderToTreats = result.docs;
      this.length = 590//result.Length;
      // this.vorderToTreats = result.result;
      this.vorderToTreats = result;


      // console.log(this.vorderToTreats)
      this.dataSource = new MatTableDataSource<VOrderToTreat>(this.vorderToTreats);
      
    })
  }

  getfilterOrderToTreat(){

    // console.log(this.OrderIdOptionsControl.value!)
     console.log(this.CustomerIDControl.value!)
    
    this.vOrderToTreatService.getVOrderToTreat(0,10,+this.CustomerIDControl.value!,
                                                    +this.OrderIdOptionsControl.value!,
                                                    this.LocationControl.value!,
                                                    this.origineControl.value!,
                                                    +this.priorityControl.value!,
                                                  ).subscribe(result=>{
    // this.vOrderToTreatService.getVOrderToTreat(0, this.pageSize,+(this.OrderIdOptionsControl.value!),+this.CustomerIDControl.value!,this.LocationControl.value!,this.origineControl.value!,+this.priorityControl.value!).subscribe(result=>{
     
      // this.vorderToTreats = result.docs;
      this.length = 590//result.Length;
      this.vorderToTreats = result;
      // this.vorderToTreats = result.result;

      // console.log(this.vorderToTreats)
      this.dataSource = new MatTableDataSource<VOrderToTreat>(this.vorderToTreats);
      
    })
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

}
export interface PeriodicElement {
  priorite: number;
  commande: string;
  ID: number;
  client: string;
  hits: number;
  traitee: number;
  hitsValides: number;
  localisation: string;
  origine: string;
  lecteur: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { priorite: 1, commande: 'ACME', ID: 30121, client: 'H', hits: 1, traitee: 1, hitsValides: 1, localisation: 'Madagascar', origine: 'Belgique', lecteur: 'Jean' },
  { priorite: 2, commande: 'ACME', ID: 30122, client: 'H', hits: 1, traitee: 1, hitsValides: 1, localisation: 'Madagascar', origine: 'Belgique', lecteur: 'Jean' },
  { priorite: 3, commande: 'ACME', ID: 30123, client: 'H', hits: 1, traitee: 1, hitsValides: 1, localisation: 'Madagascar', origine: 'Belgique', lecteur: 'Jean' },
  { priorite: 4, commande: 'ACME', ID: 30124, client: 'H', hits: 1, traitee: 1, hitsValides: 1, localisation: 'Madagascar', origine: 'Belgique', lecteur: 'Jean' },
  { priorite: 5, commande: 'ACME', ID: 30125, client: 'H', hits: 1, traitee: 1, hitsValides: 1, localisation: 'Madagascar', origine: 'Belgique', lecteur: 'Jean' },
  { priorite: 6, commande: 'ACME', ID: 30126, client: 'H', hits: 1, traitee: 1, hitsValides: 1, localisation: 'Madagascar', origine: 'Belgique', lecteur: 'Jean' },
  { priorite: 7, commande: 'ACME', ID: 30127, client: 'H', hits: 1, traitee: 1, hitsValides: 1, localisation: 'Madagascar', origine: 'Belgique', lecteur: 'Jean' },
  { priorite: 8, commande: 'ACME', ID: 30128, client: 'H', hits: 1, traitee: 1, hitsValides: 1, localisation: 'Madagascar', origine: 'Belgique', lecteur: 'Jean' },
  { priorite: 9, commande: 'ACME', ID: 30129, client: 'H', hits: 1, traitee: 1, hitsValides: 1, localisation: 'Madagascar', origine: 'Belgique', lecteur: 'Jean' },
  { priorite: 10, commande: 'ACME', ID: 30130, client: 'H', hits: 1, traitee: 1, hitsValides: 1, localisation: 'Madagascar', origine: 'Belgique', lecteur: 'Jean' },
  { priorite: 11, commande: 'ACME', ID: 30131, client: 'H', hits: 1, traitee: 1, hitsValides: 1, localisation: 'Madagascar', origine: 'Belgique', lecteur: 'Jean' },
  { priorite: 12, commande: 'ACME', ID: 30132, client: 'H', hits: 1, traitee: 1, hitsValides: 1, localisation: 'Madagascar', origine: 'Belgique', lecteur: 'Jean' },
  { priorite: 13, commande: 'ACME', ID: 30133, client: 'H', hits: 1, traitee: 1, hitsValides: 1, localisation: 'Madagascar', origine: 'Belgique', lecteur: 'Jean' },
  { priorite: 14, commande: 'ACME', ID: 30134, client: 'H', hits: 1, traitee: 1, hitsValides: 1, localisation: 'Madagascar', origine: 'Belgique', lecteur: 'Jean' },
  { priorite: 15, commande: 'ACME', ID: 30135, client: 'H', hits: 1, traitee: 1, hitsValides: 1, localisation: 'Madagascar', origine: 'Belgique', lecteur: 'Jean' },
  { priorite: 16, commande: 'ACME', ID: 30136, client: 'H', hits: 1, traitee: 1, hitsValides: 1, localisation: 'Madagascar', origine: 'Belgique', lecteur: 'Jean' },
  { priorite: 17, commande: 'ACME', ID: 30137, client: 'H', hits: 1, traitee: 1, hitsValides: 1, localisation: 'Madagascar', origine: 'Belgique', lecteur: 'Jean' },
  { priorite: 18, commande: 'ACME', ID: 30138, client: 'H', hits: 1, traitee: 1, hitsValides: 1, localisation: 'Madagascar', origine: 'Belgique', lecteur: 'Jean' },
  { priorite: 19, commande: 'ACME', ID: 30139, client: 'H', hits: 1, traitee: 1, hitsValides: 1, localisation: 'Madagascar', origine: 'Belgique', lecteur: 'Jean' },
  { priorite: 20, commande: 'ACME', ID: 30140, client: 'H', hits: 1, traitee: 1, hitsValides: 1, localisation: 'Madagascar', origine: 'Belgique', lecteur: 'Jean' },
];
