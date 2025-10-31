import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { BlogpostService } from '../../blog-posts/services/blogpost.service';
import { Observable } from 'rxjs';
import { blogpost } from '../../blog-posts/models/blog-post.model';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
 url:string | null=null;
blogpost$ ?: Observable<blogpost>;

  constructor(private route:ActivatedRoute,
    private blogPostService: BlogpostService
  ) {
        
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params) =>{
        this.url=params.get('url')
      }
    });

    //fetch blogdetails by url
    if(this.url){
     this.blogpost$= this.blogPostService.getBlogPostByUrlHandle(this.url);
     console.log(this.blogpost$);
    }
    

  }

}
