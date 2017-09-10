import {Component, NgModule} from '@angular/core';
import {Http} from "@angular/http";
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'song-create',
    styleUrls: ['./app/components/song/song.component.css'],
    templateUrl: './app/components/song/song-create/song-create.component.html'
})
export class SongCreateComponent {
    private id: string;
    private song: any;
    private innerHttp: any;
    private artistsList: any;
    private albumsList: any;
    private genresList: any;
    private searchParams: string;

    constructor(private http: Http) {

        this.song = {
            name : " ",
            artist : null,
            album : null,
            date :  " ",
            picture : "",
            genre : null,
            views : 0
        };

        this.innerHttp = http;

        http.get('/getAll', {
            search: 'model=Artists'
        }).subscribe(data => {
            // Read the result field from the JSON response.
            this.artistsList = JSON.parse(data._body);

            this.song.artist = this.artistsList[0]._id,
            console.log("artistsList: " + this.artistsList)

        });

        http.get('/getAll', {
            search: 'model=Albums'
        }).subscribe(data => {

            // Read the result field from the JSON response.
            this.albumsList = JSON.parse(data._body);

            this.song.album = this.albumsList[0]._id;

            console.log("albumsList: " + this.albumsList);

        });

        http.get('/getAllGenres').subscribe(data => {
            // Read the result field from the JSON response.
            this.genresList = JSON.parse(data._body);

            console.log("GENRES: " + this.genresList)
            this.song.genre = this.genresList[0];
        });

    }

    private pictureChange = function (event) {
        var inputValue = event.target

        var file: File = inputValue.files[0];
        var myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
            this.song.picture = myReader.result;
        }
        myReader.readAsDataURL(file);

    }

    private saveSong = function () {

        if (this.song.name.replace(" ", "") == "") {
            alert("Song must have a name");

        }
        else if(!this.song.artist) {
            alert("Song must have an artist");

        }
        else if(!this.song.album) {
            alert("Song must have an album");

        }
        else {

            // Http request example
            this.innerHttp.put('/insert', {
                model: 'Songs',
                model_data: this.song

            }).subscribe(data => {
                // Read the result field from the JSON response.
                alert(data._body);

            });
        }

    }
}

