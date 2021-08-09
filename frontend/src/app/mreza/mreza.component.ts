import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Album } from '../models/album';

@Component({
  selector: 'app-mreza',
  templateUrl: './mreza.component.html',
  styleUrls: ['./mreza.component.css']
})
export class MrezaComponent implements OnInit {

  constructor(private router: Router) { }

  // Array for all albums in the database
  albums: Album[];
  // Array for all currently displayed albums that changes on scroll
  currentAlbums: Album[];
  // Numbers used for loading another batch for 'Load on scroll' option
  batchNum: number = 1;
  batchSize: number = 3;

  // Async function for fetching all owners of the albums 
  // - done with an additional field in the module for owner
  // - also it fetches a randompic from the album to display, also done with an additional field
  async getOwnersAndRandPic(albums) {

    // Array for all the responses fetched - users
    const responses = [];
    for (var i = 0; i < albums.length; i++) {
      // Owner name fetch
      var owner = albums[i].userId;
      const response = await fetch(`https://jsonplaceholder.typicode.com/users?select=name&id=${owner}`)
      const json = await response.json();
      var user = json[0].name;

      responses.push(user);
      this.albums[i].owner = user;

      // Random image fetch
      const response2 = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albums[i].id}`)
      const json2 = await response2.json();
      var random = await Math.floor(Math.random() * (json2.length - 1));
      var src = json2[random].thumbnailUrl;

      this.albums[i].randomPic = src;

    }
    return responses;
  }

  ngOnInit(): void {

    // I used this helper to ensure the MrezaComponent reloads once, 
    // since the list/grid buttons seem to not wok without it 
    let idForRefresh = JSON.parse(localStorage.getItem('idForRefresh'));
    if (idForRefresh == 1) {
      idForRefresh = 2;
      localStorage.setItem('idForRefresh', idForRefresh);
      location.reload();
    }

    // Fetching all albums
    const getAlbums = fetch('https://jsonplaceholder.typicode.com/albums')
      .then((response) => response.json())
      .then((data) => {
        this.albums = data;
        this.currentAlbums = this.albums.slice(0, this.batchSize);
      });

    // Fetching the names of album owners and random pictures for displaying
    getAlbums.then(() => {
      this.getOwnersAndRandPic(this.albums).then(res => {
        console.log('ok')
      });
    })
  }

  // For logout
  logout() {
    this.router.navigate([''])
  }

  // For the'Load on scroll' functionality
  @HostListener("window:scroll", [])
  onScroll(): void {

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {

      // selfRef used so that this can be accessed inside the filtter function
      var selfRef = this;

      // Getting the new batch to load and updating the numbers
      let newBatch: Album[] = this.albums.filter(function (a, index) {
        return (index >= selfRef.batchSize * selfRef.batchNum && index < selfRef.batchSize * (selfRef.batchNum + 1))
      })
      this.currentAlbums = this.currentAlbums.concat(newBatch);
      this.batchNum++;
    }

  }

  bottomReached(): boolean {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }


}

