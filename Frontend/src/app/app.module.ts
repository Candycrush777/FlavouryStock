import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ModalComponent } from './components/modal/modal.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioHeaderComponent } from './components/usuario-header/usuario-header.component';
import { InicioAdminComponent } from './components/inicio-admin/inicio-admin.component';
import { LoginComponent } from './shared/login/login.component';
import { CreateAccountComponent } from './shared/create-account/create-account.component';
import { StockComponent } from './shared/stock/stock.component';
import { ListadoStockComponent } from './shared/listado-stock/listado-stock.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CaducidadesComponent } from './shared/caducidades/caducidades.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { GestionUserComponent } from './shared/gestion-user/gestion-user.component';
import { RecetasFormComponent } from './shared/recetas-form/recetas-form.component';
import { SlideRecipesComponent } from './components/slide-recipes/slide-recipes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    ModalComponent,
    UsuarioComponent,
    UsuarioHeaderComponent,
    InicioAdminComponent,
    LoginComponent,
    CreateAccountComponent,
    StockComponent,
    ListadoStockComponent,
    CaducidadesComponent,
    RecipeComponent,
    GestionUserComponent,
    RecetasFormComponent,
    SlideRecipesComponent,
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    SlideRecipesComponent
  ],
  providers: [provideClientHydration(withEventReplay())],
  bootstrap: [AppComponent],
})
export class AppModule {}
