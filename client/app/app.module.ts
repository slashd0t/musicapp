import { NgModule }      from '@angular/core';
import { JSONP_PROVIDERS } from '@angular/http';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule, JsonpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import { FacebookModule } from 'ngx-facebook';
import {AppComponent} from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import {SongComponent} from "./components/song/song.component";
import {ArtistComponent} from "./components/artist/artist.component";
import {AlbumComponent} from "./components/album/album.component";
import {ChatComponent} from "./components/chat/chat.component";
import {AboutComponent } from './components/about/about.component';
import {SongDetailsComponent} from "./components/song/song-details/song-details.component";
import {StatisticsComponent} from "./components/statistics/statistics.component";
import {ArtistDetailsComponent} from "./components/artist/artist-details/artist-details.component";
import {AlbumDetailsComponent} from "./components/album/album-details/album-details.component";
import {SongEditComponent} from "./components/song/song-edit/song-edit.component";
import {SongCreateComponent} from "./components/song/song-create/song-create.component";
import {AlbumCreateComponent} from "./components/album/album-create/album-create.component";
import {AlbumEditComponent} from "./components/album/album-edit/album-edit.component";
import {ArtistCreateComponent} from "./components/artist/artist-create/artist-create.component";
import {ArtistEditComponent} from "./components/artist/artist-edit/artist-edit.component";
import {ItunesSearchService} from "./services/itunes-search.service";
import {TruncateString} from "./services/itunes-search.pipe";

@NgModule({
  imports:      [
      BrowserModule,
      HttpModule,
      FormsModule,
      JsonpModule,
      RouterModule.forRoot(rootRouterConfig, { useHash: false }),
      FacebookModule.forRoot()
  ],
  declarations: [
      AppComponent,
      HomeComponent,
      SongComponent,
      SongDetailsComponent,
      SongCreateComponent,
      SongEditComponent,
      ArtistComponent,
      ArtistDetailsComponent,
      ArtistCreateComponent,
      ArtistEditComponent,
      AlbumComponent,
      AlbumDetailsComponent,
      AlbumEditComponent,
      AlbumCreateComponent,
      ChatComponent,
      StatisticsComponent,
      AboutComponent,
      NavbarComponent,
      TruncateString
  ],
  providers: [
      ItunesSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
