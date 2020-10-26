import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { AssociatedPostService } from '../services/associated-post.service'
import { AssociatePost } from '../../../../shared/models/associate-post'

@Component({
  selector: 'app-list-associated-post',
  templateUrl: './list-associated-post.component.html',
  styleUrls: ['./list-associated-post.component.scss']
})
export class ListAssociatedPostComponent implements OnInit {

  associated_Post: any;
  final_items: any;

  constructor(private router: Router, private associatedPostService: AssociatedPostService) { }

  processObjUpdated(object: AssociatePost){
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
        var newObj = new AssociatePost();
        newObj.isDeleted = true;
        this.associatedPostService.deleteAssociatedPostById(id, this.processObjUpdated(newObj)).subscribe(() => {
          this.final_items = this.final_items.filter((item) => {
            return item.institue_type !== id;
          })
        });
        Swal.fire(
          'Deleted!',
          'Your Associated Post has been deleted.',
          'success'
        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Associated Post is safe :)',
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

        var newObj = new AssociatePost();
        newObj.isActivated = false;
        console.log('NEW: ', newObj);
        this.associatedPostService.updateAssociatedPostById(id, this.processObjUpdated(newObj)).subscribe((data) => {
          console.log(data);

          this.final_items = this.final_items.map((item) => {
            if (item.institue_type === id) {
              item.isActivated = false
            }

            return item;
          })
        })

        Swal.fire('Deactivated!', 'Your Associated Post has been deactivated', 'success');
      } else if (result.isDismissed) {
        Swal.fire('Cancelled!', 'Your Associated Post is not deactivated', 'error');
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

        var newObj = new AssociatePost();
        newObj.isActivated = true;

        this.associatedPostService.updateAssociatedPostById(id, this.processObjUpdated(newObj)).subscribe((data) => {
          console.log(data);

          this.final_items = this.final_items.map((item) => {
            if (item.institue_type === id) {
              item.isActivated = true;
            }

            return item;
          })
        })

        Swal.fire('Activated!', 'Your Associated Post has been activated', 'success');
      } else if (result.isDismissed) {
        Swal.fire('Cancelled!', 'Your Associated Post is not activated', 'error');
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
      didOpen: () => {
        Swal.showLoading();

        this.associatedPostService.getAssociatedPost().subscribe(responseData => {
          this.associated_Post = JSON.parse(responseData).Items
          console.log(this.associated_Post)
          let temp = []
          this.associated_Post.forEach(record => {
            if (record.isDeleted === false) {
              temp.push(record)
            }
          })
          this.final_items = temp

          Swal.close();
        }, error => {
          console.log("Could not Fetch Data")
          Swal.fire({
            text: 'Error Fetching',
            icon: 'warning'
          })
        })
      }
    })

  }


}
