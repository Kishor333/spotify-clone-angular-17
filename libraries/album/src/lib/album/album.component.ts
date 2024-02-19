import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'libraries/shared/src/lib/models/models';
import { SharedStoreEnum } from 'libraries/shared/src/lib/models/shared.store';
import { SharedFacadeService } from '../../../../shared/src/lib/services/shared-facade.service';
import { AlbumFacadeService } from '../services/album-facade.service';


@Component({
  selector: 'spotify-clone-angular-17-album',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss'
})
export class AlbumComponent implements OnInit, AfterViewInit{
  stateAlbum: Album[] = [] as Album[];
  isOverflowing = false;
  @ViewChild('container') containerRef!: ElementRef;
  @ViewChild('titleText') titleRef!: ElementRef;

  constructor(
    private albumFacadeService: AlbumFacadeService,
    private sharedFacadeService: SharedFacadeService,
    private activateRoute: ActivatedRoute){}
  ngOnInit(): void {
    // this.getAlbumById();
    this.activateRoute.paramMap.subscribe((params) => {
      console.log(params.get('id'));
      // get
    })
    console.log(this.activateRoute.snapshot.paramMap.get('id'));
    this.stateAlbum = this.sharedFacadeService.getSpecificState(SharedStoreEnum.ALBUMS);
    console.log('Inside album component', this.sharedFacadeService.getSpecificState(SharedStoreEnum.ALBUMS));
  }

  ngAfterViewInit(): void {
    const container = this.containerRef.nativeElement;
    const title = this.titleRef.nativeElement;
    this.isOverflowing = title.scrollWidth >= container.offsetWidth;
  }

  async getAlbumById(): Promise<void> {
    this.albumFacadeService.getAlbumById('4aawyAB9vmqN3uQ7FjRGTy').subscribe((album) => {
      // this.album = album;
      console.log(album);
    });
  }
}
