import { Component, OnInit } from '@angular/core';
import {ModuleService} from '../Services/module.service'
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router'



@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.scss']
})
export class AddModuleComponent implements OnInit {

  constructor(     private router: Router,
    private ModuleService : ModuleService) { }

  parentModule = ""
  moduleName = ""
  connectedModules = ""

  enableButton() {
    if(this.parentModule.trim() === ''
      || this.moduleName.trim() === ''
      || this.connectedModules.trim() === '') {
      return true
    }
    else {
      return false
    }
  }

  enableAlert(){
    const regex = /^[a-zA-Z_ ]*$/
    const parent = regex.test(this.parentModule)
    const name = regex.test(this.moduleName)
    const connected = regex.test(this.connectedModules)
    if(parent == true && name==true && connected == true){
      return true
    } else {
      return false
    }
  }

  

  onSubmit() {
    
    const module = {
      parentModule : this.parentModule,
      moduleName : this.moduleName,
      connectedModules :this.connectedModules
    }
    console.log(module)
    Swal.fire({
        title: "Adding Module",
        willOpen: () => {
          Swal.showLoading()
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
        }
      })

    this.ModuleService.postModule(module)
        .subscribe({
          next: responseData => {
            console.log(responseData)
            if (responseData) {
              Swal.fire(
                'Congratulations!',
                'Module  has been added',
                'success'
              ).then(result => {
                this.router.navigate(['/org/list-module'])

              })
            }

          },
          error: error => {
            Swal.fire(
              'Error!',
              'Could not add Module',
              'error'
            )
            console.log(error)
          }
        })
    }


  ngOnInit(): void {
    
  }

}
