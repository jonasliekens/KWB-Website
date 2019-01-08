import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {BestuurComponent} from './bestuur/bestuur.component';
import {BsDropdownModule, CarouselModule, CollapseModule} from 'ngx-bootstrap';
import {InfoComponent} from './info/info.component';
import {LidComponent} from './lid/lid.component';
import {ProgrammaComponent} from './programma/programma.component';
import {RaakComponent} from './raak/raak.component';
import {BlogComponent} from './blog/blog.component';
import {BlogDetailComponent} from './blog/detail/blog.detail.component';
import {AgendaComponent} from './agenda/agenda.component';
import {AgendaDetailComponent} from './agenda/detail/agenda.detail.component';
import {HttpClientModule} from '@angular/common/http';
import {VolleybalComponent} from './volleybal/volleybal.component';
import {MarkdownModule} from 'ngx-markdown';

const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'bestuur', component: BestuurComponent},
    {path: 'about', component: AboutComponent},
    {path: 'info', component: InfoComponent},
    {path: 'lidmaatschap', component: LidComponent},
    {path: 'activiteit', component: AgendaComponent},
    {path: 'activiteit/:id', component: AgendaDetailComponent},
    {path: 'programma', component: ProgrammaComponent},
    {path: 'volleybal', component: VolleybalComponent},
    {path: 'raak', component: RaakComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'blog/:id', component: BlogDetailComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        BestuurComponent,
        InfoComponent,
        LidComponent,
        AboutComponent,
        AgendaComponent,
        AgendaDetailComponent,
        ProgrammaComponent,
        VolleybalComponent,
        RaakComponent,
        BlogComponent,
        BlogDetailComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BsDropdownModule.forRoot(),
        CollapseModule.forRoot(),
        CarouselModule.forRoot(),
        MarkdownModule.forRoot(),
        RouterModule.forRoot(
            appRoutes,
            {
                // enableTracing: true,
                useHash: true
            }
        )
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
