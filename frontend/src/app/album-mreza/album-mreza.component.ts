import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from '../models/album';
import { Photo } from '../models/photo';


@Component({
  selector: 'app-album-mreza',
  templateUrl: './album-mreza.component.html',
  styleUrls: ['./album-mreza.component.css'],
  changeDetection: ChangeDetectionStrategy.Default


})


export class AlbumMrezaComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  // id for wich album we are in  
  id: number;
  // All photos in the system for this album
  photos: Photo[];
  // Currently displayed photos fromtthis album - user for 'load-on-scroll' functionality
  currentPhotos: Photo[];
  // The album that is the owner of these photos
  album: Album = new Album();
  // Number used to confirm the requested deletion of a certain image
  isSure: number;
  // String based on which the user is searching through all the photos in a certain album
  searchText: string;
  // Photoused to passthe data into the 'Are you sure?' popup
  selectedPhoto: Photo = new Photo();
  // Current batch number displayed - batch is a small segment of all photos in the system
  batchNum: number = 1;
  // The size of the batch we load everytime the user scrolls to the end of the page
  batchSize: number = 3;

  ngOnInit(): void {
    // I used this helperto ensure the MrezaComponent reloads once, 
    //since the list/grid buttons seem to not wok without it 
    let idForRefresh = 1;
    localStorage.setItem('idForRefresh', JSON.stringify(idForRefresh))

    this.id = JSON.parse(this.route.snapshot.paramMap.get('id'));

    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${this.id}`)
      .then((response) => response.json())
      .then((data: Photo[]) => {
        this.photos = data;
        this.currentPhotos = this.photos.slice(0, this.batchSize)
      });

    fetch(`https://jsonplaceholder.typicode.com/albums?id=${this.id}`)
      .then((response) => response.json())
      .then((data) => {
        this.album = data[0];
      });



  }

  // For succesful search based o a text typed in the input field
  search(searchText) {

    // First we grab all the hotos from the system to 
    // ensure that the search is always done on all of the photos
    const getPhotos = fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${this.id}`)
      .then((response) => response.json())
      .then((data: Photo[]) => {
        this.photos = data;
        this.currentPhotos = this.photos.slice(0, this.batchSize * this.batchNum)
      });


    getPhotos.then(() => {

      // Once the photos are collected, currently displayed photos are filtered 
      this.currentPhotos = this.currentPhotos.filter(function (p) {
        return p.title.includes(searchText)
      })
    })

  }

  // For routing back to the previos page
  routeBack() {
    this.router.navigate(['mreza'])
  }

  // For successful deletion of a selected photo
  deletePhoto(id: number) {

    // First we find the index of a photo with the desired id,
    // so we can access it in the array
    let index = this.currentPhotos.findIndex(p => p.id == id);

    // Then we removed the object, fromthe array to make it look like it works and 
    // then we send the fetch to imitate data being deleted for real
    this.currentPhotos.splice(index, 1);
    fetch(`https://jsonplaceholder.typicode.com/photos/${id}`, {
      method: 'delete'
    });

  }

  // For the'Load on scroll' functionality
  @HostListener("window:scroll", [])
  onScroll(): void {

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {

      // selfRef used so that this can be accessed inside the filtter function
      var selfRef = this

      // Getting the new batch to load and updating the numbers
      let newBatch: Photo[] = this.photos.filter(function (p, index) {
        return (index >= selfRef.batchSize * selfRef.batchNum && index < selfRef.batchSize * (selfRef.batchNum + 1))
      })
      this.currentPhotos = this.currentPhotos.concat(newBatch);
      this.batchNum++;
    }
    
  }

  bottomReached(): boolean {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }

}
