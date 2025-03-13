import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ModalComponent } from './components/modal/modal.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioHeaderComponent } from './components/usuario-header/usuario-header.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { InicioAdminComponent } from './components/inicio-admin/inicio-admin.component';

import { LoginComponent } from './shared/login/login.component';
import { CreateAccountComponent } from './shared/create-account/create-account.component';

import { CreateAccountHeaderComponent } from './shared/create-account/create-account-header/create-account-header.component';
import { CreateAccountFooterComponent } from './shared/create-account/create-account-footer/create-account-footer.component';
import { StockComponent } from './shared/stock/stock.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    ModalComponent,
    UsuarioComponent,
    UsuarioHeaderComponent,
    HeaderAdminComponent,
    InicioAdminComponent,
    LoginComponent,
    CreateAccountComponent,
    CreateAccountFooterComponent,
    CreateAccountHeaderComponent,
    StockComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideClientHydration(withEventReplay())],
  bootstrap: [AppComponent],
})
export class AppModule {}
