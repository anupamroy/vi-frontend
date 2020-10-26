import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import {AssociatedPostService} from '../services/associated-post.service'
import { AssociatePost } from '../../../../shared/models/associate-post';

@Component({
  selector: 'app-edit-associated-post',
  templateUrl: './edit-associated-post.component.html',
  styleUrls: ['./edit-associated-post.component.scss']
})
export class EditAssociatedPostComponent implements OnInit {

  associated_post :string= '';
  id:string;

  instituteType = "MTech";

  enableButton(){
    if(this.associated_post && 
      this.associated_post.trim() === '') {
      return true
    }
    else {
      return false
    }
  }

  enableAlert(){
    const regex = /^[a-zA-Z_ ]*$/
    return regex.test(this.associated_post)
  }

  constructor(private activatedRoute: ActivatedRoute, private router: Router,private associatedPostService:AssociatedPostService) {
  }

  processObjUpdated(object: AssociatePost){
    var attribute = [];
    var value = [];
    for (const key in object) {
      if (key !== 'itemId') {
        attribute.push(key);
        value.push(object[key]);
      }
    }

    return {
      attribute,
      value,
      itemId: object.itemId
    }
  }

  onClick(){
    console.log(this.id)
    if (this.instituteType !== this.associated_post) {
      var obj = new AssociatePost();

      obj.associatedPost = this.associated_post;

      this.associatedPostService
        .updateAssociatedPostById(this.id, this.processObjUpdated(obj))
        .subscribe((data) => {
          console.log(data);
        });
    }
    Swal.fire({
      title: 'Edited',
      text: 'Data Edited Successfully',
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then(()=>{
      setTimeout(() => {
        this.router.navigate(['./org/list-associated-post']);
      }, 500);
    })
    // document.getElementById('alert').hidden = false
  }

  onView(){
    this.router.navigate(["/org/list-associated-post"])
  }
  onDashboard(){
    this.router.navigate(["./org"])
  }

  onAdd(){
    this.router.navigate(["/org/add-associated-post"])
  }

  ngOnInit(): void {
    // console.log(this.activatedRoute.snapshot.params.id)
    this.id = this.activatedRoute.snapshot.params.id;
    this.associated_post = this.activatedRoute.snapshot.params.associated_post;
  }

}
