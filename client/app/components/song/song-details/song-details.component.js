"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var itunes_search_pipe_1 = require("../../../services/itunes-search.pipe");
var itunes_search_service_1 = require("../../../services/itunes-search.service");
var SongDetailsComponent = (function () {
    function SongDetailsComponent(route, http, itunesService) {
        var _this = this;
        this.route = route;
        this.http = http;
        this.itunesService = itunesService;
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
                    _this.increaseView();
                    debugger;
                    var songQuery = _this.song.name.split(" ").join("+");
                    _this.itunesService.getResults(songQuery).then(function (result) {
                        // Clear previous items
                        _this.itunesItem = null;
                        _this.message = null;
                        if (result.results.length > 0) {
                            _this.itunesItem = result.results[0];
                        }
                        else {
                            _this.message = "No results for \"" + songQuery + "\"";
                        }
                    });
                });
            }
        });
    }
    SongDetailsComponent.prototype.increaseView = function () {
        this.http.put('/update', {
            model: 'Songs',
            id: this.song._id,
            model_data: __assign({}, this.song, { views: this.song.views + 1 })
        }).subscribe(function (data) {
            // Read the result field from the JSON response.
            alert(data._body);
        });
    };
    SongDetailsComponent = __decorate([
        core_1.Component({
            selector: 'song-details',
            pipes: [itunes_search_pipe_1.TruncateString],
            providers: [
                itunes_search_service_1.ItunesSearchService
            ],
            styleUrls: ['./app/components/song/song.component.css'],
            templateUrl: './app/components/song/song-details/song-details.component.html',
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            http_1.Http,
            itunes_search_service_1.ItunesSearchService])
    ], SongDetailsComponent);
    return SongDetailsComponent;
}());
exports.SongDetailsComponent = SongDetailsComponent;
//# sourceMappingURL=song-details.component.js.map