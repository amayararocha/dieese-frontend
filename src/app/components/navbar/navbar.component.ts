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
        this.router.navigate(['/greves']);
      },
      error => {
        console.error('Login falhou', error);
      }
    );
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/home']); 
  }
}
