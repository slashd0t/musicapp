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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var http_1 = require("@angular/http");
var SongEditComponent = (function () {
    function SongEditComponent(route, http) {
        var _this = this;
        this.route = route;
        this.http = http;
        this.pictureChange = function (event) {
            var _this = this;
            var inputValue = event.target;
            var file = inputValue.files[0];
            var myReader = new FileReader();
            myReader.onloadend = function (e) {
                _this.song.picture = myReader.result;
            };
            myReader.readAsDataURL(file);
        };
        // private selectAlbumItem = function (item) {
        //     this.song.album = item;
        // }
        //
        // private selectArtistItem = function (item) {
        //     this.song.artist = item;
        // }
        this.saveSong = function () {
            if (this.song.name.replace(" ", "") == "") {
                alert("Song must have a name");
            }
            else {
                this.searchParams = 'model=Artists&id=' + this.id;
                this.nonIdSong = JSON.parse(JSON.stringify(this.song));
                delete this.nonIdSong._id;
                // Http request example
                this.innerHttp.put('/update', {
                    model: 'Songs',
                    id: this.song._id,
                    model_data: this.nonIdSong
                }).subscribe(function (data) {
                    // Read the result field from the JSON response.
                    alert(data._body);
                });
            }
        };
        this.innerHttp = http;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id']; // (+) converts string 'id' to a number
            if (_this.id) {
                _this.searchParams = 'id=' + _this.id;
                // Http request example
                http.get('/getFullDetailSong', {
                    search: _this.searchParams
                }).subscribe(function (data) {
                    // Read the result field from the JSON response.
                    _this.song = JSON.parse(data._body);
                    _this.song.album = _this.song.album._id;
                    _this.song.artist = _this.song.artist._id;
                });
                http.get('/getAll', {
                    search: 'model=Artists'
                }).subscribe(function (data) {
                    // Read the result field from the JSON response.
                    _this.artistsList = JSON.parse(data._body);
                    console.log("artistsList: " + _this.artistsList);
                });
                http.get('/getAll', {
                    search: 'model=Albums'
                }).subscribe(function (data) {
                    // Read the result field from the JSON response.
                    _this.albumsList = JSON.parse(data._body);
                    console.log("albumsList: " + _this.albumsList);
                });
                http.get('/getAllGenres').subscribe(function (data) {
                    // Read the result field from the JSON response.
                    _this.genresList = JSON.parse(data._body);
                    console.log("GENRES: " + _this.genresList);
                });
            }
        });
    }
    SongEditComponent = __decorate([
        core_1.Component({
            selector: 'song-edit',
            styleUrls: ['./app/components/song/song.component.css'],
            templateUrl: './app/components/song/song-edit/song-edit.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, http_1.Http])
    ], SongEditComponent);
    return SongEditComponent;
}());
exports.SongEditComponent = SongEditComponent;
//# sourceMappingURL=song-edit.component.js.map