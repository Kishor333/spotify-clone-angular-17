import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '@spotify-clone-angular-17/auth';
import { Album } from '@spotify-clone-angular-17/shared';
import { SharedFacadeService } from '../../libraries/shared/src/lib/services/shared-facade.service';

@Component({
  standalone: true,
  imports: [ RouterModule, LoginComponent ],
  selector: 'spotify-clone-angular-17-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  albums:Album[] = [];
  
  constructor(private sharedFacadeService: SharedFacadeService){

  }

  ngOnInit(): void {
    if(localStorage.getItem('spotify_access_token')){
      
      this.sharedFacadeService.getMultipleAlbums('382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc,6Z1zv6Hw9bdvSoxI5uYk2h')
      .subscribe((albums)=>{
        this.albums = albums.albums;
        console.log('whole Album:',albums);
      })
    }
  }
}
