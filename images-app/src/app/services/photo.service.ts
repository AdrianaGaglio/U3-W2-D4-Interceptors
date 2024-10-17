import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iPhoto } from '../interfaces/iphoto';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  Subject,
  take,
  throwError,
} from 'rxjs';
import { iResponse } from '../interfaces/iresponse';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private http: HttpClient) {}

  apiUrl = 'https://jsonplaceholder.typicode.com/photoss';

  photos$ = new BehaviorSubject<iPhoto[]>([]);
  favourite$ = new Subject<iPhoto>();

  getPhotos1(): Observable<iPhoto[]> {
    return this.http
      .get<iPhoto[]>(this.apiUrl)
      .pipe(map((arr) => arr.slice(0, arr.length / 50)))
      .pipe(
        catchError((error) => {
          return throwError(() => {
            let message = '';
            if (error.status === 404) {
              message = 'Not Found';
            } else {
              message = 'Server Error';
            }
            return message;
          });
        })
      );
  }

  // getPhotos1(): Observable<iPhoto[]> {
  //   return this.http.get<iPhoto[]>(this.apiUrl).pipe(take(5));
  // }

  getPhoto(id: number): Observable<iPhoto> {
    return this.http.get<iPhoto>(`${this.apiUrl}/${id}`);
  }

  deletePhoto(id: number): Observable<iPhoto> {
    let tempArray = this.photos$.value;
    console.log(tempArray.length);
    tempArray = tempArray.filter((item) => item.id !== id);
    console.log(tempArray.length);
    this.photos$.next(tempArray);
    return this.http.delete<iPhoto>(`${this.apiUrl}/${id}`);
  }

  addToFav(photo: iPhoto) {
    this.favourite$.next(photo);
  }
}
