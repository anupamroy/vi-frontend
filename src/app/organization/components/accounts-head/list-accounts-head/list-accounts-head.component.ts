import { Component, OnInit } from '@angular/core';
import { AccountsHeadService } from '../../../services/accounts-head.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-accounts-head',
  templateUrl: './list-accounts-head.component.html',
  styleUrls: ['./list-accounts-head.component.scss']
})
export class ListAccountsHeadComponent implements OnInit {

  accountsHead: any;
  finalItems: any
  constructor(private accountsHeadService: AccountsHeadService) { }

  onDelete(id: string) {

    Swal.fire({
      title: 'Are you sure you want to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: "#DD6B55"
    }).then((result) => {
      if (result.value) {
        this.accountsHeadService.deleteAccountsHeadById(id).subscribe(() => {
          this.finalItems = this.finalItems.filter((item) => {
            return item.accounts_head_id !== id;
          })
        });
        Swal.fire(
          'Deleted!',
          'Your Accounts Head has been deleted.',
          'success'
        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Accounts Head is safe :)',
          'error'
        )
      }
    })
   
  }


  ngOnInit(): void {
    Swal.fire({
      title: 'Please Wait',
      allowEscapeKey: false,
      allowOutsideClick: true,
      background: '#fff',
      showConfirmButton: false,
      didOpen: ()=>{
        Swal.showLoading();
        this.accountsHeadService.getAccountsHead().subscribe(responseData => {
          this.accountsHead = JSON.parse(responseData).Items
          console.log(this.accountsHead)
          let temp = []
          this.accountsHead.forEach(record => {
            if (record.accountsHead) {
              temp.push(record)
            }
          })
          this.finalItems = temp
          Swal.close()
        },
          error => {
            console.log("Could not Fetch Data")
            Swal.fire({
              text: 'Error Fetching',
              icon: 'warning'
            })
          }
        )
       
        
        // this.router.navigate(['./org/list-org-category']);
        // Swal.close()

      }

      // timer: 3000,
      // timerProgressBar: true
    });

    // this.accountsHeadService.getAccountsHead().subscribe(responseData => {
    //   this.accountsHead = JSON.parse(responseData).Items
    //   console.log(this.accountsHead)
    //   let temp = []
    //   this.accountsHead.forEach(record => {
    //     if (record.accountsHead) {
    //       temp.push(record)
    //     }
    //   })
    //   this.finalItems = temp
    // },
    //   error => {
    //     console.log("Could not Fetch Data")
    //   }
    // )

  }

}
