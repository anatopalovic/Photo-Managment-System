import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from 'src/user.guard';
import { AlbumMrezaComponent } from './album-mreza/album-mreza.component';
import { LoginComponent } from './login/login.component';
import { MrezaComponent } from './mreza/mreza.component';
import { SlikaComponent } from './slika/slika.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'mreza', component: MrezaComponent, canActivate: [UserGuard]},
  {path:'album-mreza/:id',component:AlbumMrezaComponent, canActivate: [UserGuard]},
  {path:'slika/:id', component: SlikaComponent, canActivate: [UserGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
