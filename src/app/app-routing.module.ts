import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',redirectTo: 'home',pathMatch:'full'
  },
  {
    path:'', loadChildren:() => import('./home/home.module').then(m=>m.HomeModule)
  },
  {
    path: '', loadChildren:()=> import('./success/success.module').then(m=>m.SuccessModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
