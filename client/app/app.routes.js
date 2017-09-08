"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var home_component_1 = require("./components/home/home.component");
var song_component_1 = require("./components/song/song.component");
var artist_component_1 = require("./components/artist/artist.component");
var album_component_1 = require("./components/album/album.component");
var about_component_1 = require("./components/about/about.component");
var chat_component_1 = require("./components/chat/chat.component");
exports.rootRouterConfig = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'song', component: song_component_1.SongComponent },
    { path: 'artist', component: artist_component_1.ArtistComponent },
    { path: 'album', component: album_component_1.AlbumComponent },
    { path: 'chat', component: chat_component_1.ChatComponent },
    { path: 'about', component: about_component_1.AboutComponent }
];
//# sourceMappingURL=app.routes.js.map