import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SongComponent } from './components/song/song.component';
import { ArtistComponent } from './components/artist/artist.component';
import { AlbumComponent } from './components/album/album.component';
import { AboutComponent } from './components/about/about.component';
import {ChatComponent} from "./components/chat/chat.component";
import {SongDetailsComponent} from "./components/song/song-details/song-details.component";
import {ArtistDetailsComponent} from "./components/artist/artist-details/artist-details.component";
import {AlbumDetailsComponent} from "./components/album/album-details/album-details.component";
import {StatisticsComponent} from "./components/statistics/statistics.component";
import {SongEditComponent} from "./components/song/song-edit/song-edit.component";
import {SongCreateComponent} from "./components/song/song-create/song-create.component";
import {ArtistEditComponent} from "./components/artist/artist-edit/artist-edit.component";
import {AlbumEditComponent} from "./components/album/album-edit/album-edit.component";
import {ArtistCreateComponent} from "./components/artist/artist-create/artist-create.component";
import {AlbumCreateComponent} from "./components/album/album-create/album-create.component";

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'song', component: SongComponent },
    { path: 'song-details/:id', component: SongDetailsComponent },
    { path: 'song-edit/:id', component: SongEditComponent },
    { path: 'song-create', component: SongCreateComponent },
    { path: 'album', component: AlbumComponent },
    { path: 'album-details/:id', component: AlbumDetailsComponent },
    { path: 'album-edit/:id', component: AlbumEditComponent },
    { path: 'album-create', component: AlbumCreateComponent },
    { path: 'artist', component: ArtistComponent },
    { path: 'artist-details/:id', component: ArtistDetailsComponent },
    { path: 'artist-edit/:id', component: ArtistEditComponent },
    { path: 'artist-create', component: ArtistCreateComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'statistics', component: StatisticsComponent },
    { path: 'about', component: AboutComponent }
];