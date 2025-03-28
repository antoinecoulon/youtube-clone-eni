import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { SearchComponent } from './pages/search/search.component';
import { PlayerComponent } from './pages/player/player.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },

    { path: 'search', component: SearchComponent},
    { path: 'player/:id', component: PlayerComponent }
];
