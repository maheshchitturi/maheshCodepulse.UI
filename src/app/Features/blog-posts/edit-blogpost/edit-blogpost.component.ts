import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogpostService } from '../services/blogpost.service';
import { blogpost } from '../models/blog-post.model';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { UpdateBlogPost } from '../models/update-blogpost.model';


@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit,OnDestroy{
  
  id:string |null=null;
  model?:blogpost;
  categories$?: Observable<Category[]>;
  routeSubscription? :Subscription;
  selectedCategories?:string[];
 
  constructor(private BlogpostService:BlogpostService,private route:ActivatedRoute,private categoryService:CategoryService) {
   
    
  }
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }
  
  ngOnInit(): void {
   this.categories$= this.categoryService.getAllCategories();
   this.routeSubscription= this.route.paramMap.subscribe({
      next:(params)=>{
        this.id=params.get('id');
      //get blogpost by id
      if(this.id){
        this.BlogpostService.getBlogPostByID(this.id)
        .subscribe({
          next:(Response)=>{
            console.log(Response)
            this.model=Response;
            this.selectedCategories=Response.categories.map(x=>x.id);
          }
        })
        //console.log(this.blogposts$);
      }
      }
    })
  }
  onFormSubmit():void{
//convert this model to request object
    if(this.model && this.id){
      var UpdateBlogPost:UpdateBlogPost={
        author:this.model.author,
       shortDescriptions:this.model.shortDescriptions,
       urlHandle:this.model.urlHandle,
       isVisible:this.model.isVisible,
       content:this.model.content,
       featuredImageUrl:this.model.featuredImageUrl,
       publishedDate:this.model.publishedDate,
       title:this.model.title,
       categories:this.selectedCategories ?? []


    };
    
  }

}
