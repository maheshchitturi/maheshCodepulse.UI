import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories$? : Observable<Category[]>;
  //categories?: Category[]
  constructor(private categoryService: CategoryService){}

  ngOnInit(): void {
    this.categories$=this.categoryService.getAllCategories();
    this.categories$.subscribe({
      next: (response) => {
        console.log('API Response:', response);  // Log the response data
        // Here you can assign the response to a local variable or do any other logic
        // this.categories = response;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);  // Log any error
      }
    });
    //console.log(this.categories$);
   
  }

}
