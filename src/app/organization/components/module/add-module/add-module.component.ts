import { Component, OnInit } from '@angular/core';
import {ModuleService} from '../Services/module.service'
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router'
import {Module} from '../../../../shared/models/module'



@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.scss']
})
export class AddModuleComponent implements OnInit {

  constructor(  private router: Router,
    private ModuleService : ModuleService) { }

  parentModule =''
  moduleName =''
  connectedModules =''
  showButton : boolean = false
  showAlert : boolean = false

  enableButton() {
    if(this.moduleName.trim()==='' || this.connectedModules.trim() === ''  ){
      this.showAlert = true
      this.showButton = false
    }
    else {
    this.showAlert = false
    this.showButton = true
    }
    
    if( !this.parentModule
      || !this.moduleName || !this.connectedModules ){
        this.showAlert = true
        this.showButton = false
      
    }
    else{
      
      this.showButton = true
      this.showAlert = false
    }
    
  
    console.log(this.showButton , this.showAlert)
    
    
  }

  enableAlert(){
    const regex = /^[a-zA-Z_ ]*$/
    const parent = regex.test(this.parentModule)
    const name = regex.test(this.moduleName)
    const connected = regex.test(this.connectedModules)
    if(parent == true && name==true && connected == true){
      return false
    } else {
      return true
    }
  }

  

  onSubmit() {

    const moduleObj = new Module()
    moduleObj.parentModule=this.parentModule
    moduleObj.moduleName = this.moduleName
    moduleObj.connectedModules = this.connectedModules
    moduleObj.isDeleted = false
    moduleObj.isActivated = true
    console.log(module)
    Swal.fire({
        title: "Please Wait",
        willOpen: () => {
          Swal.showLoading()
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
        }
      })

    this.ModuleService.postModule(moduleObj)
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
