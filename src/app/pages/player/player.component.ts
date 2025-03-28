import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YtApiService } from '../../services/yt-api.service';
import { Item, YtVideosApi } from '../../models/yt-videos-api';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-player',
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {
  video!: Item
  videoEmbedHtml: SafeHtml = ""

  private readonly route: ActivatedRoute = inject(ActivatedRoute)
  private readonly ytApiService: YtApiService = inject(YtApiService)
  private readonly sanitizer: DomSanitizer = inject(DomSanitizer)

  ngOnInit() {
    const videoId = this.route.snapshot.paramMap.get('id')
    
    this.ytApiService.showPlayer(videoId!).subscribe({
      next: (response: YtVideosApi) => {
        this.video = response.items[0]

        const unsafeHTML = this.video.player.embedHtml
        this.videoEmbedHtml = this.sanitizer.bypassSecurityTrustHtml(unsafeHTML)
      },
      error: (error: Error) => {
        console.error(error);
      }
    })  
  }

}
