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
var ArtistCreateComponent = (function () {
    function ArtistCreateComponent(http) {
        this.http = http;
        this.pictureChange = function (event) {
            var _this = this;
            var inputValue = event.target;
            var file = inputValue.files[0];
            var myReader = new FileReader();
            myReader.onloadend = function (e) {
                _this.artist.picture = myReader.result;
            };
            myReader.readAsDataURL(file);
        };
        this.saveArtist = function () {
            if (this.artist.name.replace(" ", "") == "") {
                alert("Artist must have a name");
            }
            else if (this.artist.biography.replace(" ", "") == "") {
                alert("Artist must have a biography");
            }
            else {
                // Http request example
                this.innerHttp.put('/insert', {
                    model: 'Artists',
                    model_data: this.artist
                }).subscribe(function (data) {
                    // Read the result field from the JSON response.
                    alert(data._body);
                });
            }
        };
        this.artist = {
            name: " ",
            date: " ",
            picture: "",
            biography: "",
            views: 0
        };
        this.innerHttp = http;
    }
    return ArtistCreateComponent;
}());
ArtistCreateComponent = __decorate([
    core_1.Component({
        selector: 'artist-create',
        styleUrls: ['./app/components/artist/artist.component.css'],
        templateUrl: './app/components/artist/artist-create/artist-create.component.html'
    }),
    __metadata("design:paramtypes", [http_1.Http])
], ArtistCreateComponent);
exports.ArtistCreateComponent = ArtistCreateComponent;
//# sourceMappingURL=artist-create.component.js.map