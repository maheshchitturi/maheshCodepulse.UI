import { afterNextRender, Component, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blogpost.model';
import { Observable, Subscription } from 'rxjs';
import { Route, Router } from '@angular/router';
import { BlogpostService } from '../services/blogpost.service';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit{

  model:AddBlogPost;
  private AddBlogpostSubscription?:Subscription;
  categories$?:Observable<Category[]>;
  

  constructor(private BlogpostService : BlogpostService,private router:Router,private CategoryService: CategoryService){
    this.model={
      title: '',
      urlHandle:'',
      shortDescriptions:'',
      content:'',
      featuredImageUrl:'',
      publishedDate:new Date(),
      author:'',
      isVisible:true,
      categories:[]
      

    }
  }
  ngOnInit(): void {
   this.categories$= this.CategoryService.getAllCategories();
    
  }
  onFormSubmit():void{
    console.log(this.model, ' mahesh')
    this.AddBlogpostSubscription=this.BlogpostService.CreateBlogPost(this.model).
    subscribe({
      next:(Response)=>{
        console.log("created blogpost successfully");
        this.router.navigate(['/admin/blog-posts']); 
      }
    })
    //console.log(this.model);


  }
  ngOnDestroy(): void {
    this.AddBlogpostSubscription?.unsubscribe();
    
  }


}
