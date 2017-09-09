"use strict";
var home_component_1 = require('./components/home/home.component');
var song_component_1 = require('./components/song/song.component');
var artist_component_1 = require('./components/artist/artist.component');
var album_component_1 = require('./components/album/album.component');
var about_component_1 = require('./components/about/about.component');
var chat_component_1 = require("./components/chat/chat.component");
var song_details_component_1 = require("./components/song/song-details/song-details.component");
var statistics_component_1 = require("./components/statistics/statistics.component");
exports.rootRouterConfig = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'song', component: song_component_1.SongComponent },
    { path: 'song-details/:id', component: song_details_component_1.SongDetailsComponent },
    { path: 'artist', component: artist_component_1.ArtistComponent },
    { path: 'album', component: album_component_1.AlbumComponent },
    { path: 'chat', component: chat_component_1.ChatComponent },
    { path: 'statistics', component: statistics_component_1.StatisticsComponent },
    { path: 'about', component: about_component_1.AboutComponent }
];
//# sourceMappingURL=app.routes.js.map