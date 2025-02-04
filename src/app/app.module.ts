import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './Core/Components/navbar/navbar.component';
import { CategoryListComponent } from './Features/category/category-list/category-list.component';
import { AddCategoryComponent } from './Features/category/add-category/add-category.component';
import { AttendanceComponent } from './Features/category/attendance/attendance.component';
import { EditCategoryComponent } from './Features/category/edit-category/edit-category.component';
import { BlogPostListComponent } from './Features/blog-posts/blog-post-list/blog-post-list.component';
import { AddBlogpostComponent } from './Features/blog-posts/add-blogpost/add-blogpost.component';
import { MarkdownModule } from 'ngx-markdown';
import { EditBlogpostComponent } from './Features/blog-posts/edit-blogpost/edit-blogpost.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryListComponent,
    AddCategoryComponent,
    AttendanceComponent,
    EditCategoryComponent,
    BlogPostListComponent,
    AddBlogpostComponent,
    EditBlogpostComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
