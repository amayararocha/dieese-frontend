import { Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { HomeComponent } from './paginas/home/home.component';
import { CadastroComponent } from './paginas/cadastro/cadastro.component';
import { GreveComponent } from './components/greve/listaGreve/greve.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'cadastro', component: CadastroComponent},
    {path: 'greves', component: GreveComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' }, 
    { path: '**', redirectTo: '/home' }
];