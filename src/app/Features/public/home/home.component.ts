import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../../blog-posts/services/blogpost.service';
import { Observable } from 'rxjs';
import { blogpost } from '../../blog-posts/models/blog-post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    blogs$?:Observable<blogpost[]>

  constructor(private blogpostSerice: BlogpostService){

  }
  ngOnInit(): void {
    this.blogs$=this.blogpostSerice.getAllBlogPosts();
   
  }
 

}
