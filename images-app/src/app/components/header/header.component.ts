import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { iPhoto } from '../../interfaces/iphoto';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(private photoSvc: PhotoService) {}

  favourites: iPhoto[] = [];

  ngOnInit() {
    this.photoSvc.favourite$.subscribe((favourite: iPhoto) => {
      if (!this.favourites.some((item) => item.id === favourite.id)) {
        this.favourites.push(favourite);
      }
    });
  }
}
