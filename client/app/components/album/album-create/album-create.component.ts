import {Component, NgModule} from '@angular/core';
import {Http} from "@angular/http";
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'album-create',
    styleUrls: ['./app/components/album/album.component.css'],
    templateUrl: './app/components/album/album-create/album-create.component.html'
})
export class AlbumCreateComponent {
    private album: any;
    private innerHttp: any;
    private artistsList: any;

    constructor(private http: Http) {

        this.album = {
            name : " ",
            artist : null,
            date :  " ",
            picture : "",
            views : 0
        };

        this.innerHttp = http;

        http.get('/getAll', {
            search: 'model=Artists'
        }).subscribe(data => {
            // Read the result field from the JSON response.
            this.artistsList = JSON.parse(data._body);

            this.album.artist = this.artistsList[0]._id,
            console.log("artistsList: " + this.artistsList)

        });


    }

    private pictureChange = function (event) {
        var inputValue = event.target

        var file: File = inputValue.files[0];
        var myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
            this.album.picture = myReader.result;
        }
        myReader.readAsDataURL(file);

    }

    private saveAlbum = function () {

        if (this.album.name.replace(" ", "") == "") {
            alert("Album must have a name");

        }
        else if(!this.album.artist) {
            alert("Album must have an artist");

        }
        else {

            // Http request example
            this.innerHttp.put('/insert', {
                model: 'Albums',
                model_data: this.album

            }).subscribe(data => {
                // Read the result field from the JSON response.
                alert(data._body);

            });
        }

    }
}

