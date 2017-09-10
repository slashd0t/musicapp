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
var AlbumCreateComponent = (function () {
    function AlbumCreateComponent(http) {
        var _this = this;
        this.http = http;
        this.pictureChange = function (event) {
            var _this = this;
            var inputValue = event.target;
            var file = inputValue.files[0];
            var myReader = new FileReader();
            myReader.onloadend = function (e) {
                _this.album.picture = myReader.result;
            };
            myReader.readAsDataURL(file);
        };
        this.saveAlbum = function () {
            if (this.album.name.replace(" ", "") == "") {
                alert("Album must have a name");
            }
            else if (!this.album.artist) {
                alert("Album must have an artist");
            }
            else {
                // Http request example
                this.innerHttp.put('/insert', {
                    model: 'Albums',
                    model_data: this.album
                }).subscribe(function (data) {
                    // Read the result field from the JSON response.
                    alert(data._body);
                });
            }
        };
        this.album = {
            name: " ",
            artist: null,
            date: " ",
            picture: "",
            views: 0
        };
        this.innerHttp = http;
        http.get('/getAll', {
            search: 'model=Artists'
        }).subscribe(function (data) {
            // Read the result field from the JSON response.
            _this.artistsList = JSON.parse(data._body);
            _this.album.artist = _this.artistsList[0]._id,
                console.log("artistsList: " + _this.artistsList);
        });
    }
    return AlbumCreateComponent;
}());
AlbumCreateComponent = __decorate([
    core_1.Component({
        selector: 'album-create',
        styleUrls: ['./app/components/album/album.component.css'],
        templateUrl: './app/components/album/album-create/album-create.component.html'
    }),
    __metadata("design:paramtypes", [http_1.Http])
], AlbumCreateComponent);
exports.AlbumCreateComponent = AlbumCreateComponent;
//# sourceMappingURL=album-create.component.js.map