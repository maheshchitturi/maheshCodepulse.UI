import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { blogpost } from '../models/blog-post.model';
import { environment } from 'src/environments/environment';
import { AddBlogPost } from '../models/add-blogpost.model';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

  constructor(private http:HttpClient) { }

  
  getAllBlogPosts():Observable<blogpost[]> {
    
    return this.http.get<blogpost[]>(`${environment.apibaseurl}/api/Blogposts`);
  }
  CreateBlogPost(data:AddBlogPost): Observable<blogpost>{
    return this.http.post<blogpost>(`${environment.apibaseurl}/api/Blogposts`,data);
  }
  getBlogPostByID(id:string):Observable<blogpost>{
    return this.http.get<blogpost>(`${environment.apibaseurl}/api/Blogposts/${id}`);
  }
}
