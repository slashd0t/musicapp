import {Component} from '@angular/core';
import {Http} from "@angular/http";

@Component({
    selector: 'song',
    styleUrls: ['./app/components/song/song.component.css'],
    templateUrl: './app/components/song/song.component.html'
})
export class SongComponent {

    private SongsList:any;
    private ArtistsList:any;
    private AlbumsList:any;
    private GenreList:any;
    private searchFilters = ["","",""];

    // Http request example
    constructor(http: Http) {

        http.get('/getAll', {
            search: 'model=Songs'
        }).subscribe(data => {
            // Read the result field from the JSON response.
            this.SongsList = eval(data._body);
        });

        http.get('/getAll', {
            search: 'model=Artists'
        }).subscribe(data => {
            // Read the result field from the JSON response.
            this.ArtistsList = eval(data._body);
        });

        http.get('/getAll', {
            search: 'model=Albums'
        }).subscribe(data => {
            // Read the result field from the JSON response.
            this.AlbumsList = eval(data._body);
        });

        http.get('/getAllGenres').subscribe(data => {
            // Read the result field from the JSON response.
            this.GenreList = eval(data._body);
        });


    }

    private setFilter(value, pos){
        this.searchFilters[pos] = value;
    }

    private getRelaventSongs(){

    }
}
