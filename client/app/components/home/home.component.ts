import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'home',
  styleUrls: ['./app/components/home/home.component.css'],
  templateUrl: './app/components/home/home.component.html'
})
export class HomeComponent {

  private songsList: any;
  private artistsList: any;
  private albumsList: any;

  // // Http request example
  // constructor(http: Http) {
  //   http.put('/update', {
  //     model: 'Songs',
  //     _id: "59a59766d0b5050aa8a72038",
  //     model_data: {
  //       name: "try3",
  //     }
  //   }).subscribe(data => {
  //     // Read the result field from the JSON response.
  //     console.log(data);
  //   });
  // }


  //let params: URLSearchParams = new URLSearchParams();
  // params.set('model', 'Songs');
  //params.set('n', 10);

  // Http request example
  constructor(http: Http) {
    http.get('/getNMostViewed', {
      search: 'model=Songs&n=10'

    }).subscribe(data => {
      this.songsList = data.json();
      console.log(data.json());
    });

    http.get('/getNMostViewed', {
      search: 'model=Artists&n=10'

    }).subscribe(data => {
      this.artistsList = data.json();
      console.log(data.json());
    });

    http.get('/getNMostViewed', {
      search: 'model=Albums&n=10'

    }).subscribe(data => {
      this.albumsList = data.json();
      console.log(data.json());
    });
  }

}
