import {Component} from '@angular/core';
import {Http} from "@angular/http";

@Component({
    selector: 'artist',
    styleUrls: ['./app/components/artist/artist.component.css'],
    templateUrl: './app/components/artist/artist.component.html'
})
export class ArtistComponent {

    private artistsList :any;
    private http;

    // Http request example
    constructor(http: Http) {
        this.http = http;
        http.get('/getAll', {
            search: 'model=Artists'
        }).subscribe(data => {
            // Read the result field from the JSON response.

            this.artistsList = JSON.parse(data._body);
        });
    }

    private delete = function (id) {
        this.http.put('/remove', { model: 'Artists', id: id }).subscribe(data => {
            alert(data._body);
                this.http.get('/getAll', {
                    search: 'model=Artists'
                }).subscribe(data => {
                    // Read the result field from the JSON response.

                    this.artistsList = JSON.parse(data._body);
                });
        });
    }
}

