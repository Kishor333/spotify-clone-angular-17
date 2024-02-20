import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Album } from 'libraries/shared/src/lib/models/models';
import { SharedStoreEnum } from 'libraries/shared/src/lib/models/shared.store';
import { tap } from 'rxjs';
import { SharedFacadeService } from '../../../../shared/src/lib/services/shared-facade.service';
import { AlbumFacadeService } from '../services/album-facade.service';

@UntilDestroy()
@Component({
  selector: 'spotify-clone-angular-17-album',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss'
})
export class AlbumComponent implements OnInit {
  stateAlbum: Album[] = [] as Album[];
  selectedStateAlbum: Album[] = [] as Album[];
  selectedAlbum!:Album;

  isOverflowing = false;
  @ViewChild('container') containerRef!: ElementRef;
  @ViewChild('titleText') titleRef!: ElementRef;

  constructor(
    private albumFacadeService: AlbumFacadeService,
    private sharedFacadeService: SharedFacadeService,
    private activateRoute: ActivatedRoute){}
  
  ngOnInit(): void {
    // this.getAlbumById();
    this.listenToAlbumChanges();
    this.activateRoute.paramMap.subscribe((params) => {
      if(params.get('id')){
        
        this.getSingleAlbum(params.get('id'));
      }
    });
    // console.log(this.activateRoute.snapshot.paramMap.get('id'));
    // this.stateAlbum = this.sharedFacadeService.getSpecificState<Album[]>(SharedStoreEnum.ALBUMS);
    // console.log('inside album comp',this.stateAlbum);
    // console.log('Inside album component', this.sharedFacadeService.getSpecificState(SharedStoreEnum.ALBUMS));
  }

  listenToAlbumChanges(): void {
    this.sharedFacadeService.specificStateChange<Album[]>(SharedStoreEnum.ALBUMS).pipe(untilDestroyed(this),tap((albums) => {
      //@ts-ignore
      this.stateAlbum = albums;
    })).subscribe();
  }

  checkViewPort(): void {
    const container = this.containerRef.nativeElement;
    const title = this.titleRef.nativeElement;
    console.log(title.scrollWidth,container.scrollWidth);
    console.log(title.scrollWidth >= container.scrollWidth)
    this.isOverflowing = title.scrollWidth >= container.scrollWidth;
  }

  // async getAlbumById(): Promise<void> {
  //   this.albumFacadeService.getAlbumById('4aawyAB9vmqN3uQ7FjRGTy').subscribe((album) => {
  //     // this.album = album;
  //     console.log(album);
  //   });
  // }

  getSingleAlbum(albumId:any):void {
    //@ts-ignore
    this.selectedAlbum = this.sharedFacadeService.getSpecificState(SharedStoreEnum.ALBUMS).find((album) => album.id === albumId);
    setTimeout(() => {
      this.checkViewPort();
    },100)
    
    // this.selectedAlbum = this.selectedStateAlbum.find((album) => album.id === albumId)
  }

  // checkViewPort(): void {
  //   const container = this.containerRef.nativeElement;
  //   const title = this.titleRef.nativeElement;
  //   console.log(title.scrollWidth,container.scrollWidth);
  //   console.log(title.scrollWidth >= container.scrollWidth)
  //   this.isOverflowing = title.scrollWidth >= container.scrollWidth;
  // }
}


