import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ReactivoComponent } from './components/reactivo/reactivo.component';
import { SearchComponent } from './components/search/search.component';
import { ErrorViewComponent } from './components/error-view/error-view.component';

export const routes: Routes = [
    {path: '', redirectTo: '/reportes', pathMatch:'full'},
    {path: 'reportes', component: DashboardComponent},
    {path: 'agregar', component:ReactivoComponent},
    {path: 'buscar', component:SearchComponent},
    {path: 'error', component:ErrorViewComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class appRoutes{}
