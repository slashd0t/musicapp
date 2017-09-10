import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from "@angular/http";
import { timeInterval } from "rxjs/operator/timeInterval";
import { Observable } from 'rxjs/Rx';
// declare var $:JQueryStatic;

@Component({
    selector: 'album-details',
    styleUrls: ['./app/components/album/album-details/album-details.component.css'],
    templateUrl: './app/components/album/album-details/album-details.component.html'
})
export class AlbumDetailsComponent {

    @ViewChild('myCanvas') canvasRef: ElementRef;
    private canvas: any;
    private id: string;
    private album: any;
    private searchParams: string;

    constructor(private route: ActivatedRoute,
        private http: Http,
        private elRef: ElementRef) {

        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; // (+) converts string 'id' to a number

            if (this.id) {

                this.searchParams = 'id=' + this.id;
                // Http request example
                http.get('/getAlbumWithSongs', {
                    search: this.searchParams
                }).subscribe(data => {
                    // Read the result field from the JSON response.
                    this.album = JSON.parse(data._body);


                    this.searchParams = 'model=Artists&id=' + this.album.artist;

                    http.get('/getById', {
                        search: this.searchParams
                    }).subscribe(data => {

                        this.album.artistName = JSON.parse(data._body)[0].name;

                        this.InitCnavas();
                    });
                }

            }
        });
    }

    changeImageFunc(tick) {
        let ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext("2d");
        let canvas = this.canvasRef.nativeElement;
        var image = new Image();
        image.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0);
        };
        image.src = this.album.songs[(tick % this.album.songs.length)].picture;
    }

    private InitCnavas = function () {
        let timer = Observable.timer(0, 5000);
        timer.subscribe(t => {
            this.changeImageFunc(t);
        });
    }
}