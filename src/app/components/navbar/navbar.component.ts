import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
 standalone: true, 
 imports: [CommonModule, FormsModule]
})
export class NavbarComponent implements OnInit {
  menuOpen: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private userService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.userService.isLoggedIn.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  login(username: string, password: string): void {
    this.userService.autenticarUsuario({ usuario: username, senha: password }).subscribe(
      (response) => {
        // On successful login, redirect or perform actions if needed
        this.router.navigate(['/']);
      },
      error => {
        console.error('Login failed:', error);
      }
    );
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']); // Redirect to login page on logout
  }
}
