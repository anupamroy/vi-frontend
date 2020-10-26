import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

import Swal from 'sweetalert2'
import { ModuleService } from '../Services/module.service';

@Component({
  selector: 'app-list-module',
  templateUrl: './list-module.component.html',
  styleUrls: ['./list-module.component.scss']
})
export class ListModuleComponent implements OnInit {
  modules : string[] 
  finalItems : string[]

  constructor(private activatedRoute : ActivatedRoute, 
    private router : Router,
    private ModuleService : ModuleService) { }


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
            title : "Deleting Module",
            willOpen: () => {
              Swal.showLoading()        
            },     
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('Deleting Module ')
            }
            })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Module is safe :)',
            'error'
          )
        }
      })
    }
    onDeleteConfirm(id: string){
      this.ModuleService.deleteModule(id).subscribe(
        {next : resposeData =>{
        console.log(resposeData)
        if(resposeData){
          Swal.fire(
            'Deleted!',
            'Module has been deleted.',
            'success'
          )
        }
  
        this.finalItems = this.finalItems.filter((item) => {
          // return item.itemId !== id;
        })
      },
        error : error => {
          console.log(error)
        }
    })
    }

  ngOnInit(): void {
    this.ModuleService.getModules().subscribe(responseData => {
      this.modules = JSON.parse(responseData).Items
      console.log(this.modules)
      let temp= []
          this.modules.forEach(record => {
            // if(record.module){
            //   temp.push(record)
            // }
          })
          this.finalItems = temp
        },
        error =>{
          
          console.log("Could not Fetch Data")
        })
    

  }

}
