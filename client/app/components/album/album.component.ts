import {Component} from '@angular/core';
import {Http} from "@angular/http";

@Component({
    selector: 'album',
    styleUrls: ['./app/components/album/album.component.css'],
    templateUrl: './app/components/album/album.component.html'
})
export class AlbumComponent {

    private albumsList :any;

    // Http request example
    constructor(http: Http) {
        http.get('/getAll', {
            search: 'model=Albums'
        }).subscribe(data => {
            // Read the result field from the JSON response.
             this.albumsList = eval(data._body);
        });
    }
}
