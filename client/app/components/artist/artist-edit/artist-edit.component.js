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
var ArtistEditComponent = (function () {
    function ArtistEditComponent(route, http) {
        var _this = this;
        this.route = route;
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
            else {
                this.nonIdArtist = JSON.parse(JSON.stringify(this.artist));
                delete this.nonIdArtist._id;
                // Http request example
                this.innerHttp.put('/update', {
                    model: 'Artists',
                    id: this.artist._id,
                    model_data: this.nonIdArtist
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
                _this.searchParams = 'model=Artists&id=' + _this.id;
                // Http request example
                http.get('/getById', {
                    search: _this.searchParams
                }).subscribe(function (data) {
                    // Read the result field from the JSON response.
                    _this.artist = JSON.parse(data._body)[0];
                });
            }
        });
    }
    ArtistEditComponent = __decorate([
        core_1.Component({
            selector: 'artist-edit',
            styleUrls: ['./app/components/artist/artist.component.css'],
            templateUrl: './app/components/artist/artist-edit/artist-edit.component.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            http_1.Http])
    ], ArtistEditComponent);
    return ArtistEditComponent;
}());
exports.ArtistEditComponent = ArtistEditComponent;
//# sourceMappingURL=artist-edit.component.js.map