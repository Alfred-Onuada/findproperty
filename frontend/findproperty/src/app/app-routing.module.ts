import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PropertyPageComponent } from './property-page/property-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: "property/:propertyId/:sellerId", component: PropertyPageComponent },
  { path: "sign-up", component: SignUpComponent },
  { path: "sign-in", component: SignInComponent },
  { path: "dashboard", component: ClientDashboardComponent }, // in reality some kind of authetication will determine which dashboard to show, but keeping the name same is just for simplicity
  { path: "", component: HomePageComponent },
  { path: "**", component: PageNotFoundComponent}
];

// there are a lot more configuarations and will be added only as needed
const routerConfig: ExtraOptions = {
  scrollPositionRestoration: 'enabled'
}

@NgModule({
  imports: [RouterModule.forRoot(routes, routerConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
