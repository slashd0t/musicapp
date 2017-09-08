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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var app_routes_1 = require('./app.routes');
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var app_component_1 = require('./app.component');
var navbar_component_1 = require('./components/navbar/navbar.component');
var home_component_1 = require('./components/home/home.component');
var song_component_1 = require("./components/song/song.component");
var artist_component_1 = require("./components/artist/artist.component");
var album_component_1 = require("./components/album/album.component");
var chat_component_1 = require("./components/chat/chat.component");
var about_component_1 = require('./components/about/about.component');
var item_list_component_1 = require("./components/items/item-list.component");
var song_details_component_1 = require("./components/song/song-details/song-details.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                router_1.RouterModule.forRoot(app_routes_1.rootRouterConfig, { useHash: false })
            ],
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                song_component_1.SongComponent,
                song_details_component_1.SongDetailsComponent,
                artist_component_1.ArtistComponent,
                album_component_1.AlbumComponent,
                chat_component_1.ChatComponent,
                about_component_1.AboutComponent,
                navbar_component_1.NavbarComponent,
                item_list_component_1.ListItemComponent
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map