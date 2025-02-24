import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { QuotationFormComponent } from './pages/quotation-form/quotation-form.component';
import { QuotesDetailsComponent } from './pages/quotes-details/quotes-details.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'quote-form',
        component: QuotationFormComponent
    },
    {
        path: 'quotes-details',
        component: QuotesDetailsComponent
    }
];
