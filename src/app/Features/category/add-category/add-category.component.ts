import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent  implements OnDestroy{ 
  model:AddCategoryRequest;
  private AddcategorySubscription?: Subscription 

  constructor(private categoryservice : CategoryService, private router: Router){
    this.model={
      name:'',
      urlHandle:''
    }
  }
 

  OnFormSubmit(){
    //console.log('hi'+"mahesh")
    this.AddcategorySubscription= this.categoryservice.addCategory(this.model)
    .subscribe({
      next :(Response)=>{
        console.log('category was added successfully');
        this.router.navigate(['/admin/categories']); 
         
      }
    })
    
  }
 

  ngOnDestroy(): void {
    this.AddcategorySubscription?.unsubscribe();
    
  }

}
