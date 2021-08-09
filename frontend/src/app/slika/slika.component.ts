import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from '../models/photo';


@Component({
  selector: 'app-slika',
  templateUrl: './slika.component.html',
  styleUrls: ['./slika.component.css']
})
export class SlikaComponent implements OnInit {



  constructor(private route: ActivatedRoute, private router: Router) { }

  // Object for the opened photo
  photo: Photo = new Photo();
  // Index of the first oened photo that changes on iterating between other photos
  index: number;
  // All photos from current album
  photos: Photo[];

  //Async function for getting all the photos
  async getPhotos(albumId) {

    const responses = []
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
    const json = await response.json();
    this.photos = json;

    // Locationg the index of the first opened photo in the array of all photos
    this.index = this.photos.findIndex(p => p.id == this.photo.id)
    responses.push(json)

    return responses;
  }

  ngOnInit(): void {

    // Getting the passed id through root of the opened photo
    let id = JSON.parse(this.route.snapshot.paramMap.get('id'))

    // Fetching that photo with a specific id
    const getPhoto = fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
      .then((response) => response.json())
      .then((data: Photo) => {
        this.photo = data;

      });

    // Fetching all photos in the album
    getPhoto.then(() => {
      this.getPhotos(this.photo.albumId).then(res => {
        console.log('ok')
      })
    })
  }

  // For updating the index value when iterating through other photos
  prev() {
    if (this.index - 1 >= 0)
      this.index--;
  }
  next() {
    if (this.index + 1 < this.photos.length)
      this.index++;
  }

  // For routing back to the previous page
  back() {
    let newRoute = 'album-mreza/' + this.photo.albumId
    this.router.navigate([newRoute])
  }
}
