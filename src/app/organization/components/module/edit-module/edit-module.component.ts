import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { ModuleService } from '../Services/module.service'
import Swal from 'sweetalert2'
import { Module } from 'src/app/shared/models/module';


@Component({
  selector: 'app-edit-module',
  templateUrl: './edit-module.component.html',
  styleUrls: ['./edit-module.component.scss']
})
export class EditModuleComponent implements OnInit {

  newParentModule = ''
  newModuleName = ''
  newConnectedModules = ''
  id = ''
  module;

  constructor(
    private activatedRoute : ActivatedRoute, 
    private router : Router,
    private ModuleService : ModuleService ) { }

  goToDashboard(){
    this.router.navigate(['/org'])

  }
  goToView(){
    this.router.navigate(['/org/list-module'])

  }

  goToAdd(){
    this.router.navigate(['/org/add-module'])

  }

  enableButton() {
    if(this.newModuleName.trim()==='' || this.newConnectedModules.trim() === ""){
      return true
    }
    if( (!this.newParentModule)
        ||  !(this.newModuleName )
      ||   (!this.newConnectedModules ) )
    
      {
      return true
    }
    else {
      return false
    }
  }

  enableAlert(){
    const regex = /^[a-zA-Z_ ]*$/
    const parent = regex.test(this.newParentModule)
    const name = regex.test(this.newModuleName)
    const connected = regex.test(this.newConnectedModules)
    if(parent == true && name==true && connected == true){
      return true
    } else {
      return false
    }
  }
  processObjUpdated(object: Module){
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

  onClick(){
    Swal.fire({
      title: "Please Wait",
      willOpen: () => {
        Swal.showLoading()
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    })
    console.log(this.id)
    
      var obj = new Module();

      obj.parentModule = this.newParentModule
      obj.moduleName = this.newModuleName
      obj.connectedModules = this.newConnectedModules
     

      this.ModuleService
        .updateModule(this.id, this.processObjUpdated(obj))
        .subscribe((data) => {
          console.log(data);
          if (data) {
            Swal.fire(
              'Congratulations!',
              'Module  has been Updated',
              'success'
            ).then(result => {
              this.router.navigate(['/org/list-module'])

            })
          }

         error => {
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
    console.log(  this.activatedRoute.queryParams)
   
    this.activatedRoute.queryParams.subscribe(
  
      (queryParams: Params) => {
        this.module = JSON.parse(queryParams.params)
        console.log(this.module)   

        
      }
      
  );
  this.id = this.module.institue_type
  this.newParentModule = this.module.parentModule
  this.newModuleName = this.module.moduleName
  this.newConnectedModules =this. module.connectedModules


  }

}
