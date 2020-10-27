import { Component, OnInit } from '@angular/core';
import { PackagesService } from '../../../services/packages.service'
import Swal from 'sweetalert2'
import {Packages} from '../../../../shared/models/packages';

@Component({
  selector: 'app-list-package',
  templateUrl: './list-package.component.html',
  styleUrls: ['./list-package.component.scss']
})
export class ListPackageComponent implements OnInit {

  package : any
  finalItems : any

  packageType : string
  packageName : string
  paymentPlan : string
  packageDuration : string
  packagePrice : string
  packageDescription : string
  isTrial : boolean
  trialDuration : string
  constructor(private packageService : PackagesService) { }

  processObjUpdated(object: Packages){
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

        var newObj = new Packages();
        newObj.isActivated = false;
        console.log('NEW: ', newObj);
        this.packageService.updatePackageById(id, this.processObjUpdated(newObj)).subscribe((data) => {
          console.log(data);

          this.finalItems = this.finalItems.map((item) => {
            if (item.institue_type === id) {
              item.isActivated = false
            }

            return item;
          })
        })

        Swal.fire('Deactivated!', 'Your Package has been deactivated', 'success');
      } else if (result.isDismissed) {
        Swal.fire('Cancelled!', 'Your Package is not deactivated', 'error');
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

        var newObj = new Packages();
        newObj.isActivated = true;

        this.packageService.updatePackageById(id, this.processObjUpdated(newObj)).subscribe((data) => {
          console.log(data);

          this.finalItems = this.finalItems.map((item) => {
            if (item.institue_type === id) {
              item.isActivated = true;
            }

            return item;
          })
        })

        Swal.fire('Activated!', 'Your Package has been activated', 'success');
      } else if (result.isDismissed) {
        Swal.fire('Cancelled!', 'Your Package is not activated', 'error');
      }
    })
  }
  onDelete(id : string){
    console.log(id);
    Swal.fire({
      title: 'Are you sure you want to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: "#DD6B55"
    }).then((result) => {
      if (result.value) {
        var obj = new Packages();
        obj.isDeleted = true;
        this.packageService.deletePackagebyId(id,this.processObjUpdated(obj)).subscribe(() => {
          this.finalItems = this.finalItems.filter((item) => {
            return item.institue_type !== id;
          })
        });
        Swal.fire(
          'Deleted!',
          'Your Package has been deleted.',
          'success'
        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Package is safe :)',
          'error'
        )
      }
    })
  }

  onView(id : string) {
    this.packageService.getPackageById(id).subscribe((item)=>{
      item = JSON.parse(item);
      this.packageType = item.Items[0].packageType
      this.packageName = item.Items[0].packageName
      this.paymentPlan = item.Items[0].paymentPlan
      this.packageDuration = item.Items[0].packageDuration
      this.packagePrice = item.Items[0].packagePrice
      this.packageDescription = item.Items[0].packageDescription
      this.isTrial = item.Items[0].isTrial
      this.trialDuration = item.Items[0].trialDuration
      
      // this.accountsHead = item.accountsHead
      // this.parentAccountHead = item.parentAccountHead
      console.log(item)
      if(item) {
        Swal.fire({
          title : `Package Details`,
          html : `<hr><h5>Package Name: ${this.packageName}</h5><h5>Package Type: ${this.packageType}</h5><p>${this.packageDescription}</p><p>Payment Plan: ${this.paymentPlan}</p><p>Package Price: ${this.packagePrice}</p><p>Trial Package: ${this.isTrial}</p>`,
          showConfirmButton : true
        })
      }
    })
    // Swal.fire({
    //   title : `${this.packageName}`,
    //   html : `<h5>${this.packageType}</h5><p>${this.packageDescription}</p><p>${this.paymentPlan}</p><p>${this.packagePrice}</p>`,
    //   showConfirmButton : true
    // })
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
        this.packageService.getPackage().subscribe(responseData => {
          this.package = JSON.parse(responseData).Items
          console.log(this.package)
          let temp = []
          this.package.forEach(record => {
            if (record.isDeleted === false && record.itemId==="PACKAGE_MASTER") {
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

  }

}
