import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi, HttpClientModule } from '@angular/common/http'
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { HeaderComponent } from "./components/header/header.component";

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);

// import * as moment from 'moment';
import { GraphQLModule } from './graphql.module';
import { ApolloModule } from 'apollo-angular';


@NgModule({ declarations: [
        AppComponent,    
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        ReactiveFormsModule,
        HeaderComponent,
        MatSortModule,                    
        GraphQLModule,
        ApolloModule,        
    ],
    providers: [                     
        { provide: LOCALE_ID, useValue: 'es-ES' },
        // { provide: MOMENT, useValue: moment },
        provideClientHydration(),
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {}
