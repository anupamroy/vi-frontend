import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import Swal from 'sweetalert2'
import {AssociatedPostService} from '../services/associated-post.service'
import { AssociatePost } from '../../../../shared/models/associate-post';

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
    const obj = new AssociatePost();

    obj.associatedPost = this.associatedPost;
    obj.isActivated = true;
    obj.isDeleted = false;

    Swal.fire({
      title: 'Please Wait',
      allowEscapeKey: false,
      allowOutsideClick: true,
      background: '#fff',
      showConfirmButton: false,
      onOpen: ()=>{
        Swal.showLoading();
        this.associatedPostService
          .addAssociatedPost(obj)
          .subscribe((data) => {
          if(data){
            Swal.fire({
              title: 'Added',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
            }).then(()=>{
              this.router.navigate(['./org/list-associated-post']);
            })  
          }
        });
      }
    })
  }

  onDashboard(){
    this.router.navigate(["./org"])
  }

  ngOnInit(): void {
  }

}
