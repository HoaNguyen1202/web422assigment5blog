import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPost } from '../../BlogPost';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {
  blogPost: BlogPost;
  tags: string;

 
  constructor(private data: PostService, private route: ActivatedRoute, private router: Router) { }
  private post;
  ngOnInit(): void 
  {
    this.post = this.data.getPostByID(this.route.snapshot.params['id']).subscribe(data => {

        this.tags = data.tags.toString();
        this.blogPost = data; 
      })
  }

  ngOnDestroy() {
    if (this.post) this.post.unsubscribe();
  }

  onSubmit(): void 
  {
    this.blogPost.tags = this.tags.split(',').map(tag => tag.trim());
    this.data.updatePostById(this.blogPost._id, this.blogPost).subscribe( () => this.router.navigate(['/admin']));
  }

  
  deletePost(id) 
  {
    this.data.deletePostById(id).subscribe( () => this.router.navigate(['/admin']));
  }




}
