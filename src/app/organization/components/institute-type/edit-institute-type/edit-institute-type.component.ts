import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import {InstituteTypeService} from '../services/institute-type.service'
import { InstituteType } from '../../../../shared/models/institute-type';

@Component({
  selector: 'app-edit-institute-type',
  templateUrl: './edit-institute-type.component.html',
  styleUrls: ['./edit-institute-type.component.scss']
})
export class EditInstituteTypeComponent implements OnInit {

  institute_type :string= '';
  id:string;

  instituteType = "MTech";

  enableButton(){
    if(this.institute_type && 
      this.institute_type.trim() === '') {
      return true
    }
    else {
      return false
    }
  }

  enableAlert(){
    const regex = /^[a-zA-Z_ ]*$/
    return regex.test(this.institute_type)
  }

  constructor(private activatedRoute: ActivatedRoute, private router: Router,private instituteTypeService:InstituteTypeService) {
  }

  processObjUpdated(object: InstituteType){
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
    if (this.instituteType !== this.institute_type) {
      var obj = new InstituteType();

      obj.instituteType = this.institute_type;

      this.instituteTypeService
        .updateInstituteTypeById(this.id, this.processObjUpdated(obj))
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
        this.router.navigate(['./org/list-institute-type']);
      }, 500);
    })
    // document.getElementById('alert').hidden = false
  }

  onView(){
    this.router.navigate(["/org/list-institute-type"])
  }
  onDashboard(){
    this.router.navigate(["./org"])
  }

  onAdd(){
    this.router.navigate(["/org/add-institute-type"])
  }

  ngOnInit(): void {
    // console.log(this.activatedRoute.snapshot.params.id)
    this.id = this.activatedRoute.snapshot.params.id;
    this.institute_type = this.activatedRoute.snapshot.params.institute_type;
  }

}
