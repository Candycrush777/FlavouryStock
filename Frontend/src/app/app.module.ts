import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
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
import { ListadoStockComponent } from './shared/listado-stock/listado-stock.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CaducidadesComponent } from './shared/caducidades/caducidades.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { GestionUserComponent } from './shared/gestion-user/gestion-user.component';
import { RecetasFormComponent } from './shared/recetas-form/recetas-form.component';
import { SlideRecipesComponent } from './components/slide-recipes/slide-recipes.component';
import { SearchComponent } from './components/search/search.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { SuggestedRecipesComponent } from './components/suggested-recipes/suggested-recipes.component';
import { NotFoundComponent } from './error/not-found-404/not-found.component';
import { GestionRecipeComponent } from './shared/gestion-recipe/gestion-recipe.component';
import { UnidadMedidaPipe } from './pipes/unidad-medida.pipe';
import { LegalComponent } from './shared/legal/legal.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { MetricsComponent } from './shared/metrics/metrics.component';
import { MetricStockComponent } from './components/metrics/metric-stock/metric-stock.component';
import { MetricCaducidadComponent } from './components/metrics/metric-caducidad/metric-caducidad.component';
import { MetricRecetasComponent } from './components/metrics/metric-recetas/metric-recetas.component';
import { MetricEstacionesComponent } from './components/metrics/metric-estaciones/metric-estaciones.component';

import { MetricOcupacionComponent } from './components/metrics/metric-ocupacion/metric-ocupacion.component';
import { NgChartsModule } from 'ng2-charts';

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
    ListadoStockComponent,
    CaducidadesComponent,
    RecipeComponent,
    GestionUserComponent,
    RecetasFormComponent,
    SlideRecipesComponent,
    SearchComponent,
    RecipeListComponent,
    SuggestedRecipesComponent,
    NotFoundComponent,
    GestionRecipeComponent,
    UnidadMedidaPipe,
    LegalComponent,
    UnauthorizedComponent,
    MetricsComponent,
    MetricStockComponent,
    MetricCaducidadComponent,
    MetricRecetasComponent,
    MetricEstacionesComponent,
    MetricOcupacionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
  ],
  exports: [SlideRecipesComponent],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(), // habilita el uso de fetch API (mejor para SSR)
      withInterceptorsFromDi()
      // registra los interceptores desde DI (en el AuthInterceptor)
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
