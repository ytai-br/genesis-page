import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private url:string ;
  public user: any;
  @Output() option:EventEmitter<string> = new EventEmitter();

  constructor(private httpClient: HttpClient) { 
    this.url ="https://genesis-node-server.herokuapp.com/";
    this.user = {}
    this.user.email = "";
    this.user.firstName = "";
    this.user.lastName = "";
    this.user.password = "";
    this.user.image = "None";
  }

  ngOnInit() {
  }

  saveUser() {
    if (this.isUserValid()) {
      const header = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
      const options = {headers: header};
      this.httpClient.post(this.url + "user/sign-in", this.user, options).subscribe((response:any) => {
        if (response.success) {
          this.cancel();
        }
      });
    }
  }

  isUserValid() {
    return (this.user.firstName && this.user.lastName && this.user.password && this.user.image)
  }

  cancel() {
    this.option.emit("login");
  }

}
