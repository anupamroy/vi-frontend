import { Component, OnInit } from '@angular/core';
import { FeesService } from '../../../services/fees-type.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-fees-type',
  templateUrl: './list-fees-type.component.html',
  styleUrls: ['./list-fees-type.component.scss']
})
export class ListFeesTypeComponent implements OnInit {

  feesType: any;
  finalItems: any
  constructor(private feesService: FeesService) { }

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
        this.feesService.deleteFeesTypeById(id).subscribe(() => {
          this.finalItems = this.finalItems.filter((item) => {
            return item.fees_head_id !== id;
          })
        });
        Swal.fire(
          'Deleted!',
          'Your Fees type has been deleted.',
          'success'
        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Fees type is safe :)',
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
        this.feesService.getFeesType().subscribe(responseData => {
          this.feesType = JSON.parse(responseData).Items
          console.log(this.feesType)
          let temp = []
          this.feesType.forEach(record => {
            if (record.feesType) {
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
    // this.feesService.getFeesType().subscribe(responseData => {
    //   this.feesType = JSON.parse(responseData).Items
    //   console.log(this.feesType)
    //   let temp = []
    //   this.feesType.forEach(record => {
    //     if (record.feesType) {
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
