import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  private url:string ;
  private products: any[]=[];
  constructor( private httpClient: HttpClient) { }

  ngOnInit() {
    this.url ="https://genesis-node-server.herokuapp.com/";
    this.iniciarProductos();
  }
  iniciarProductos(){
    this.products.push({img:"",description:"puto",precio:20,titulo:"titulodekivin"});
    this.products.push({img:"",description:"puto",precio:20,titulo:"titulodekivin"});
    this.httpClient.get(this.url +"product/list").subscribe((response:any)=>{
      if(response)this.products=response;
    });
  /*  this.products.push({img:"",description:"puto",precio:20,titulo:"titulodekivin"});
    this.products.push({img:"",description:"puto",precio:20,titulo:"titulodekivin"});
    this.products.push({img:"",description:"puto",precio:20,titulo:"titulodekivin"});
    this.products.push({img:"",description:"puto",precio:20,titulo:"titulodekivin"});*/
  }
  addProduct(){
     this.products.push({image:"",description:"puto",price:20,title:"titulodekivin"});
  
  }
  
}
