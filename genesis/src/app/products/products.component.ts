import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user-service/user.service'

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  private url:string ;
  public products: any[]=[];
  constructor(private httpClient: HttpClient,
              public userService: UserService) { }

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
    if (id == 0) {
      this.iniciarProductos();
    } else {
      this.httpClient.delete(this.url + "product/delete/"+id).subscribe((response:any) => {
        if (response.success) {
          this.iniciarProductos();
        }
      });
    }
  }

  editProduct(position) {
    this.products[position].edited = true;
  }

  handleInputChange(e, position) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    let self = this;
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      self.products[position].image = "`data:image/png;base64" + reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  updateProduct(id, position) {
    this.products[position].edited = false;
    const header = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    const options = {headers: header};
    if (id == 0) {
      delete this.products[position]["_id"];
      delete this.products[position]["edited"]
      this.httpClient.post(this.url + "product/save", this.products[position], options).subscribe((response:any) => {
        if (response.success) {
          this.iniciarProductos();
        }
      });
    } else {
      this.httpClient.patch(this.url + "product/update/"+id, this.products[position], options).subscribe((response:any) => {
        if (response.success) {
          this.iniciarProductos();
        }
      });
    }
  }

  getBase64(image) {
    let me = this;
    let file = image;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      return reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
      return "...";
    };
 }
 
  
}
