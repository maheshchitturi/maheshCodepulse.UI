import { Category } from "../../category/models/category.model";

export interface AddBlogPost{
    title:string;
    urlHandle:string;
    shortDescriptions:string;
    content:string;
    featuredImageUrl:string;
    publishedDate:Date;
    author:string;
    isVisible:boolean;
    categories:string[];

}