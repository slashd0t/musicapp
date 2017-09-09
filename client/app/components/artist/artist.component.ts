import {Component} from '@angular/core';
import {Http} from "@angular/http";

@Component({
    selector: 'artist',
    styleUrls: ['./app/components/artist/artist.component.css'],
    templateUrl: './app/components/artist/artist.component.html'
})
export class ArtistComponent {

    private artistsList :any;

    // Http request example
    constructor(http: Http) {
        http.get('/getAll', {
            search: 'model=Artists'
        }).subscribe(data => {
            // Read the result field from the JSON response.
            this.artistsList = JSON.parse(data._body);
        });
    }
}

