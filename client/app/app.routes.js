"use strict";
var home_component_1 = require('./components/home/home.component');
var song_component_1 = require('./components/song/song.component');
var artist_component_1 = require('./components/artist/artist.component');
var album_component_1 = require('./components/album/album.component');
var about_component_1 = require('./components/about/about.component');
var chat_component_1 = require("./components/chat/chat.component");
var song_details_component_1 = require("./components/song/song-details/song-details.component");
var artist_details_component_1 = require("./components/artist/artist-details/artist-details.component");
var album_details_component_1 = require("./components/album/album-details/album-details.component");
var statistics_component_1 = require("./components/statistics/statistics.component");
var song_edit_component_1 = require("./components/song/song-edit/song-edit.component");
var song_create_component_1 = require("./components/song/song-create/song-create.component");
exports.rootRouterConfig = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'song', component: song_component_1.SongComponent },
    { path: 'song-details/:id', component: song_details_component_1.SongDetailsComponent },
    { path: 'song-edit/:id', component: song_edit_component_1.SongEditComponent },
    { path: 'song-create', component: song_create_component_1.SongCreateComponent },
    { path: 'artist-details/:id', component: artist_details_component_1.ArtistDetailsComponent },
    { path: 'album-details/:id', component: album_details_component_1.AlbumDetailsComponent },
    { path: 'artist', component: artist_component_1.ArtistComponent },
    { path: 'album', component: album_component_1.AlbumComponent },
    { path: 'chat', component: chat_component_1.ChatComponent },
    { path: 'statistics', component: statistics_component_1.StatisticsComponent },
    { path: 'about', component: about_component_1.AboutComponent }
];
//# sourceMappingURL=app.routes.js.map