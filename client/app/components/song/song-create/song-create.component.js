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
var http_1 = require("@angular/http");
var SongCreateComponent = (function () {
    function SongCreateComponent(http) {
        var _this = this;
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
        this.saveSong = function () {
            if (this.song.name.replace(" ", "") == "") {
                alert("Song must have a name");
            }
            else {
                debugger;
                this.song.artist = this.song.artist._id;
                // Http request example
                this.innerHttp.put('/insert', {
                    model: 'Songs',
                    model_data: this.song
                }).subscribe(function (data) {
                    // Read the result field from the JSON response.
                    alert(data._body);
                });
            }
        };
        this.innerHttp = http;
        this.song = {
            name: " ",
            artist: 0,
            album: 0,
            date: " ",
            picture: "",
            genre: " ",
            views: 0
        };
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
    return SongCreateComponent;
}());
SongCreateComponent = __decorate([
    core_1.Component({
        selector: 'song-create',
        styleUrls: ['./app/components/song/song.component.css'],
        templateUrl: './app/components/song/song-create/song-create.component.html'
    }),
    __metadata("design:paramtypes", [http_1.Http])
], SongCreateComponent);
exports.SongCreateComponent = SongCreateComponent;
//# sourceMappingURL=song-create.component.js.map