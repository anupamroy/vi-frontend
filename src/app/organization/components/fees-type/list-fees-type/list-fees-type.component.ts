import { Component, OnInit } from '@angular/core';
import { FeesService } from '../../../services/fees-type.service';
import Swal from 'sweetalert2'
import { FeesType } from 'src/app/shared/models/fees-type';

@Component({
  selector: 'app-list-fees-type',
  templateUrl: './list-fees-type.component.html',
  styleUrls: ['./list-fees-type.component.scss']
})
export class ListFeesTypeComponent implements OnInit {

  feesType: any;
  finalItems: any
  constructor(private feesService: FeesService) { }

  processObjUpdated(object: FeesType){
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
        const obj = new FeesType();
        obj.isDeleted = true;
        
        this.feesService.deleteFeesTypeById(id, this.processObjUpdated(obj)).subscribe(() => {
          this.finalItems = this.finalItems.filter((item) => {
            return item.institue_type !== id;
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

  onActivate(id: string){
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

        var newObj = new FeesType();
        newObj.isActivated = true;

        this.feesService.updateFeesTypeById(id, this.processObjUpdated(newObj)).subscribe((data) => {
          console.log(data);

          this.finalItems = this.finalItems.map((item) => {
            if (item.institue_type === id) {
              item.isActivated = true;
            }

            return item;
          })
        })

        Swal.fire('Activated!', 'Your Fees Type has been activated', 'success');
      } else if (result.isDismissed) {
        Swal.fire('Cancelled!', 'Your Fees Type is not activated', 'error');
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
      if (result.isConfirmed) {
        // Activate Logic
        console.log('Deactivate');

        var newObj = new FeesType();
        newObj.isActivated = false;

        this.feesService.updateFeesTypeById(id, this.processObjUpdated(newObj)).subscribe((data) => {
          console.log(data);

          this.finalItems = this.finalItems.map((item) => {
            if (item.institue_type === id) {
              item.isActivated = false;
            }

            return item;
          })
        })

        Swal.fire('Activated!', 'Your Fees Type has been deactivated', 'success');
      } else if (result.isDismissed) {
        Swal.fire('Cancelled!', 'Your Fees Type is not deactivated', 'error');
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
            if (record.isDeleted === false && record.itemId === 'FEES_TYPE') {
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
      }
    });
  }

}
