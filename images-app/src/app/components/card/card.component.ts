import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { iPhoto } from '../../interfaces/iphoto';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  constructor(private photoSvc: PhotoService) {}

  @Output() onDeletion = new EventEmitter<boolean>();

  @Input() id!: number;
  photo!: iPhoto;
  random!: number;

  ngOnInit() {
    this.random = Math.ceil(Math.random() * 5000);
    this.photoSvc.getPhoto(this.id).subscribe((photo) => (this.photo = photo));
  }

  addFav(photo: iPhoto) {
    this.photoSvc.addToFav(this.photo);
  }

  delete(id: number) {
    this.photoSvc.deletePhoto(id).subscribe();
    this.onDeletion.emit(true);
  }
}
