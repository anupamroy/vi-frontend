import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FeesService } from '../../../services/fees-type.service';
import { FeesType } from '../../../../shared/models/fees-type';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-fees-type',
  templateUrl: './add-fees-type.component.html',
  styleUrls: ['./add-fees-type.component.scss']
})
export class AddFeesTypeComponent implements OnInit {

  disableButton : boolean = true
  feesType : string = ''

  constructor(private router : Router, private feesService : FeesService, private activatedRoute: ActivatedRoute) { }

  enableButton() {
    if(this.feesType.trim() === '') {
      return true
    }
    else {
      return false
    }
  }

  enableAlert(){
    const regex = /^[a-zA-Z ]*$/
    return regex.test(this.feesType)
  }
  
  onSubmit(){
    const obj = new FeesType();
    obj.feesType = this.feesType;
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
        this.feesService
          .addFeesType(obj)
          .subscribe((data) => {
          if(data){
            Swal.fire({
              title: 'Added',
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

  ngOnInit(): void {
  }

}
