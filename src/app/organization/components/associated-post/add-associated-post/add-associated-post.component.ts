import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import Swal from 'sweetalert2'
import {AssociatedPostService} from '../services/associated-post.service'

@Component({
  selector: 'app-add-associated-post',
  templateUrl: './add-associated-post.component.html',
  styleUrls: ['./add-associated-post.component.scss']
})
export class AddAssociatedPostComponent implements OnInit {

  associatedPost: string = "";

  constructor(private router: Router,private associatedPostService:AssociatedPostService) { }

  enableButton(){
    if(this.associatedPost.trim() === '') {
      return true
    }
    else {
      return false
    }
  }

  enableAlert(){
    const regex = /^[a-zA-Z_ ]*$/
    return regex.test(this.associatedPost)
  }

  // onKey(event: any) { // without type info
  //   this.associatedPost = event.target.value;
  // }

  onClick() {
    console.log(this.associatedPost);
    const associatedPostObj = {
      associated_post : this.associatedPost
    }
    this.associatedPostService
        .addAssociatedPost(associatedPostObj)
        .subscribe((data) => {
          console.log(data);
        });
        Swal.fire({
          title: 'Added',
          text: 'Data Added Successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(()=>{
          setTimeout(() => {
            this.router.navigate(['./org/list-associated-post']);
          }, 500);
        })
    
  }

  onDashboard(){
    this.router.navigate(["./org"])
  }

  ngOnInit(): void {
  }

}
