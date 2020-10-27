import { Component, OnInit } from '@angular/core';
import { AccountsHeadService } from '../../../services/accounts-head.service'
import { AccountsHead } from '../../../../shared/models/accounts-head'
import Swal from 'sweetalert2'
import { from } from 'rxjs';

@Component({
  selector: 'app-list-accounts-head',
  templateUrl: './list-accounts-head.component.html',
  styleUrls: ['./list-accounts-head.component.scss']
})
export class ListAccountsHeadComponent implements OnInit {

  accountsHead: any;
  finalItems: any
  constructor(private accountsHeadService: AccountsHeadService) { }

  processObjUpdated(object: AccountsHead){
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
        console.log(id);
        
        let obj = new AccountsHead();
        obj.isDeleted = true;

        this.accountsHeadService.deleteAccountsHeadById(id,this.processObjUpdated(obj)).subscribe(() => {
          this.finalItems = this.finalItems.filter((item) => {
            return item.institue_type !== id;
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

  onDeactivate(id: string) {
    Swal.fire({
      title: 'Are you sure you want to deactivate?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: "#DD6B55"
    }).then((result) => {
      if (result.isConfirmed) {
        // Deactivate Logic
        console.log('Deactivate')

        var newObj = new AccountsHead();
        newObj.isActivated = false;
        console.log('NEW: ', newObj);
        this.accountsHeadService.updateAccountsHeadById(id, this.processObjUpdated(newObj)).subscribe((data) => {
          console.log(data);

          this.finalItems = this.finalItems.map((item) => {
            if (item.institue_type === id) {
              item.isActivated = false
            }

            return item;
          })
        })

        Swal.fire('Deactivated!', 'Your Accounts Head has been deactivated', 'success');
      } else if (result.isDismissed) {
        Swal.fire('Cancelled!', 'Your Accounts Head is not deactivated', 'error');
      }
    })
  }

  onActivate(id: string) {
    Swal.fire({
      title: 'Are you sure you want to activate?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: "#DD6B55"
    }).then((result) => {
      if (result.isConfirmed) {
        // Activate Logic
        console.log('Activate');

        var newObj = new AccountsHead();
        newObj.isActivated = true;

        this.accountsHeadService.updateAccountsHeadById(id, this.processObjUpdated(newObj)).subscribe((data) => {
          console.log(data);

          this.finalItems = this.finalItems.map((item) => {
            if (item.institue_type === id) {
              item.isActivated = true;
            }

            return item;
          })
        })

        Swal.fire('Activated!', 'Your Accounts Head has been activated', 'success');
      } else if (result.isDismissed) {
        Swal.fire('Cancelled!', 'Your Accounts Head is not activated', 'error');
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
            if (record.itemId === 'ACCOUNTS_HEAD' && record.isDeleted === false) {
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
