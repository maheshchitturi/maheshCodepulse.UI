import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './Features/category/category-list/category-list.component';
import { AddCategoryComponent } from './Features/category/add-category/add-category.component';
import { AttendanceComponent } from './Features/category/attendance/attendance.component';
import { EditCategoryComponent } from './Features/category/edit-category/edit-category.component';
import { BlogPostListComponent } from './Features/blog-posts/blog-post-list/blog-post-list.component';
import { AddBlogpostComponent } from './Features/blog-posts/add-blogpost/add-blogpost.component';
import { EditBlogpostComponent } from './Features/blog-posts/edit-blogpost/edit-blogpost.component';
import { HomeComponent } from './Features/public/home/home.component';
import { BlogDetailsComponent } from './Features/public/blog-details/blog-details.component';
import { LoginComponent } from './Features/auth/login/login.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent

  },
  {
    path:'login',
    component:LoginComponent

  },
  {
    path:'blog/:url',
    component:BlogDetailsComponent
  },
  {
    path:'admin/categories',
    component:CategoryListComponent
  },
  {
    path:'admin/categories/Add',
    component:AddCategoryComponent
  },
  {
    path:'admin/categories/Attendance',
    component:AttendanceComponent
  },
  {
    path:'admin/categories/:id',
    component:EditCategoryComponent
  },
  {
    path:'admin/blog-posts',
    component:BlogPostListComponent

  },
  {
    path:'admin/blogposts/add',
    component:AddBlogpostComponent

  },
  {
    path:'admin/blogposts/:id',
    component:EditBlogpostComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
