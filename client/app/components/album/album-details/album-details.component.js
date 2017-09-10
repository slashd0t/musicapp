"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
// declare var $:JQueryStatic;
var AlbumDetailsComponent = (function () {
    function AlbumDetailsComponent(route, http, elRef) {
        var _this = this;
        this.route = route;
        this.http = http;
        this.elRef = elRef;
        this.InitCnavas = function () {
            var _this = this;
            var timer = Rx_1.Observable.timer(0, 5000);
            timer.subscribe(function (t) {
                _this.changeImageFunc(t);
            });
        };
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id']; // (+) converts string 'id' to a number
            if (_this.id) {
                _this.searchParams = 'id=' + _this.id;
                // Http request example
                http.get('/getAlbumWithSongs', {
                    search: _this.searchParams
                }).subscribe(function (data) {
                    // Read the result field from the JSON response.
                    _this.album = JSON.parse(data._body);
                    _this.searchParams = 'model=Artists&id=' + _this.album.artist;
                    http.get('/getById', {
                        search: _this.searchParams
                    }).subscribe(function (data) {
                        _this.album.artistName = JSON.parse(data._body)[0].name;
                        _this.InitCnavas();
                    });
                });
            }
        });
    }
    AlbumDetailsComponent.prototype.changeImageFunc = function (tick) {
        var ctx = this.canvasRef.nativeElement.getContext("2d");
        var canvas = this.canvasRef.nativeElement;
        var image = new Image();
        image.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0);
        };
        image.src = this.album.songs[(tick % this.album.songs.length)].picture;
    };
    __decorate([
        core_1.ViewChild('myCanvas'),
        __metadata("design:type", core_1.ElementRef)
    ], AlbumDetailsComponent.prototype, "canvasRef", void 0);
    AlbumDetailsComponent = __decorate([
        core_1.Component({
            selector: 'album-details',
            styleUrls: ['./app/components/album/album-details/album-details.component.css'],
            templateUrl: './app/components/album/album-details/album-details.component.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            http_1.Http,
            core_1.ElementRef])
    ], AlbumDetailsComponent);
    return AlbumDetailsComponent;
}());
exports.AlbumDetailsComponent = AlbumDetailsComponent;
//# sourceMappingURL=album-details.component.js.map