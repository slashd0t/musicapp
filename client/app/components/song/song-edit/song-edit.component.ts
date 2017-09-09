import {Component, NgModule} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Http} from "@angular/http";
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'song-edit',
    styleUrls: ['./app/components/song/song.component.css'],
    templateUrl: './app/components/song/song-edit/song-edit.component.html'
})
export class SongEditComponent {
    private id: string;
    private song: any;
    private sub: any;
    private innerHttp: any;
    private artistsList: any;
    private albumsList: any;
    private genresList: any;
    private searchParams: string;

    constructor(private route: ActivatedRoute,
                private http: Http) {
        this.innerHttp = http;
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number


            if (this.id) {

                this.searchParams = 'id=' + this.id;
                // Http request example
                http.get('/getFullDetailSong', {
                    search: this.searchParams
                }).subscribe(data => {
                    // Read the result field from the JSON response.
                    this.song = JSON.parse(data._body);

                });


                http.get('/getAll', {
                    search: 'model=Artists'
                }).subscribe(data => {
                    // Read the result field from the JSON response.
                    this.artistsList = JSON.parse(data._body);
                    console.log("artistsList: " + this.artistsList)

                });

                http.get('/getAll', {
                    search: 'model=Albums'
                }).subscribe(data => {
                    // Read the result field from the JSON response.
                    this.albumsList = JSON.parse(data._body);
                    console.log("albumsList: " + this.albumsList)
                });

                http.get('/getAllGenres').subscribe(data => {
                    // Read the result field from the JSON response.
                    this.genresList = JSON.parse(data._body);

                    console.log("GENRES: " + this.genresList)
                });


            }
        });
    }

    private pictureChange = function (event) {
        var inputValue = event.target

        var file:File = inputValue.files[0];
        var myReader:FileReader = new FileReader();

        myReader.onloadend = (e) => {
            this.song.picture = myReader.result;
        }
        myReader.readAsDataURL(file);

    }

    private saveSong = function () {

        if (this.song.name.replace(" ", "") == "") {
            alert("Song must have a name");
        }
        else {



            this.searchParams = 'model=Artists&id=' + this.id;
            // Http request example
            this.innerHttp.put('/update', {
                model: 'Songs',
                id: this.song._id,
                model_data: this.song

            }).subscribe(data => {
                // Read the result field from the JSON response.
                alert(data._body);

            });
        }

    }
}

