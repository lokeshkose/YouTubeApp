import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus';
import { ApiServicesService } from '../api-services.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  playlist: any = [];
  channelId: string;
  img: any;
  loaderDownloading: any;


  constructor(private http: HttpClient,
              private router: Router,
              private routes: ActivatedRoute,
              private apiService: ApiServicesService,
              private loaddingCtrl: LoadingController) { }

  ngOnInit() {
    this.getChannelId();
  }

  getChannelId() {
    this.apiService.getChannelId().subscribe(res => {
      const data: any = res;
      this.channelId = data.items[0].id;
      if (this.channelId){
        this.getPlaylist();
      }
    });
  }

  async getPlaylist() {
    const loader = await this.loaddingCtrl.create({
      message: 'Fetching data...',
    });
    loader.present();
    try {
      this.apiService.getPlaylist(this.channelId).subscribe(res => {
        loader.dismiss();
        const resData: any = res;
        this.playlist = resData.items;
      });
    } catch (error) {
      console.log(error);
      loader.dismiss();

    }
  }

  logout() {
    GooglePlus.logout()
      .then(res => {
        console.log(res);
        // user logged out so we will remove him from the NativeStorage
        localStorage.removeItem('access_token');
        this.router.navigate(['/home']);
      }, err => {
        console.log(err);
      });
  }
  getPlaylistId(id) {
    const obj = {
      id
    };
    this.router.navigate(['/video-details'], { queryParams: obj, relativeTo: this.routes });
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      infiniteScroll.target.complete();
    }, 500);
  }
}
