import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class NavbarComponent {
  isLoggedIn = false;
  menuOpen = false;

  constructor(private router: Router) { }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  login(username: string, password: string) {
    console.log('Login clicked with:', username, password);
    this.isLoggedIn = true;
    this.closeMenu();
  }

  logout() {
    console.log('Logout clicked');
    this.isLoggedIn = false;
    this.closeMenu();
    this.router.navigate(['/']);
  }
}
