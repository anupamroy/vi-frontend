import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeesService } from '../../../services/fees-type.service'
import { FeesType } from '../../../../shared/models/fees-type';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-fees-type',
  templateUrl: './edit-fees-type.component.html',
  styleUrls: ['./edit-fees-type.component.scss']
})
export class EditFeesTypeComponent implements OnInit {

  feesType: string = '';
  id: string;

  constructor(private activatedRoute : ActivatedRoute, private router : Router, private feesService : FeesService ) { }

  enableButton() {
    if(this.feesType.trim() === '') {
      return true
    }
    else {
      return false
    }
  }

  enableAlert(){
    const regex = /^[a-zA-Z_ ]*$/
    return regex.test(this.feesType)
  }

  processObjUpdated(object: FeesType){
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
      Swal.fire({
        title: 'Please Wait',
        allowEscapeKey: false,
        allowOutsideClick: true,
        background: '#fff',
        showConfirmButton: false,
        onOpen: ()=>{
          Swal.showLoading();
          var obj = new FeesType();
          obj.feesType = this.feesType;
          this.feesService
            .updateFeesTypeById(this.id, this.processObjUpdated(obj))
            .subscribe((data) => {
            if(data){
              Swal.fire({
                title: 'Edited',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
              }).then(()=>{
                this.router.navigate(['./org/list-fees-type']);
              })  
            }
          });
        }
      });
  }

  onAdd(){
    this.router.navigate(['./org/add-fees-type'])
  }

  onView(){
    this.router.navigate(['./org/list-fees-type'])
  }

  onDashboard(){
    this.router.navigate(['./org'])
  }

  ngOnInit(): void {
    // console.log(this.activatedRoute.snapshot.params.itemId);
    this.id = this.activatedRoute.snapshot.params.id;
  }

}
