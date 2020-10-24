import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsHeadService } from '../../../services/accounts-head.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-accounts-head',
  templateUrl: './edit-accounts-head.component.html',
  styleUrls: ['./edit-accounts-head.component.scss']
})
export class EditAccountsHeadComponent implements OnInit {

  accountsHead: string = ''
  parentAccountHead: string = ''
  id: string
  parentAccount: any
  finalItems: any

  constructor(private activatedRoute : ActivatedRoute, private router : Router, private accountsHeadService : AccountsHeadService ) { }

  enableButton() {
    if(this.accountsHead.trim() === '') {
      return true
    }
    else {
      return false
    }
  }

  enableAlert(){
    const regex = /^[a-zA-Z_ ]*$/
    return regex.test(this.accountsHead)
  }

  selectParentAccount(value){
    this.parentAccountHead = value
  }

  onClick(){
   
      console.log(this.accountsHead)
      
      Swal.fire({
        title: 'Please Wait',
        allowEscapeKey: false,
        allowOutsideClick: true,
        background: '#fff',
        showConfirmButton: false,
        onOpen: ()=>{
          Swal.showLoading();
          this.accountsHeadService
            .updateAccountsHeadById(this.id,{
              attribute: ['accountsHead','parentAccountHead'],
              value: [
              this.accountsHead,
              this.parentAccountHead
              ],
            })
            .subscribe((data) => {
            console.log('ID'+data);
            if(data){
              Swal.fire({
                title: 'Editted',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
              }).then(()=>{
                this.router.navigate(['./org/list-accounts-head']);
              })  
            }
          });
          // Swal.close()
         
        }
      });
      // this.accountsHeadService
      //   .updateAccountsHeadById(this.id, {
      //     attribute: ['accountsHead'],
      //     value: [
      //       this.accountsHead
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
      //       this.router.navigate(['./org/list-accounts-head']);
      //     }, 500);
      //   })
  }

  onAdd(){
    this.router.navigate(['./org/add-accounts-head'])
  }

  onView(){
    this.router.navigate(['./org/list-accounts-head'])
  }

  onDashboard(){
    this.router.navigate(['./org'])
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.itemId;
    this.accountsHeadService.getAccountsHeadById(this.id).subscribe((item)=>{
      item = JSON.parse(item);
      this.accountsHead = item.accountsHead
      this.parentAccountHead = item.parentAccountHead
      console.log(item)
    })
    // console.log(this.getResult);
    
    // const accountsHead =this.activatedRoute.snapshot.params.accountsHead
    // console.log(this.id, accountsHead)
    // this.accountsHead = accountsHead

    this.accountsHeadService.getAccountsHead().subscribe(responseData => {
      this.parentAccount = JSON.parse(responseData).Items
      console.log(this.parentAccount)
      let temp = []
      this.parentAccount.forEach(record => {
        if (record.accountsHead) {
          temp.push(record)
        }
      })
      this.finalItems = temp
      // Swal.close()
    },
      error => {
        console.log("Could not Fetch Data")
        // Swal.fire({
        //   text: 'Error Fetching',
        //   icon: 'warning'
        // })
      }
    )
  }

}
