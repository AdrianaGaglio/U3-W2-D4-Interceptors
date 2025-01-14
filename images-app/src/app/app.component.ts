import { Component, OnInit } from '@angular/core';
import { PhotoService } from './services/photo.service';
import { iPhoto } from './interfaces/iphoto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private photoSvc: PhotoService) {}

  photos!: iPhoto[];
  isError!: boolean;
  message!: string;

  ngOnInit() {
    // spostare subscribe nel service e qui iscriversi solo al BehaviorSubject
    this.photoSvc.getPhotos1().subscribe({
      next: (photos) => {
        this.isError = false;
        this.photos = photos;
        this.photoSvc.photos$.next(this.photos);
      },
    });
  }

  update(event: boolean) {
    this.photoSvc.photos$.subscribe((photos) => (this.photos = photos));
  }
}
