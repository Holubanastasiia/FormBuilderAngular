import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { LoginComponent } from './login/login.component';
import { ElementsComponent } from './form-builder/elements/elements.component';
import { BuilderComponent } from './form-builder/builder/builder.component';
import { StylesComponent } from './form-builder/styles/styles.component';
import { AuthInterceptor } from './login/shared/auth.interseptor';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormBuilderComponent,
    LoginComponent,
    ElementsComponent,
    BuilderComponent,
    StylesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, DragDropModule, HttpClientModule],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
