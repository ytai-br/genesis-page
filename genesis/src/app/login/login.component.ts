import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private url:string;
  public user: any;
  @Output() option:EventEmitter<string> = new EventEmitter();

  constructor(private httpClient: HttpClient) { 
    this.url ="https://genesis-node-server.herokuapp.com/";
    this.user = {};
    this.user.email = "";
    this.user.password = "";
  }

  ngOnInit() {
  }

  openRegister() {
    this.option.emit("register");
  }

  login() {
    const header = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    const options = {headers: header};
    this.httpClient.post(this.url + "user/login", this.user, options).subscribe((response:any) => {
      if (response.success) {
        console.log("entro: ", response.data);
      }
    });
  }

}
