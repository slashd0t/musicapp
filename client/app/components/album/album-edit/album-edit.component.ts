import {Component, NgModule} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Http} from "@angular/http";
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'album-edit',
    styleUrls: ['./app/components/album/album.component.css'],
    templateUrl: './app/components/album/album-edit/album-edit.component.html'
})
export class AlbumEditComponent {
    private id: string;
    private album: any;
    private sub: any;
    private innerHttp: any;
    private artistsList: any;
    private searchParams: string;

    constructor(private route: ActivatedRoute,
                private http: Http) {

        this.innerHttp = http;

        this.sub = this.route.params.subscribe(params => {


            this.id = params['id'];

            if (this.id) {

                this.searchParams = 'model=Albums&id=' + this.id;
                // Http request example
                http.get('/getById', {
                    search: this.searchParams
                }).subscribe(data => {
                    // Read the result field from the JSON response.
                    this.album = JSON.parse(data._body)[0];

                });

                http.get('/getAll', {
                    search: 'model=Artists'
                }).subscribe(data => {
                    // Read the result field from the JSON response.
                    this.artistsList = JSON.parse(data._body);
                    console.log("artistsList: " + this.artistsList)

                });
            }
        });
    }

    private pictureChange = function (event) {
        var inputValue = event.target

        var file:File = inputValue.files[0];
        var myReader:FileReader = new FileReader();

        myReader.onloadend = (e) => {
            this.album.picture = myReader.result;
        }
        myReader.readAsDataURL(file);

    }

    private saveAlbum = function () {

        if (this.album.name.replace(" ", "") == "") {
            alert("Album must have a name");
        }
        else {

            this.nonIdAlbum =  JSON.parse(JSON.stringify(this.album));

            delete this.nonIdAlbum._id;

            // Http request example
            this.innerHttp.put('/update', {
                model: 'Albums',
                id: this.album._id,
                model_data: this.nonIdAlbum

            }).subscribe(data => {
                // Read the result field from the JSON response.
                alert(data._body);

            });
        }

    }
}

