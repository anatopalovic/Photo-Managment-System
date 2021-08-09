import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, NgModel } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MrezaComponent } from './mreza/mreza.component';
import { AlbumMrezaComponent } from './album-mreza/album-mreza.component';
import { SlikaComponent } from './slika/slika.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MrezaComponent,
    AlbumMrezaComponent,
    SlikaComponent
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
