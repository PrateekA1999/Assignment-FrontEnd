import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'compound',
    loadChildren : () => import('./compound/compound.module').then(m => m.CompoundModule)
  },
  {
    path: '',
    redirectTo: 'compound',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
