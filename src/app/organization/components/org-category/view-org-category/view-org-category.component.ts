import { Component, OnInit } from '@angular/core';
import { OrganizationCategoryService } from '../Services/organization-category.service'
import Swal from 'sweetalert2';
import { read } from 'fs';

@Component({
  selector: 'app-view-org-category',
  templateUrl: './view-org-category.component.html',
  styleUrls: ['./view-org-category.component.scss']
})
export class ViewOrgCategoryComponent implements OnInit {

  orgCategory: any;
  finalItems: any
  constructor(private organizationService: OrganizationCategoryService) { }

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
        this.organizationService.deleteOrganizationById(id,{
          attribute : ['isDeleted'],
          value : [true]
        }).subscribe(() => {
          this.finalItems = this.finalItems.filter((item) => {
            return item.itemId !== id;
          })
        });
        Swal.fire(
          'Deleted!',
          'Your Organization Category has been deleted.',
          'success'
        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Organization Category is safe :)',
          'error'
        )
      }
    })
   
  }

  onDeactivate(id: string){
    Swal.fire({
      title: 'Are you sure you want to deactivate?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: "#DD6B55"
    }).then((result) => {
      if(result.isConfirmed) {
        // Deactivate Logic
        console.log('Deactivate');

        this.organizationService.updateOrganizationById(id, {
          attribute: ['isActivated'],
          value: [false]
        }).subscribe((data) => {
          console.log(data)
          this.finalItems = this.finalItems.map((item) => {
            if (item.itemId === id){
              item.isActivated = false;
            }

            return item;
          })
        })

        Swal.fire('Deactivated!', 'Your Organization Category has been deactivated', 'success');
      } else if(result.isDismissed) {
        Swal.fire('Cancelled!', 'Your Organization Category is not deactivated', 'error');
      }
    })
  }

  onActivate(id: string){
    Swal.fire({
      title: 'Are you sure you want to activate?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: "#DD6B55"
    }).then((result) => {
      if(result.isConfirmed) {
        // Activate Logic
        console.log('Activate');

        this.organizationService.updateOrganizationById(id, {
          attribute: ['isActivated'],
          value: [true]
        }).subscribe((data) => {
          console.log(data);

          this.finalItems = this.finalItems.map((item) => {
            if (item.itemId === id){
              item.isActivated = true;
            }

            return item;
          })
        })

        Swal.fire('Activated!', 'Your Organization Category has been activated', 'success');
      } else if(result.isDismissed) {
        Swal.fire('Cancelled!', 'Your Organization Category is not activated', 'error');
      }
    })
  }


  ngOnInit(): void {
    // Swal.showLoading();
    Swal.fire({
      title: 'Please Wait',
      allowEscapeKey: false,
      allowOutsideClick: true,
      background: '#fff',
      showConfirmButton: false,
      didOpen: ()=>{
        Swal.showLoading();
        this.organizationService.getOrganizationCategory().subscribe(responseData => {
          this.orgCategory = JSON.parse(responseData).Items
          console.log(this.orgCategory)
          let temp = []
          this.orgCategory.forEach(record => {
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
    // this.organizationService.getOrganizationCategory().subscribe(responseData => {
    //   this.orgCategory = JSON.parse(responseData).Items
    //   console.log(this.orgCategory)
    //   let temp = []
    //   this.orgCategory.forEach(record => {
    //     if (record.orgCategory) {
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


