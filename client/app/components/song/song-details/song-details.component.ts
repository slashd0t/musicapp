import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http} from "@angular/http";

@Component({
    selector: 'song-details',
    styleUrls: ['./app/components/song/song-details/song-details.component.css'],
    templateUrl: './app/components/song/song-details/song-details.component.html',
})
export class SongDetailsComponent{

    private id: string;
    private song: any;
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

    // constructor( private route: ActivatedRoute,
    //              private http: Http) {

    //     this.sub = this.route.params.subscribe(params => {
    //         this.id = params['id']; // (+) converts string 'id' to a number


    //         if (this.id) {

    //             this.searchParams = 'model=Songs&id=' + this.id;
    //             // Http request example
    //             http.get('/getById', {
    //                 search: this.searchParams
    //                 //model: 'Songs',
    //                 // n: 10
    //             }).subscribe(data => {
    //                 // Read the result field from the JSON response.
    //                 // this.song = eval(data._body);
    //                 console.log(data.json());
    //             })
    //         }
    //     });
    // }

}

