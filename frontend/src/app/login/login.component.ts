
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router) { }

  // Strings for storing the data the guest entered inside the form 
  username: string;
  email: string;

  // String to show a message in case the guest entered nonexisting data
  message: string;

  ngOnInit(): void {
    localStorage.clear();
  }

  // For login
  login() {

    //First we check if the guest entered all the required fields
    if (this.username == null || this.email == null) {
      this.message = 'Please fill in all required fields!'
    } else {

      // Checking if there is a user in the database with mentioned data
      fetch(`https://jsonplaceholder.typicode.com/users?username=${this.username}&email=${this.email}`)
        .then((response) => response.json())
        .then(data => {

          // If there is no user with such data we display the error-message
          if (data[0] == null) {
            this.message = 'There is no user with such data!';
          }
          else {

            // If there is a user
            // I used this helper to ensure the MrezaComponent reloads once, 
            // since the list/grid buttons seem to not wok without it 
            let idForRefresh = 1;
            localStorage.setItem('idForRefresh', JSON.stringify(idForRefresh))

            // Setting the user and navigating to all the albums
            var user = JSON.stringify(data);
            localStorage.setItem('user', user);
            this.router.navigate(['mreza'])
          }
        }
        );
    }
  }

}
