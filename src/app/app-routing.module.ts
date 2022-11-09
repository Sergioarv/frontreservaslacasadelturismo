import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'flyer',
    children: [
      {
        path: '',
        loadChildren: () => import('./components/flyer/index/index.module').then(m => m.IndexPageModule)
      },
      {
        path: 'create',
        loadChildren: () => import('./components/flyer/create/create.module').then( m => m.CreatePageModule)
      },
      {
        path: 'edit',
        loadChildren: () => import('./components/flyer/edit/edit.module').then( m => m.EditPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
