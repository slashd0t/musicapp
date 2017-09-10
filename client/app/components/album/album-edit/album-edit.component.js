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
var AlbumEditComponent = (function () {
    function AlbumEditComponent(route, http) {
        var _this = this;
        this.route = route;
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
            else {
                this.nonIdAlbum = JSON.parse(JSON.stringify(this.album));
                delete this.nonIdAlbum._id;
                // Http request example
                this.innerHttp.put('/update', {
                    model: 'Albums',
                    id: this.album._id,
                    model_data: this.nonIdAlbum
                }).subscribe(function (data) {
                    // Read the result field from the JSON response.
                    alert(data._body);
                });
            }
        };
        this.innerHttp = http;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            if (_this.id) {
                _this.searchParams = 'model=Albums&id=' + _this.id;
                // Http request example
                http.get('/getById', {
                    search: _this.searchParams
                }).subscribe(function (data) {
                    // Read the result field from the JSON response.
                    _this.album = JSON.parse(data._body)[0];
                });
                http.get('/getAll', {
                    search: 'model=Artists'
                }).subscribe(function (data) {
                    // Read the result field from the JSON response.
                    _this.artistsList = JSON.parse(data._body);
                    console.log("artistsList: " + _this.artistsList);
                });
            }
        });
    }
    AlbumEditComponent = __decorate([
        core_1.Component({
            selector: 'album-edit',
            styleUrls: ['./app/components/album/album.component.css'],
            templateUrl: './app/components/album/album-edit/album-edit.component.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            http_1.Http])
    ], AlbumEditComponent);
    return AlbumEditComponent;
}());
exports.AlbumEditComponent = AlbumEditComponent;
//# sourceMappingURL=album-edit.component.js.map