import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiServicesService {
  baseUrl = 'https://www.googleapis.com/youtube/v3/';
  apiKey = 'AIzaSyD87KPucren_tCnkU0otrF1Xib47qqFKO';
  channelId = localStorage.getItem('channelId');

  // {headers: {"Authorization": "Bearer " + accessToken}}
  constructor(private http: HttpClient) { }
  private headers = {
    Authorization: 'Bearer' + ' ' + localStorage.getItem('access_token')
  };

  getChannelId() {
    const data = {part : 'id', mine: 'true'};
    return this.http.get(this.baseUrl + 'channels', { params: data, headers: this.headers},
    );
  }

  getPlaylist(channelId){
    const data = { part: 'snippet', channelId, key : this.apiKey};
    return this.http.get(this.baseUrl + 'playlists', { params: data, headers: this.headers});
  }

  getPlaylistItem(id){
    const data = {part: 'snippet' , playlistId: id, key: this.apiKey};
    return this.http.get(this.baseUrl + 'playlistItems', { headers: this.headers, params: data});
  }
}