import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from '../BlogPost';
const perPage=6;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  // Get posts per page
  getPosts(page, tag, category): Observable<BlogPost[]> {
    let params = {
      page: page,
      perPage: perPage.toString(),
    }

    if (tag != null || tag != undefined) {
      params["tag"] = tag;
    }

    if (category != null || category != undefined) {
      params["category"] = category;
    }

    return this.http.get<BlogPost[]>(`https://web422assigment5.herokuapp.com/api/posts`,{ params });
  }

  // Get post by id
  getPostByID(id): Observable<BlogPost> {
    return this.http.get<BlogPost>(`https://web422assigment5.herokuapp.com/api/posts/${id}`);
  }

  // Get all categories
  getCategories(): Observable<any> {
    return this.http.get<any>(`https://web422assigment5.herokuapp.com/api/categories`);
  }

  // Get tags
  getTags(): Observable<string[]> {
    return this.http.get<string[]>(`https://web422assigment5.herokuapp.com/api/tags`);
  }

}
