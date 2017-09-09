import { NgModule }      from '@angular/core';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import {SongComponent} from "./components/song/song.component";
import {ArtistComponent} from "./components/artist/artist.component";
import {AlbumComponent} from "./components/album/album.component";
import {ChatComponent} from "./components/chat/chat.component";
import {AboutComponent } from './components/about/about.component';
import {ListItemComponent} from "./components/items/item-list.component";
import {SongDetailsComponent} from "./components/song/song-details/song-details.component";
import {StatisticsComponent} from "./components/statistics/statistics.component";
import {ArtistDetailsComponent} from "./components/artist/artist-details/artist-details.component";
import {AlbumDetailsComponent} from "./components/album/album-details/album-details.component";
import {SongEditComponent} from "./components/song/song-edit/song-edit.component";

@NgModule({
  imports:      [
      BrowserModule,
      HttpModule,
      FormsModule,
      RouterModule.forRoot(rootRouterConfig, { useHash: false }),
  ],
  declarations: [
      AppComponent,
      HomeComponent,
      SongComponent,
      SongDetailsComponent,
      SongEditComponent,
      ArtistComponent,
      ArtistDetailsComponent,
      AlbumComponent,
      AlbumDetailsComponent,
      ChatComponent,
      StatisticsComponent,
      AboutComponent,
      NavbarComponent,
      ListItemComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
