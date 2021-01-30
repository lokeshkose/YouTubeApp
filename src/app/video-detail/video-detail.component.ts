import { Component, OnInit, Sanitizer } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { LoadingController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiServicesService } from '../api-services.service';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss'],
})
export class VideoDetailComponent implements OnInit {
  playListItem: any;
  id;
  url;

  constructor(
    private routes: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private apiService: ApiServicesService
  ) {}

  ngOnInit() {
    this.getPlaylistItem();
  }

  async getPlaylistItem() {
    const loader = await this.loadingCtrl.create({
      message: 'Fetching Data....',
    });
    loader.present();
    try {
      const accessToken = localStorage.getItem('access_token');
      const data: any = this.routes.snapshot.queryParamMap.get('id');
      this.apiService.getPlaylistItem(data)
        .subscribe((res) => {
          loader.dismiss();
          // tslint:disable-next-line: no-shadowed-variable
          const data: any = res;
          console.log(data);
          this.playListItem = data.items;
        });
    } catch (error) {
      console.error(error);
    }
  }

  getUrl(videoId) {
    this.url = 'https://www.youtube.com/embed/' + videoId;
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      infiniteScroll.target.complete();
    }, 500);
  }
}
