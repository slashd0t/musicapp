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
var SongComponent = (function () {
    // Http request example
    function SongComponent(http) {
        var _this = this;
        this.searchFilters = ["", "", ""];
        http.get('/getAll', {
            search: 'model=Songs'
        }).subscribe(function (data) {
            // Read the result field from the JSON response.
            _this.SongsList = eval(data._body);
        });
        http.get('/getAll', {
            search: 'model=Artists'
        }).subscribe(function (data) {
            // Read the result field from the JSON response.
            _this.ArtistsList = eval(data._body);
        });
        http.get('/getAll', {
            search: 'model=Albums'
        }).subscribe(function (data) {
            // Read the result field from the JSON response.
            _this.AlbumsList = eval(data._body);
        });
        http.get('/getAllGenres').subscribe(function (data) {
            // Read the result field from the JSON response.
            _this.GenreList = eval(data._body);
        });
        this.http = http;
    }
<<<<<<< HEAD
    SongComponent.prototype.setFilter = function (value, pos) {
        this.searchFilters[pos] = value;
        if (pos == 0) {
            for (var i = 0; i < this.ArtistsList.length; i++) {
                if (this.ArtistsList[i]._id = value) {
                    this.FilteredArtist = this.ArtistsList[i];
                }
            }
        }
        else if (pos == 1) {
            for (var i = 0; i < this.AlbumsList.length; i++) {
                if (this.AlbumsList[i]._id = value) {
                    this.FilteredAlbum = this.AlbumsList[i];
                }
            }
        }
        this.getRelaventSongs(this.http);
    };
    SongComponent.prototype.resetFilters = function () {
        this.searchFilters = ["", "", ""];
        this.getRelaventSongs(this.http);
    };
    SongComponent.prototype.getRelaventSongs = function (http) {
        var _this = this;
        var searchQuery = "";
        if (this.searchFilters[0] == "" && this.searchFilters[1] == "" && this.searchFilters[2] == "") {
            http.get('/getAll', {
                search: 'model=Songs'
            }).subscribe(function (data) {
                // Read the result field from the JSON response.
                _this.SongsList = eval(data._body);
            });
        }
        else {
            if (this.searchFilters[0] != "") {
                if (searchQuery == "") {
                    searchQuery = searchQuery + 'artist=' + this.searchFilters[0];
                }
                else {
                    searchQuery = searchQuery + '&artist=' + this.searchFilters[0];
                }
            }
            if (this.searchFilters[1] != "") {
                if (searchQuery == "") {
                    searchQuery = searchQuery + 'album=' + this.searchFilters[1];
                }
                else {
                    searchQuery = searchQuery + '&album=' + this.searchFilters[1];
                }
            }
            if (this.searchFilters[2] != "") {
                if (searchQuery == "") {
                    searchQuery = searchQuery + 'genre=' + this.searchFilters[2];
                }
                else {
                    searchQuery = searchQuery + '&genre=' + this.searchFilters[2];
                }
            }
            http.get('/getSongs', {
                search: searchQuery
            }).subscribe(function (data) {
                // Read the result field from the JSON response.
                _this.SongsList = eval(data._body);
            });
        }
    };
=======
    SongComponent = __decorate([
        core_1.Component({
            selector: 'song',
            styleUrls: ['./app/components/song/song.component.css'],
            templateUrl: './app/components/song/song.component.html'
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], SongComponent);
>>>>>>> f80bbc2938134bdefecb98908e2f96d9b54509f8
    return SongComponent;
}());
SongComponent = __decorate([
    core_1.Component({
        selector: 'song',
        styleUrls: ['./app/components/song/song.component.css'],
        templateUrl: './app/components/song/song.component.html'
    }),
    __metadata("design:paramtypes", [http_1.Http])
], SongComponent);
exports.SongComponent = SongComponent;
//# sourceMappingURL=song.component.js.map