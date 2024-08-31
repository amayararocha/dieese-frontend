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
  isLoggedIn = false; // Você pode ajustar isso com base na lógica de autenticação real
  menuOpen = false;

  constructor(private router: Router) { }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  login(username: string, password: string) {
    // Adicione a lógica de autenticação aqui
    console.log('Login clicked with:', username, password);
    this.isLoggedIn = true;
    this.closeMenu();
  }

  logout() {
    // Adicione a lógica de logout aqui
    console.log('Logout clicked');
    this.isLoggedIn = false;
    this.closeMenu();
    this.router.navigate(['/']);
  }
}
