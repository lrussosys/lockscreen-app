import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LockscreenComponent } from './pages/lockscreen/lockscreen.component';
import { SetLockscreenComponent } from './pages/set-lockscreen/set-lockscreen.component';

const routes: Routes = [
  { path: '', component: LockscreenComponent },
  { path: 'lockscreen', component: LockscreenComponent },
  { path: 'set-lockscreen', component: SetLockscreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
