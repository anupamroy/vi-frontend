import { Component, OnInit } from '@angular/core';
import { PackagesService } from '../../../services/packages.service'
import Swal from 'sweetalert2'

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
        this.packageService.deletePackagebyId(id).subscribe(() => {
          this.finalItems = this.finalItems.filter((item) => {
            return item.itemId !== id;
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
      this.packageType = item.packageType
      this.packageName = item.packageName
      this.packageDuration = item.packageDuration
      this.packagePrice = item.packagePrice
      this.packageDescription = item.packageDescription
      this.isTrial = item.isTrial
      this.trialDuration = item.trialDuration
      this.paymentPlan = item.paymentPlan
      
      // this.accountsHead = item.accountsHead
      // this.parentAccountHead = item.parentAccountHead
      console.log(item)
      if(item) {
        Swal.fire({
          title : `Package Name: ${this.packageName}`,
          html : `<h5>Package Type: ${this.packageType}</h5><p>${this.packageDescription}</p><p>Payment Plan: ${this.paymentPlan}</p><p>Package Price: ${this.packagePrice}</p>`,
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
            if (record.isDeleted === false) {
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
