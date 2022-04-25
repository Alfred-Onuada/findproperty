import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { formatNumber } from './pipes/numberFormatter.pipe';
import { PropertyCardComponent } from './property-card/property-card.component';
import { CarouselComponent } from './carousel/carousel.component';
import { MatDividerModule } from '@angular/material/divider';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PropertyPageComponent } from './property-page/property-page.component';
import { StarsComponent } from './stars/stars.component';
import { BigCarouselComponent } from './big-carousel/big-carousel.component';
import { HttpClientModule } from '@angular/common/http';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    formatNumber,
    PropertyCardComponent,
    CarouselComponent,
    SignUpComponent,
    SignInComponent,
    PageNotFoundComponent,
    HomePageComponent,
    PropertyPageComponent,
    StarsComponent,
    BigCarouselComponent,
    ClientDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatGridListModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    HttpClientModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
