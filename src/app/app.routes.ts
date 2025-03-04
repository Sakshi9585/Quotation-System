import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { QuotationFormComponent } from './pages/quotation-form/quotation-form.component';
import { QuotesDetailsComponent } from './pages/quotes-details/quotes-details.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './shared/guard/auth.guard';

export const routes: Routes = [
  
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: HomeComponent, canActivate: [authGuard] },
    { path: 'about', component: AboutComponent },
    { path: 'quote-form', component: QuotationFormComponent },
    { path: 'quotes-details', component: QuotesDetailsComponent },
    { path: '**', redirectTo: 'login' },
];
