import { Component, OnInit } from '@angular/core';
import { InstituteTypeService} from '../Services/institute-type.service'
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
  constructor(private InstituteTypeService : InstituteTypeService) { }

  showDeleteAlert(id: string){
    let itemId =id
    Swal.fire({
      title: 'Are you sure you want to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.onDeleteConfirm(itemId)
        Swal.fire({
          title : "Deleting Institute Type",
          willOpen: () => {
            Swal.showLoading()        
          },     
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('Adding Institute Type ')
          }
          })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Institute Type is safe :)',
          'error'
        )
      }
    })
  }
  onDeleteConfirm(id: string){
    this.InstituteTypeService.deleteInstituteType(id, {
      attribute: ['isDeleted'],
      value: [true]
    }).subscribe(
      {next : resposeData =>{
      console.log(resposeData)
      if(resposeData){
        Swal.fire(
          'Deleted!',
          'Institute Type has been deleted.',
          'success'
        )
      }

      this.finalItems = this.finalItems.filter((item) => {
        return item.itemId !== id;
      })
    },
      error : error => {
        console.log(error)
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
        console.log('Deactivate')
        this.InstituteTypeService.updateInstituteTypeById(id, {
          attribute: ['isActivated'],
          value: [false]
        }).subscribe((data) => {
          console.log(data);

          this.finalItems = this.finalItems.map((item) => {
            if (item.itemId === id){
              item.isActivated = false;
            }

            return item;
          })
        })

        Swal.fire('Deactivated!', 'Your Institute Type has been deactivated', 'success');
      } else if(result.isDismissed) {
        Swal.fire('Cancelled!', 'Your Institiute Type is not deactivated', 'error');
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

        this.InstituteTypeService.updateInstituteTypeById(id, {
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

        Swal.fire('Activated!', 'Your Institute Type has been activated', 'success');
      } else if(result.isDismissed) {
        Swal.fire('Cancelled!', 'Your Institute Type is not activated', 'error');
      }
    })
  }

  ngOnInit(): void {
    this.InstituteTypeService.getInstituteType().subscribe(responseData => {
      this.institute_Type = JSON.parse(responseData).Items
      console.log(this.institute_Type)
      let temp= []
          this.institute_Type.forEach(record => {
            if(record.isDeleted === false){
              temp.push(record)
            }
          })
          this.finalItems = temp
        },
        error =>{
          console.log("Could not Fetch Data")
        })

        }
  }
    
    


    

  //   fetch('https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/org/all')
  //   .then( res=> res.json())
  //   .then( res => {
  //     this.institute_Type = JSON.parse(res).Items;
  //     console.log(this.institute_Type)

  //     let temp= []
  //     this.institute_Type.forEach(record => {
  //       if(record.instituteType){
  //         temp.push(record)
  //       }
  //     })
  //     this.finalItems = temp
  //   })
  //   .catch(err => console.log(err))
  // }

  

  //   fetch(`https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/org/${id}`, {
  //     method: 'DELETE'
  //   }).then((res) => {
  //     console.log(res)

  //     this.finalItems = this.finalItems.filter((item) => {
  //       return item.itemId !== id;
  //     })
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // }
  
    


