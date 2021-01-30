import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
   constructor( private router: Router) {}

  async login(){
    // const loading = await LoadingController.create({
    //   message: 'Please wait...'
    // });
    GooglePlus.login({
      webClientId: '460950848197-2m3enlgftvt9f5ff05ksg5eqgn5vebrm.apps.googleusercontent.com',
     // scopes: 'https://www.googleapis.com/auth/youtube.force-ssl',
    }).then((user) => {
      localStorage.setItem('access_token', user.accessToken);
      if (user){
        this.router.navigate(['/playlist']);
      }
    }, (err) => {
        console.log(err);
    });
  }

  logout(){
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
}
