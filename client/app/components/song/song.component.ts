import {Component} from '@angular/core';
import {Http} from "@angular/http";
import {ArtistComponent} from "../artist/artist.component";

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
    private FilteredArtist:any;
    private FilteredAlbum:any;
    private searchFilters = ["","",""];
    private http:any;

    // Http request example
    constructor(http: Http) {

        http.get('/getAll', {
            search: 'model=Songs'
        }).subscribe(data => {
            // Read the result field from the JSON response.
            this.SongsList = JSON.parse(data._body);
        });

        http.get('/getAll', {
            search: 'model=Artists'
        }).subscribe(data => {
            // Read the result field from the JSON response.
            this.ArtistsList = JSON.parse(data._body);
        });

        http.get('/getAll', {
            search: 'model=Albums'
        }).subscribe(data => {
            // Read the result field from the JSON response.
            this.AlbumsList = JSON.parse(data._body);
        });

        http.get('/getAllGenres').subscribe(data => {
            // Read the result field from the JSON response.
            this.GenreList = JSON.parse(data._body);
        });

        this.http = http;


    }

    private setFilter(value, pos){
        this.searchFilters[pos] = value;
        if(pos == 0){
            for(let i = 0; i < this.ArtistsList.length; i++){
                if(this.ArtistsList[i]._id = value){
                    this.FilteredArtist = this.ArtistsList[i];
                }
            }
        }
        else if(pos == 1){
            for(let i = 0; i < this.AlbumsList.length; i++){
                if(this.AlbumsList[i]._id = value){
                    this.FilteredAlbum = this.AlbumsList[i];
                }
            }
        }
        this.getRelaventSongs(this.http);
    }

    private resetFilters(){
        this.searchFilters = ["","",""];
        this.getRelaventSongs(this.http);
    }

    private getRelaventSongs(http: Http){

        let searchQuery = "";

        if(this.searchFilters[0] == "" && this.searchFilters[1] == "" && this.searchFilters[2] == ""){
            http.get('/getAll', {
                search: 'model=Songs'
            }).subscribe(data => {
                // Read the result field from the JSON response.
                this.SongsList = eval(data._body);
            });
        }
        else {

            if(this.searchFilters[0] != ""){
                if(searchQuery == ""){
                    searchQuery = searchQuery + 'artist=' + this.searchFilters[0];
                }
                else{
                    searchQuery = searchQuery + '&artist=' + this.searchFilters[0];
                }

            }
            if(this.searchFilters[1] != ""){
                if(searchQuery == "") {
                    searchQuery = searchQuery + 'album=' + this.searchFilters[1];
                }
                else{
                    searchQuery = searchQuery + '&album=' + this.searchFilters[1];
                }
            }
            if(this.searchFilters[2] != ""){
                if(searchQuery == "") {
                    searchQuery = searchQuery + 'genre=' + this.searchFilters[2];
                }
                else{
                    searchQuery = searchQuery + '&genre=' + this.searchFilters[2];
                }
            }

            http.get('/getSongs', {
                search: searchQuery
            }).subscribe(data => {
                // Read the result field from the JSON response.
                this.SongsList = eval(data._body);
            });
        }

    }

    private deleteSong = function(id){
        this.http.
    }
}
