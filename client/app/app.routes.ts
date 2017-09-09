import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SongComponent } from './components/song/song.component';
import { ArtistComponent } from './components/artist/artist.component';
import { AlbumComponent } from './components/album/album.component';
import { AboutComponent } from './components/about/about.component';
import {ChatComponent} from "./components/chat/chat.component";
import {SongDetailsComponent} from "./components/song/song-details/song-details.component";
import {StatisticsComponent} from "./components/statistics/statistics.component";

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'song', component: SongComponent },
    { path: 'song-details/:id', component: SongDetailsComponent }
    { path: 'artist', component: ArtistComponent },
    { path: 'album', component: AlbumComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'statistics', component: StatisticsComponent },
    { path: 'about', component: AboutComponent }
];