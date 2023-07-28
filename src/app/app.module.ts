import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DefaultComponent } from './admin/default/default.component';
import { Routes,RouterModule } from '@angular/router';
import { SidebarComponent } from './admin/shard/sidebar/sidebar.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PostsComponent } from './admin/dashboard/posts/posts.component';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ArticlesToValidateComponent } from './admin/articles-to-validate/articles-to-validate.component';
import { DialogComponent } from './admin/dialog/dialog.component';
import { ProfilDescriptionComponent } from './admin/profil-description/profil-description.component';
import { OtherProfilArticleComponent } from './admin/other-profil-article/other-profil-article.component';


const Dx_Modules = [
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule
]

const Dx_TableModules = [
  MatTableModule, MatPaginatorModule
]

const routes : Routes = [
  {path:'',component:DefaultComponent,
   children:[
    {path:'dashboard',component:DashboardComponent},
    {path:'posts',component:PostsComponent},
    {
      path: 'articleToValidate/:id',
      component: ArticlesToValidateComponent
    },
    {
      path: 'profil',
      component: ProfilDescriptionComponent
    },
    {
      path: 'otherprofil',
      component: OtherProfilArticleComponent
    },
  ]
}
]

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    SidebarComponent,
    DashboardComponent,
    PostsComponent,
    ArticlesToValidateComponent,
    DialogComponent,
    ProfilDescriptionComponent,
    OtherProfilArticleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    Dx_Modules,
    Dx_TableModules,
    RouterModule.forRoot(routes),
    MatInputModule,
    FormsModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatToolbarModule, MatSidenavModule, MatButtonToggleModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatDialogModule,
    MatTabsModule,
    RouterModule.forRoot(routes),
    MatRadioModule,
    CdkAccordionModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatCardModule
    
    
  ],
  exports:[RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
