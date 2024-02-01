import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PoModule } from '@po-ui/ng-components';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtInterceptor } from './shared/function/jwt.service';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    PoModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictActionImmutability: false,
          strictStateImmutability: false,
        }
      }
    )
  ],
  providers: [HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
