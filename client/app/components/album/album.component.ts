import {Component} from '@angular/core';
import {Http} from "@angular/http";

@Component({
    selector: 'album',
    styleUrls: ['./app/components/album/album.component.css'],
    templateUrl: './app/components/album/album.component.html'
})
export class AlbumComponent {

    private albumsList :any;
    private http;

    // Http request example
    constructor(http: Http) {
        this.http = http;
        http.get('/getAll', {
            search: 'model=Albums'
        }).subscribe(data => {
            // Read the result field from the JSON response.

            this.albumsList = JSON.parse(data._body);
        });
    }

    private delete = function (id) {
        this.http.put('/remove', { model: 'Albums', id: id }).subscribe(data => {
            alert(data._body);

            this.http.get('/getAll', {
                search: 'model=Albums'
            }).subscribe(data => {
                // Read the result field from the JSON response.

                this.albumsList = JSON.parse(data._body);
            });
        });
    }
}
