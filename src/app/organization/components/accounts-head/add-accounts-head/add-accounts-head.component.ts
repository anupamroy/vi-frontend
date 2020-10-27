import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsHeadService } from '../../../services/accounts-head.service'
import { Validations } from '../../../../shared/Services/Validations'
import { AccountsHead } from '../../../../shared/models/accounts-head'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-accounts-head',
  templateUrl: './add-accounts-head.component.html',
  styleUrls: ['./add-accounts-head.component.scss']
})
export class AddAccountsHeadComponent implements OnInit {

  disableButton : boolean = true
  parentAccountHead : string = 'None'
  accountsHead : string = ''
  validate: Validations
  finalItems: any
  parentAccount: any

  constructor(private router : Router, private accountsHeadService : AccountsHeadService) { }

  enableButton() {
    if(this.accountsHead.trim() === '') {
      return true
    }
    else {
      return false
    }
  }

  enableAlert(){
    const regex = /^[a-zA-Z ]*$/
    return regex.test(this.accountsHead)
  }

  selectParentAccount(value){
    this.parentAccountHead = value
  }
  
  onSubmit(){
    // let e = (document.getElementById("parentAccountHead") as HTMLSelectElement).value
    let obj = new AccountsHead();
    obj.accountsHead = this.accountsHead
    obj.parentAccountsHead = this.parentAccountHead
    obj.isDeleted = false
    obj.isActivated = true
    // const accountsHeadObj = {
    //   accountsHead : this.accountsHead,
    //   parentAccountHead : this.parentAccountHead,
    //   isActivated: true
    // }

    console.log(obj)

    Swal.fire({
      title: 'Please Wait',
      allowEscapeKey: false,
      allowOutsideClick: true,
      background: '#fff',
      showConfirmButton: false,
      didOpen: ()=>{
        Swal.showLoading();
        this.accountsHeadService
          .addAccountsHead(obj)
          .subscribe((data) => {
          console.log('ID'+data);
          if(data){
            Swal.fire({
              title: 'Added',
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
    //     .addAccountsHead(accountsHeadObj)
    //     .subscribe((data) => {
    //       console.log(data);
    //     });
    
    // Swal.fire({
    //   title: 'Added',
    //   text: 'Data Added Successfully',
    //   icon: 'success',
    //   confirmButtonText: 'Ok'
    // }).then(()=>{
    //   setTimeout(() => {
    //     this.router.navigate(['./org/list-accounts-head']);
    //   }, 500);
    // })
  }

  ngOnInit(): void {
    this.accountsHeadService.getAccountsHead().subscribe(responseData => {
      this.parentAccount = JSON.parse(responseData).Items
      console.log(this.parentAccount)
      let temp = []
      this.parentAccount.forEach(record => {
        if (record.itemId === 'ACCOUNTS_HEAD' && record.isDeleted === false) {
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
