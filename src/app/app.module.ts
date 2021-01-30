import { VideoDetailComponent } from './video-detail/video-detail.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { YoutubeVideoPlayer, YoutubeVideoPlayerOriginal } from '@ionic-native/youtube-video-player/ngx';
import { HttpClientModule } from '@angular/common/http';
import { PlaylistComponent } from './playlist/playlist.component';
import { SafePipeModule } from 'safe-pipe';


@NgModule({
  declarations: [AppComponent, PlaylistComponent, VideoDetailComponent],
  entryComponents: [],
  imports: [BrowserModule, SafePipeModule, IonicModule.forRoot(), AppRoutingModule ,HttpClientModule,CommonModule],
  providers: [
    StatusBar,
    SplashScreen,
   { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
