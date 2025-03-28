import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { YtApiService } from '../../services/yt-api.service';
import { Item, YtSearchApi } from '../../models/yt-search-api';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchResult?: Item[]  

  private readonly router: Router = inject(Router)
  private readonly ytApiService: YtApiService = inject(YtApiService)
  hasSearched$ = inject(YtApiService).hasSearched$
  
  searchForm: FormGroup = new FormGroup({
    search: new FormControl('', [Validators.required])
  })

  onSubmit() {
    const searchParam = this.searchForm.value
    console.log(searchParam.search);
    
    this.ytApiService.search(searchParam.search).subscribe({
      next: (response: YtSearchApi) => {
        this.searchResult = response.items 
      },
      error: (error: Error) => {
        console.error(error);        
      }
    })
  }
}
