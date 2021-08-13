import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { AuthGuard } from './login/shared/auth.guard';

const routes: Routes = [
  {
    path: 'form-builder',
    component: FormBuilderComponent,
    canActivate: [AuthGuard],
  },
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
  providers: [AuthGuard],
})
export class AppRoutingModule {}
