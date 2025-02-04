import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import {EditCategoryRequest} from '../models/edit-category-request.model'
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit,OnDestroy{
  
  id:string | null = null;
  
  category ? : Category;
  paramsSubcription?: Subscription;
  updateSubscription?: Subscription;
  DeleteSubscription?:Subscription;

  constructor(private route: ActivatedRoute,private categoryService:CategoryService,private router: Router){
    
  }
  
  ngOnInit(): void {
    this.paramsSubcription=this.route.paramMap.subscribe({
      next:(params)=>{
        this.id=params.get('id');
        if(this.id){
          this.categoryService.getCategoryById(this.id)
          .subscribe({
            next:(response)=>{

              this.category=response;
              console.log(response);
              

            }
          });
        }
      }
    })
  }
  ngOnDestroy(): void {
    this.paramsSubcription?.unsubscribe();
    this.updateSubscription?.unsubscribe();
    this.DeleteSubscription?.unsubscribe();
  }

  OnFormSubmit():void{
    //console.log(this.category)
    const updateCategoryRequest :EditCategoryRequest={
        name:this.category?.name??'',
        urlHandle:this.category?.urlHandle??''


    }
    if(this.id){
   this.updateSubscription=this.categoryService.UpdatecategoryById(this.id,updateCategoryRequest)
    .subscribe({
      next:(Response)=>{
        console.log("category updated successfully");
        this.router.navigate(['/admin/categories']);
      }
    })
  }
  
  }
  OnDelete() : void{
    
  if(this.id){
    this.DeleteSubscription=this.categoryService.DeletecategoryById(this.id)
    .subscribe({
      next:(Response)=>{
        console.log("Deleted successfully");
        this.router.navigate(['/admin/categories'])
      }
    })

  }

  }

}
