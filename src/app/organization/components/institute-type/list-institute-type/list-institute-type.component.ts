import { Component, OnInit } from '@angular/core';
import { InstituteTypeService} from '../Services/institute-type.service'
import { InstituteType } from '../../../../shared/models/institute-type'
import { Router } from '@angular/router';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-list-institute-type',
  templateUrl: './list-institute-type.component.html',
  styleUrls: ['./list-institute-type.component.scss']
})
export class ListInstituteTypeComponent implements OnInit {

  institute_Type : any;
  temp=[]
  finalItems : any
  constructor(private router: Router, private InstituteTypeService : InstituteTypeService) { }

  processObjUpdated(object: InstituteType){
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
          
        Swal.fire({
          title: "Please Wait",
          willOpen: () => {
            Swal.showLoading()
          },
        })
        var newObj = new InstituteType();
        newObj.isDeleted = true;
        console.log("After Deleting  -- "+ newObj)

        this.InstituteTypeService.deleteInstituteType(id, this.processObjUpdated(newObj)).subscribe(() => {
          this.finalItems = this.finalItems.filter((item) => {
            return item.institue_type !== id;
          })
          Swal.fire(
            'Deleted!',
            'Your Data has been deleted.',
            'success'
          )
        });
       
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Data is safe :)',
          'error'
        )
      }
    })

  }

  onDashboard() {
    this.router.navigate(["./org"])
  }

  onAdd() {
    this.router.navigate(["/org/add-associated-post"])
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

        var newObj = new InstituteType();
        newObj.isActivated = false;
        console.log('NEW: ', newObj);
        this.InstituteTypeService.updateInstituteTypeById(id, this.processObjUpdated(newObj)).subscribe((data) => {
          console.log(data);

          this.finalItems = this.finalItems.map((item) => {
            if (item.institue_type === id) {
              item.isActivated = false
            }

            return item;
          })
        })

        Swal.fire('Deactivated!', 'Your Data has been deactivated', 'success');
      } else if (result.isDismissed) {
        Swal.fire('Cancelled!', 'Your Data is not deactivated', 'error');
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

        var newObj = new InstituteType();
        newObj.isActivated = true;

        this.InstituteTypeService.updateInstituteTypeById(id, this.processObjUpdated(newObj)).subscribe((data) => {
          console.log(data);

          this.finalItems = this.finalItems.map((item) => {
            if (item.institue_type === id) {
              item.isActivated = true;
            }

            return item;
          })
        })

        Swal.fire('Activated!', 'Your Data has been activated', 'success');
      } else if (result.isDismissed) {
        Swal.fire('Cancelled!', 'Your Data is not activated', 'error');
      }
    })
  }

  ngOnInit(): void {
    Swal.fire({
      title: "Please Wait",
      willOpen: () => {
        Swal.showLoading()
      },
    })
    this.InstituteTypeService.getInstituteType().subscribe(responseData => {
      this.institute_Type = JSON.parse(responseData).Items
      console.log(this.institute_Type)
      Swal.close()
      let temp= []
          this.institute_Type.forEach(record => {
            if(record.isDeleted === false && record.itemId === 'INSTITUTE_TYPE'){
              temp.push(record)
            }
          })
          this.finalItems = temp
          console.log(this.finalItems)
        },
        error =>{
          console.log("Could not Fetch Data")
        })

        }
  }
    
    


    

  