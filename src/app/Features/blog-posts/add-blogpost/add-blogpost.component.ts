import { afterNextRender, Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blogpost.model';
import { Observable, Subscription } from 'rxjs';
import { Route, Router } from '@angular/router';
import { BlogpostService } from '../services/blogpost.service';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { ImageService } from 'src/app/Shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit,OnDestroy{

  model:AddBlogPost;
  private AddBlogpostSubscription?:Subscription;
  categories$?:Observable<Category[]>;
   isImageSelectorVisible?:boolean=false;
   imageselectorSubscription?:Subscription;
  

  constructor(private BlogpostService : BlogpostService,
    private router:Router,private CategoryService: CategoryService,private imageService:ImageService){
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
   this.imageselectorSubscription=this.imageService.onSelectImage().subscribe({
    next:(selectedImage)=>{
      this.model.featuredImageUrl=selectedImage.url;
      this.isImageSelectorVisible=false;
    }
   })
    
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
    openImageSelector():void{
    this.isImageSelectorVisible=true;
    

  }
   closeImageSelector():void{
    this.isImageSelectorVisible=false;
    

  }
  ngOnDestroy(): void {
    this.AddBlogpostSubscription?.unsubscribe();
    this.imageselectorSubscription?.unsubscribe();
    
  }


}
