import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import {AssociatedPostService} from '../services/associated-post.service'

@Component({
  selector: 'app-list-associated-post',
  templateUrl: './list-associated-post.component.html',
  styleUrls: ['./list-associated-post.component.scss']
})
export class ListAssociatedPostComponent implements OnInit {

  associated_Post: any;
  final_items: any;

  constructor(private router: Router,private associatedPostService:AssociatedPostService) { }

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
        this.associatedPostService.deleteAssociatedPostById(id).subscribe(()=>{
          this.final_items = this.final_items.filter((item)=>{
            return item.itemId !== id;
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

        this.associatedPostService.updateAssociatedPostById(id, {
          attribute: ['isActivated'],
          value: [false]
        }).subscribe((data) => {
          console.log(data);

          this.final_items = this.final_items.map((item) => {
            if (item.itemId === id){
              item.isActivated = false
            }

            return item;
          })
        })

        Swal.fire('Deactivated!', 'Your Associated Post has been deactivated', 'success');
      } else if(result.isDismissed) {
        Swal.fire('Cancelled!', 'Your Associated Post is not deactivated', 'error');
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

        this.associatedPostService.updateAssociatedPostById(id, {
          attribute: ['isActivated'],
          value: [true]
        }).subscribe((data) => {
          console.log(data);

          this.final_items = this.final_items.map((item) => {
            if (item.itemId === id){
              item.isActivated = true;
            }

            return item;
          })
        })

        Swal.fire('Activated!', 'Your Associated Post has been activated', 'success');
      } else if(result.isDismissed) {
        Swal.fire('Cancelled!', 'Your Associated Post is not activated', 'error');
      }
    })
  }

  ngOnInit(): void {
    this.associatedPostService.getAssociatedPost().subscribe(responseData => {
      this.associated_Post = JSON.parse(responseData).Items
      console.log(this.associated_Post)
      let temp = []
      this.associated_Post.forEach(record => {
        if (record.associated_post) {
          temp.push(record)
        }
      })
      this.final_items = temp
    },
      error => {
        console.log("Could not Fetch Data")
      }
    )


  }


}
