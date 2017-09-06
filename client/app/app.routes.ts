import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SongComponent } from './components/song/song.component';
import { ArtistComponent } from './components/artist/artist.component';
import { AlbumComponent } from './components/album/album.component';
import { AboutComponent } from './components/about/about.component';

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'song', component: SongComponent },
    { path: 'artist', component: ArtistComponent },
    { path: 'album', component: AlbumComponent },
    { path: 'about', component: AboutComponent }
];