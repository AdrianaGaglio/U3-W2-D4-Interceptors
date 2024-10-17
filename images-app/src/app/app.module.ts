import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from './components/card/card.component';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [AppComponent, CardComponent, TruncatePipe, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule],
  providers: [
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
