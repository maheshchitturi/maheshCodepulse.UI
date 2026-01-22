import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';

import { Observable, retry } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { environment } from 'src/environments/environment';
import { Attendance } from '../models/attendance.model';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { EditCategoryRequest } from '../models/edit-category-request.model';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apibaseurl}/api/Categories`);
  }
 
  getAttendance(): Observable<Attendance[]> {
   return this.http.get<Attendance[]>('https://ta-prod.akriviahcm.com/daily-crons/getAllPunches/akrivia/2025-01-24');
  }
  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${environment.apibaseurl}/api/Categories/${id}`)
  }
   addCategory(model: AddCategoryRequest): Observable<void> {
    return this.http.post<void>(`${environment.apibaseurl}/api/Categories`, model,
      {headers:{ 
        'Authorization': this.cookieService.get('Authorization')
       }}
    );


  }
  UpdatecategoryById(id: string, model: EditCategoryRequest): Observable<Category> {
    return this.http.put<Category>(`${environment.apibaseurl}/api/Categories/${id}`, model, {headers:{ 
        'Authorization': this.cookieService.get('Authorization')
       }})

  }
  DeletecategoryById(id: string): Observable<Category> {
    return this.http.delete<Category>(`${environment.apibaseurl}/api/Categories/${id}`, {headers:{ 
        'Authorization': this.cookieService.get('Authorization')
       }})
  }

}
