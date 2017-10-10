import { AlertModule } from 'ngx-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {SensoriComponent} from './sensori/sensori.component';
import {RouterModule} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import {ModalModule} from 'ngx-modal';
import { UtentiComponent } from './utenti/utenti.component';
import { Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import {AmministratoriService} from '../classes/AmministratoriService';
import { ProfiloComponent } from './profilo/profilo.component';
import {UtentiService} from '../classes/UtentiService';
import { SensoriUtentiComponent } from './sensori-utenti/sensori-utenti.component';
import { DashboardUtentiComponent } from './dashboard-utenti/dashboard-utenti.component';
import { ProfiloUtentiComponent } from './profilo-utenti/profilo-utenti.component';
import {SensoriService} from '../classes/SensoriService';
import {Ng2FilterPipeModule} from 'ng2-filter-pipe';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  { path: 'sensori', component: SensoriComponent },
  { path: 'utenti', component: UtentiComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profilo', component: ProfiloComponent},
  { path: '', component: LoginComponent},
  { path: 'dashboard-utenti', component: DashboardUtentiComponent},
  { path: 'sensori-utenti', component: SensoriUtentiComponent},
  { path: 'profilo-utenti', component: ProfiloUtentiComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    SensoriComponent,
    DashboardComponent,
    UtentiComponent,
    LoginComponent,
    ProfiloComponent,
    SensoriUtentiComponent,
    DashboardUtentiComponent,
    ProfiloUtentiComponent

  ],
  imports: [
    BrowserModule,
    HttpModule,
    ModalModule,
    AlertModule.forRoot(),
    RouterModule.forRoot(routes),
    Ng2FilterPipeModule,
    FormsModule
  ],
  providers: [UtentiService, AmministratoriService, SensoriService],
  bootstrap: [AppComponent]
})
export class AppModule { }
