import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from './form-builder/form-builder.component';

const routes: Routes = [
  { path: 'form-builder', component: FormBuilderComponent },
  {
    path: '',
    loadChildren: () =>
      import('./login/login.routing.module').then((m) => m.LoginRoutingModel),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
