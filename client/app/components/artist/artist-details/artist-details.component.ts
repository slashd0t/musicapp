import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http} from "@angular/http";

@Component({
    selector: 'artist-details',
    styleUrls: ['./app/components/artist/artist-details/artist-details.component.css'],
    templateUrl: './app/components/artist/artist-details/artist-details.component.html'
})
export class ArtistDetailsComponent implements OnInit, OnDestroy{

    private id: string;
    private artist: any;
    // private song: {
    //     name : " ",
    //     artist : 0,
    //     album : 0,
    //     date :  " ",
    //     picture : "",
    //     genre : " ",
    //     views : 0
    // };
    private searchParams: string;

    constructor( private route: ActivatedRoute,
                 private http: Http) {

        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number


            if (this.id) {

                this.searchParams = 'model=Artists&id=' + this.id;
                // Http request example
                http.get('/getById', {
                    search: this.searchParams
                    //model: 'Songs',
                    // n: 10
                }).subscribe(data => {
                    // Read the result field from the JSON response.
                    this.artist = eval(data._body)[0];

                });
            }
        });
    }



}
