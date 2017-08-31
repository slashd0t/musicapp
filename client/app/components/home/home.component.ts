import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'home',
  styleUrls: ['./app/components/home/home.component.css'],
  templateUrl: './app/components/home/home.component.html'
})
export class HomeComponent {

  // Http request example
  constructor(http: Http) {
    http.put('/update', {
      model: 'Songs',
      _id: "59a59766d0b5050aa8a72038",
      model_data: {
        name: "try3",
      }
    }).subscribe(data => {
      // Read the result field from the JSON response.
      console.log(data);
    });
  }
}
