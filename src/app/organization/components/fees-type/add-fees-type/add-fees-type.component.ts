import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeesService } from '../../../services/fees-type.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-fees-type',
  templateUrl: './add-fees-type.component.html',
  styleUrls: ['./add-fees-type.component.scss']
})
export class AddFeesTypeComponent implements OnInit {

  disableButton : boolean = true
  feesType : string = ''

  constructor(private router : Router, private feesService : FeesService) { }

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
    const feesTypeObj = {
      feesType : this.feesType
    }

    console.log(feesTypeObj)

    Swal.fire({
      title: 'Please Wait',
      allowEscapeKey: false,
      allowOutsideClick: true,
      background: '#fff',
      showConfirmButton: false,
      onOpen: ()=>{
        Swal.showLoading();
        this.feesService
          .addFeesType(feesTypeObj)
          .subscribe((data) => {
          console.log('ID'+data);
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
        // Swal.close()
       
      }
    });

    // this.feesService
    //     .addFeesType(feesTypeObj)
    //     .subscribe((data) => {
    //       console.log('hello'+data);
    //     });

        // fetch('https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/fees', {
        //   method: 'POST',
        //   body: JSON.stringify(feesTypeObj),
        // })
        //   .then((data) => {
        //     // this.router.navigate(['/fees-management/fees-type']);
        //   })
        //   .catch((err) => {
        //     console.error(err);
        //   });
    
    // Swal.fire({
    //   title: 'Added',
    //   text: 'Data Added Successfully',
    //   icon: 'success',
    //   confirmButtonText: 'Ok'
    // }).then(()=>{
    //   setTimeout(() => {
    //     this.router.navigate(['./org/list-fees-type']);
    //   }, 500);
    // })
  }

  ngOnInit(): void {
  }

}
