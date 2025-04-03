import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { CreateAccountComponent } from './shared/create-account/create-account.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { InicioAdminComponent } from './components/inicio-admin/inicio-admin.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListadoStockComponent } from './shared/listado-stock/listado-stock.component';
import { CaducidadesComponent } from './shared/caducidades/caducidades.component';
import { CommonModule } from '@angular/common';
import { StockComponent } from './shared/stock/stock.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeComponent } from './components/recipe/recipe.component';
import { GestionUserComponent } from './shared/gestion-user/gestion-user.component';
import { RecetasFormComponent } from './shared/recetas-form/recetas-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'inicio-admin', component: InicioAdminComponent },
  { path: 'listado-stock', component: ListadoStockComponent },
  { path: 'stock', component: StockComponent },
  { path: 'caducidades', component: CaducidadesComponent},
  { path: 'recipe', component: RecipeComponent },
  { path: 'gestionUser', component: GestionUserComponent },
  { path: 'recetas-form', component: RecetasFormComponent }

  //revisar si es necesario
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule, FormsModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
