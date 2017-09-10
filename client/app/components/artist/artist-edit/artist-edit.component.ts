import {Component, NgModule} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Http} from "@angular/http";
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'artist-edit',
    styleUrls: ['./app/components/artist/artist.component.css'],
    templateUrl: './app/components/artist/artist-edit/artist-edit.component.html'
})
export class ArtistEditComponent {
    private id: string;
    private artist: any;
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

                this.searchParams = 'model=Artists&id=' + this.id;
                // Http request example
                http.get('/getById', {
                    search: this.searchParams
                }).subscribe(data => {
                    // Read the result field from the JSON response.
                    this.artist = JSON.parse(data._body)[0];

                });
            }
        });
    }

    private pictureChange = function (event) {
        var inputValue = event.target

        var file:File = inputValue.files[0];
        var myReader:FileReader = new FileReader();

        myReader.onloadend = (e) => {
            this.artist.picture = myReader.result;
        }
        myReader.readAsDataURL(file);

    }

    private saveArtist = function () {

        if (this.artist.name.replace(" ", "") == "") {
            alert("Artist must have a name");
        }
        else {

            this.nonIdArtist =  JSON.parse(JSON.stringify(this.artist));

            delete this.nonIdArtist._id;

            // Http request example
            this.innerHttp.put('/update', {
                model: 'Artists',
                id: this.artist._id,
                model_data: this.nonIdArtist

            }).subscribe(data => {
                // Read the result field from the JSON response.
                alert(data._body);

            });
        }

    }
}

