import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: any;

  constructor() { 
  }

  login(user: any) {
    if (localStorage.getItem("user")) {
      let userObj = JSON.parse(localStorage.getItem("user"));
      this.user = {};
      this.user.email = userObj.email;
      this.user.firstName = userObj.firstName;
      this.user.lastName = userObj.lastName;
      this.user.role = userObj.role;
    } else {
      this.user = {};
      this.user.email = user.email;
      this.user.firstName = user.firstName;
      this.user.lastName = user.lastName;
      this.user.role = user.role;
      localStorage.setItem("user", JSON.stringify(this.user));
    }
  }

  logout() {
    if (localStorage.getItem("user")) {
      this.user = {};
      localStorage.removeItem("user");
    }
  }

  isUserLoggedIn() {
    if (localStorage.getItem("user")) {
      return true;
    }
    return false;
  }

  isAdministrator() {
    if (this.user) {
      return (this.user.role == "ADMIN");
    }
    return false;
  }

  isClient() {
    if (this.user) {
      return (this.user.role == "CLIENT");
    }
    return false;
  }

}
