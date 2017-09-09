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
var HomeComponent = /** @class */ (function () {
    // // Http request example
    // constructor(http: Http) {
    //   http.put('/update', {
    //     model: 'Songs',
    //     _id: "59a59766d0b5050aa8a72038",
    //     model_data: {
    //       name: "try3",
    //     }
    //   }).subscribe(data => {
    //     // Read the result field from the JSON response.
    //     console.log(data);
    //   });
    // }
    //let params: URLSearchParams = new URLSearchParams();
    // params.set('model', 'Songs');
    //params.set('n', 10);
    // Http request example
    function HomeComponent(http) {
        this.MostViewedSongs = [];
        http.get('/getNMostViewed', {
            search: 'model=Songs&n=10'
            //model: 'Songs',
            // n: 10
        }).subscribe(function (data) {
            // Read the result field from the JSON response.
            console.log(data.json());
        });
    }
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            styleUrls: ['./app/components/home/home.component.css'],
            templateUrl: './app/components/home/home.component.html'
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map