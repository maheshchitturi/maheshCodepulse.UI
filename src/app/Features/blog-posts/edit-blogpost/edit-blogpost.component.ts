import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogpostService } from '../services/blogpost.service';
import { blogpost } from '../models/blog-post.model';


@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit,OnDestroy{
  
  id:string |null=null;
  model?:blogpost;
  routeSubscription? :Subscription;
  blogposts$?: Observable<blogpost>;
  constructor(private BlogpostService:BlogpostService,private route:ActivatedRoute ) {
   
    
  }
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }
  
  ngOnInit(): void {
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
          }
        })
        console.log(this.blogposts$);
      }
      }
    })
  }
  onFormSubmit():void{

  }

}
