import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeesService } from '../../../services/fees-type.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-fees-type',
  templateUrl: './edit-fees-type.component.html',
  styleUrls: ['./edit-fees-type.component.scss']
})
export class EditFeesTypeComponent implements OnInit {

  feesType: string = ''
  id: string

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

  onClick(){
   
      console.log(this.feesType)
      Swal.fire({
        title: 'Please Wait',
        allowEscapeKey: false,
        allowOutsideClick: true,
        background: '#fff',
        showConfirmButton: false,
        onOpen: ()=>{
          Swal.showLoading();
          this.feesService
            .updateFeesTypeById(this.id,{
              attribute: ['feesType'],
              value: [
              this.feesType
              ],
            })
            .subscribe((data) => {
            console.log('ID'+data);
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
          // Swal.close()
         
        }
      });
      // this.feesService
      //   .updateFeesTypeById(this.id, {
      //     attribute: ['feesType'],
      //     value: [
      //       this.feesType
      //     ],
      //   })
      //   .subscribe((data) => {
      //     console.log(data);
      //   });
        
      //   Swal.fire({
      //     title: 'Editted',
      //     text: 'Data Editted Successfully',
      //     icon: 'success',
      //     confirmButtonText: 'Ok'
      //   }).then(()=>{
      //     setTimeout(() => {
      //       this.router.navigate(['./org/list-fees-type']);
      //     }, 500);
      //   })
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
    this.id = this.activatedRoute.snapshot.params.itemId;
    this.feesService.getFeesTypeById(this.id).subscribe((item)=>{
      item = JSON.parse(item);
      this.feesType = item.feesType
      console.log(item)
    })
    // const feesType =this.activatedRoute.snapshot.params.feesType
    // console.log(this.id, feesType)
    // this.feesType = feesType
  }

}
