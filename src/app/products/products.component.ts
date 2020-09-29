import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  private url:string ;
  public products: any[]=[];
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.url ="https://genesis-node-server.herokuapp.com/";
    this.iniciarProductos();
  }

  iniciarProductos(){
    this.httpClient.get(this.url +"product/list").subscribe((response:any)=>{
      if(response.success) {
        this.products = []
        response.data.forEach(product => {
          product.edited = false;
          this.products.push(product);
        });
      }
    });
  }
  
  addProduct(){
    this.products.push({_id: 0,image:"axax", description:"Descripcion", price: 0.0, title:"Titulo", edited: true});
  }

  deleteProduct(id, position) {
    this.httpClient.delete(this.url + "product/delete/"+id).subscribe((response:any) => {
      if (response.success) {
        this.products.slice(position, 1);
        console.log("eliminado");
      }
    });
  }

  editProduct(position) {
    this.products[position].edited = true;
  }

  updateProduct(id, position) {
    this.products[position].edited = false;
    const header = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    const options = {headers: header};
    if (id == 0) {
      delete this.products[position]["_id"];
      delete this.products[position]["edited"]
      console.log(this.products[position]);
      this.httpClient.post(this.url + "product/save", this.products[position], options).subscribe((response:any) => {
        if (response.success) {
          this.iniciarProductos();
        }
      });
    } else {
      this.httpClient.patch(this.url + "product/update/"+id, this.products[position], options).subscribe((response:any) => {
        if (response.success) {
          console.log("actualizado");
        }
      });
    }
  }
  
}
