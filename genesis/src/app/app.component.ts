import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'genesis-page';
  option = 'login';

  public getOption(option) {
    this.option = option;
  }

  public exitRegistration(option) {
    this.option = option;
  }
  
}
