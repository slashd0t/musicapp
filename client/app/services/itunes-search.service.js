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
require("rxjs/Rx");
var ItunesSearchService = (function () {
    function ItunesSearchService(jsonp) {
        this.jsonp = jsonp;
    }
    // Itnues search, country = us, media = software, limit = 10
    ItunesSearchService.prototype.getResults = function (searchTerm) {
        // Construct the itunes search url with callback
        var url = "https://itunes.apple.com/search?term=" + searchTerm + "&entity=musicTrack&callback=JSONP_CALLBACK";
        // "https://itunes.apple.com/search?term=" + searchTerm + "&country=us&media=software&limit=10&callback=JSONP_CALLBACK";
        return this.jsonp.request(url).map(function (res) {
            return res.json();
        }).toPromise();
    };
    // log error to console
    ItunesSearchService.prototype.logError = function (error) {
        console.log("Something went wrong" + error);
    };
    return ItunesSearchService;
}());
ItunesSearchService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Jsonp])
], ItunesSearchService);
exports.ItunesSearchService = ItunesSearchService;
//# sourceMappingURL=itunes-search.service.js.map