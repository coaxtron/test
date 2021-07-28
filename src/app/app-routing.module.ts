import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',redirectTo: 'login',pathMatch:'full'
  },
  {
    path:'', loadChildren:() => import('./home/home.module').then(m=>m.HomeModule)
  },
  {
    path: '', loadChildren:()=> import('./success/success.module').then(m=>m.SuccessModule)
  },
  {
    path: '', loadChildren:()=> import('./auth/auth.module').then(m=>m.AuthModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
