import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  productos(){
    let interval =setInterval(function(){
      let y=window.scrollY;
      y++;
    window.scrollTo (0,y);
    },1);
    setTimeout(function(){
      clearInterval(interval);
   }, 2000);
  }
  
}

