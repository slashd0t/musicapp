import {Component} from '@angular/core';
import {Http} from "@angular/http";

@Component({
    selector: 'song',
    styleUrls: ['./app/components/song/song.component.css'],
    templateUrl: './app/components/song/song.component.html'
})
export class SongComponent {

    private SongsList:any;

    // Http request example
    constructor(http: Http) {
        http.get('/getAll', {
            search: 'model=Songs'
        }).subscribe(data => {
            // Read the result field from the JSON response.
            this.SongsList = eval(data._body);
        });
    }
}
