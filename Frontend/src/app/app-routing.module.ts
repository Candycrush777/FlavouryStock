import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { CreateAccountComponent } from './shared/create-account/create-account.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { InicioAdminComponent } from './components/inicio-admin/inicio-admin.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListadoStockComponent } from './shared/listado-stock/listado-stock.component';
import { CaducidadesComponent } from './shared/caducidades/caducidades.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeComponent } from './components/recipe/recipe.component';
import { GestionUserComponent } from './shared/gestion-user/gestion-user.component';
import { RecetasFormComponent } from './shared/recetas-form/recetas-form.component';
import { SearchComponent } from './components/search/search.component';
import { SuggestedRecipesComponent } from './components/suggested-recipes/suggested-recipes.component';
import { NotFoundComponent } from './error/not-found-404/not-found.component';
import { GestionRecipeComponent } from './shared/gestion-recipe/gestion-recipe.component';
import { LegalComponent } from './shared/legal/legal.component';
import { AuthGuard } from './guards/auth.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { MetricsComponent } from './shared/metrics/metrics.component';

const routes: Routes = [
  // públicas
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recipe', component: RecipeComponent },
  { path: 'legal/:tipo', component: LegalComponent },

  // protegidas (requieren login → si no, /unauthorized)
  {
    path: 'create-account',
    component: CreateAccountComponent,
    canActivate: [AuthGuard],
  },
  { path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard] },
  {
    path: 'listado-stock',
    component: ListadoStockComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'caducidades',
    component: CaducidadesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'recetas-form',
    component: RecetasFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'search/:nombre',
    component: SearchComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'suggested-recipes/:id',
    component: SuggestedRecipesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'metrics',
    component: MetricsComponent,
  },

  // solo admin (si no, /unauthorized)
  {
    path: 'inicio-admin',
    component: InicioAdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [1] },
  },
  {
    path: 'gestion-user',
    component: GestionUserComponent,
    canActivate: [AuthGuard],
    data: { roles: [1] },
  },
  {
    path: 'gestion-recipe',
    component: GestionRecipeComponent,
    canActivate: [AuthGuard],
    data: { roles: [1] },
  },

  // página de acceso denegado
  { path: 'unauthorized', component: UnauthorizedComponent },

  // fallback
  { path: '**', component: NotFoundComponent },
];

const routerConfig: ExtraOptions = {
  initialNavigation: 'enabledBlocking',
  scrollPositionRestoration: 'top',
};
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      initialNavigation: 'enabledBlocking',
    }),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
