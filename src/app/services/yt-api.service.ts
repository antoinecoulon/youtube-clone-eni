import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { YtSearchApi } from '../models/yt-search-api';
import { YtVideosApi } from '../models/yt-videos-api';

const API_BASE_URL = environment.yt_api
const API_KEY = environment.apiKey

@Injectable({
  providedIn: 'root'
})
export class YtApiService {

  private readonly http: HttpClient = inject(HttpClient)

  private readonly hasSearchedSubject = new BehaviorSubject<boolean>(false)
  hasSearched$ = this.hasSearchedSubject.asObservable()

  search(q: string, part: string = 'snippet', key: string = API_KEY) {
    this.hasSearchedSubject.next(true)
    return this.http.get<YtSearchApi>(`${API_BASE_URL}search?part=${part}&q=${q}&key=${key}`)
  }

  showPlayer(videoId: string, part: string = 'snippet,contentDetails,statistics,player', key: string = API_KEY) {
    return this.http.get<YtVideosApi>(`${API_BASE_URL}videos?part=${part}&id=${videoId}&key=${key}`)
  }
}
