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
var ArtistComponent = (function () {
    // Http request example
    function ArtistComponent(http) {
        var _this = this;
        this.delete = function (id) {
            var _this = this;
            this.http.put('/remove', { model: 'Artists', id: id }).subscribe(function (data) {
                alert(data._body);
                _this.http.get('/getAll', {
                    search: 'model=Artists'
                }).subscribe(function (data) {
                    // Read the result field from the JSON response.
                    _this.artistsList = JSON.parse(data._body);
                });
            });
        };
        this.http = http;
        http.get('/getAll', {
            search: 'model=Artists'
        }).subscribe(function (data) {
            // Read the result field from the JSON response.
            _this.artistsList = JSON.parse(data._body);
        });
    }
    ArtistComponent = __decorate([
        core_1.Component({
            selector: 'artist',
            styleUrls: ['./app/components/artist/artist.component.css'],
            templateUrl: './app/components/artist/artist.component.html'
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], ArtistComponent);
    return ArtistComponent;
}());
exports.ArtistComponent = ArtistComponent;
//# sourceMappingURL=artist.component.js.map