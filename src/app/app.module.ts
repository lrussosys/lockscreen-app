import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SetLockscreenComponent } from './pages/set-lockscreen/set-lockscreen.component';
import { LockscreenComponent } from './pages/lockscreen/lockscreen.component';

@NgModule({
  declarations: [
    AppComponent,
    SetLockscreenComponent,
    LockscreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
