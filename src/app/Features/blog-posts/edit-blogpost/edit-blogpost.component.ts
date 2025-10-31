import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogpostService } from '../services/blogpost.service';
import { blogpost } from '../models/blog-post.model';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { UpdateBlogPost } from '../models/update-blogpost.model';
import { ImageService } from 'src/app/Shared/components/image-selector/image.service';


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
  blogpostSubscription? :Subscription;
  selectedCategories?: string [];
  updateSubscription? :Subscription;
  DeleteSubscription?:Subscription;
  imageSelectSubscription? :Subscription;
  isImageSelectorVisible?:boolean=false;
 
  constructor(private BlogpostService:BlogpostService,private route:ActivatedRoute,private categoryService:CategoryService,
    private router:Router,private imageService:ImageService
  ) {
   
    
  }
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateSubscription?.unsubscribe();
    this.blogpostSubscription?.unsubscribe();
    this.DeleteSubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }
  
  ngOnInit(): void {
   this.categories$= this.categoryService.getAllCategories();
   this.routeSubscription= this.route.paramMap.subscribe({
      next:(params)=>{
        this.id=params.get('id');
      //get blogpost by id
      if(this.id){
        this.blogpostSubscription=this.BlogpostService.getBlogPostByID(this.id)
        .subscribe({
          next:(Response)=>{
            console.log(Response)
            this.model=Response;
            this.selectedCategories=Response.categories.map(x=>x.id);
          }
        })
        //console.log(this.blogposts$);
      }
      this.imageSelectSubscription=this.imageService.onSelectImage().subscribe({
        next:(Response)=>{
          if(this.model){
            this.model.featuredImageUrl=Response.url;
            this.isImageSelectorVisible=false;
          }
        }
      })
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
       categories :this.selectedCategories ?? []


      };
      this.updateSubscription=this.BlogpostService.UpdateBlogPostById(this.id,UpdateBlogPost)
        .subscribe({
          next:(Response)=>{
            this.router.navigateByUrl('/admin/blog-posts');
          }
    })

    }
  }
  openImageSelector():void{
    this.isImageSelectorVisible=true;
    

  }
   closeImageSelector():void{
    this.isImageSelectorVisible=false;
    

  }
  onDelete():void{
    if(this.id){
      this.DeleteSubscription=this.BlogpostService.DeleteBlogPostById(this.id)
      .subscribe({
        next:(Response)=>{
          this.router.navigateByUrl('/admin/blog-posts');
          console.log('deleted Successfully');
        }
      })
    }
  }
}
