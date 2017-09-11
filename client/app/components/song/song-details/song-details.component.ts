import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http} from "@angular/http";
import {TruncateString} from "../../../services/itunes-search.pipe";
import {ItunesSearchService} from "../../../services/itunes-search.service";

@Component({
    selector: 'song-details',
    pipes: [TruncateString],
    providers: [
        ItunesSearchService],
    styleUrls: ['./app/components/song/song.component.css'],
    templateUrl: './app/components/song/song-details/song-details.component.html',
})
export class SongDetailsComponent{

    private id: string;
    private song: any;
    private searchParams: string;

    // FOR ITUNES
    itunesItem;
    message: String;

    constructor( private route: ActivatedRoute,
                 private http: Http,
                 private itunesService:ItunesSearchService) {

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

                    debugger;
                    let songQuery = this.song.name.split(" ").join("+");

                    this.itunesService.getResults(songQuery).then(result => {
                        // Clear previous items
                        this.itunesItem = null;
                        this.message = null;
                        if(result.results.length > 0){
                            this.itunesItem = result.results[0];
                        } else{
                            this.message = "No results for \"" + songQuery + "\"";
                        }

                    });

                })
            }
        });
    }

    // // Initiate search based on input value
    // initSearch(value){
    //     this.itunesService.getResults(value).then(result => {
    //         // Clear previous items
    //         this.items = null;
    //         this.message = null;
    //         if(result.results.length > 0){
    //             this.items = result.results;
    //         } else{
    //             this.message = "No results for \"" + value + "\"";
    //         }
    //
    //     });
    // }

}
