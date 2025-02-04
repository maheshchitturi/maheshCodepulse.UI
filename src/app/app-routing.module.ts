import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './Features/category/category-list/category-list.component';
import { AddCategoryComponent } from './Features/category/add-category/add-category.component';
import { AttendanceComponent } from './Features/category/attendance/attendance.component';

const routes: Routes = [
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
