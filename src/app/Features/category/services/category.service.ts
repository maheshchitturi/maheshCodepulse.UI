import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { environment } from 'src/environments/environment';
import { Attendance } from '../models/attendance.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  addCategory(model: AddCategoryRequest ): Observable<void> {
    return this.http.post<void>(`${environment.apibaseurl}/api/Categories`,model);


  }
  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${environment.apibaseurl}/api/Categories`);
  }
  getAttendance(): Observable<Attendance[]>{
    return this.http.get<Attendance[]>('https://ta-prod.akriviahcm.com/daily-crons/getAllPunches/akrivia/2024-11-04');
  }
}
