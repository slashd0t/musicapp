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
var ngx_facebook_1 = require("ngx-facebook");
var d3 = require("d3-selection");
var d3Scale = require("d3-scale");
var d3Array = require("d3-array");
var d3Axis = require("d3-axis");
var AboutComponent = (function () {
    function AboutComponent(http, fb, container) {
        this.http = http;
        this.fb = fb;
        this.container = container;
        this.STATISTICS = [];
        this.margin = { top: 20, right: 20, bottom: 30, left: 40 };
        fb.init({
            appId: '167814953770444',
            xfbml: true,
            version: 'v2.10'
        });
    }
    AboutComponent.prototype.share = function (url) {
        var params = {
            method: 'share'
        };
        this.fb.ui(params)
            .then(function (res) { return console.log(res); })
            .catch(function (e) { return console.error(e); });
    };
    AboutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get('/getNMostViewed', {
            search: 'model=Songs&n=5'
        }).subscribe(function (data) {
            // Read the result field from the JSON response.
            _this.STATISTICS = data.json();
            _this.initSvg();
            _this.initAxis();
            _this.drawAxis();
            _this.drawBars();
        });
    };
    AboutComponent.prototype.initSvg = function () {
        this.svg = d3.select(this.container.nativeElement).select("svg");
        this.width = +this.svg.attr("width") - this.margin.left - this.margin.right;
        this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom;
        this.g = this.svg.append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
    };
    AboutComponent.prototype.initAxis = function () {
        this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
        this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
        this.x.domain(this.STATISTICS.map(function (d) { return d.name; }));
        this.y.domain([0, d3Array.max(this.STATISTICS, function (d) { return d.views; })]);
    };
    AboutComponent.prototype.drawAxis = function () {
        this.g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3Axis.axisBottom(this.x));
        this.g.append("g")
            .attr("class", "axis axis--y")
            .call(d3Axis.axisLeft(this.y))
            .append("text")
            .attr("class", "axis-title")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("views");
    };
    AboutComponent.prototype.drawBars = function () {
        var _this = this;
        this.g.selectAll(".bar")
            .data(this.STATISTICS)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return _this.x(d.name); })
            .attr("y", function (d) { return _this.y(d.views); })
            .attr("width", this.x.bandwidth())
            .attr("height", function (d) { return _this.height - _this.y(d.views); });
    };
    AboutComponent = __decorate([
        core_1.Component({
            selector: 'about',
            styleUrls: ['./app/components/about/about.component.css'],
            templateUrl: './app/components/about/about.component.html'
        }),
        __metadata("design:paramtypes", [http_1.Http, ngx_facebook_1.FacebookService, core_1.ElementRef])
    ], AboutComponent);
    return AboutComponent;
}());
exports.AboutComponent = AboutComponent;
//# sourceMappingURL=about.component.js.map