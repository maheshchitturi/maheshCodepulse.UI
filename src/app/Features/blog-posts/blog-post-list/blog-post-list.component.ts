import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { blogpost } from '../models/blog-post.model';
import { BlogpostService } from '../services/blogpost.service';


@Component({
  selector: 'app-blog-post-list',
  templateUrl: './blog-post-list.component.html',
  styleUrls: ['./blog-post-list.component.css']
})
export class BlogPostListComponent {

  blogposts$?: Observable<blogpost[]>;

  constructor(private BlogpostService:BlogpostService){}

  ngOnInit():void{
    console.log('hi');
    this.blogposts$=this.BlogpostService.getAllBlogPosts();
    this.blogposts$.subscribe({
      next: (response) => {
        console.log('API Response:', response);  // Log the response data
        // Here you can assign the response to a local variable or do any other logic
        // this.categories = response;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);  // Log any error
      }
    });

  }

}
