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
import { StickyNavModule } from 'ng2-sticky-nav';
import { formatNumber } from './pipes/numberFormatter.pipe';
import { PropertyCardComponent } from './property-card/property-card.component';
import { CarouselComponent } from './carousel/carousel.component';
import { MatDividerModule } from '@angular/material/divider';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';

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
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MatGridListModule,
    MatListModule,
    MatButtonModule,
    StickyNavModule,
    MatDividerModule
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
