import {Component, NgModule} from '@angular/core';
import {Http} from "@angular/http";
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'artist-create',
    styleUrls: ['./app/components/artist/artist.component.css'],
    templateUrl: './app/components/artist/artist-create/artist-create.component.html'
})
export class ArtistCreateComponent {
    private id: string;
    private artist: any;
    private innerHttp: any;
    private artistsList: any;
    private albumsList: any;
    private genresList: any;
    private searchParams: string;

    constructor(private http: Http) {

        this.artist = {
            name : " ",
            date :  " ",
            picture : "",
            biography : "",
            views : 0
        };

        this.innerHttp = http;

    }

    private pictureChange = function (event) {
        var inputValue = event.target

        var file: File = inputValue.files[0];
        var myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
            this.artist.picture = myReader.result;
        }
        myReader.readAsDataURL(file);

    }

    private saveArtist = function () {

        if (this.artist.name.replace(" ", "") == "") {
            alert("Artist must have a name");

        }
        else if (this.artist.biography.replace(" ", "") == ""){
            alert("Artist must have a biography");

        }
        else {

            // Http request example
            this.innerHttp.put('/insert', {
                model: 'Artists',
                model_data: this.artist

            }).subscribe(data => {
                // Read the result field from the JSON response.
                alert(data._body);

            });
        }

    }
}

