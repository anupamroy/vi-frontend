import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { ModuleService } from '../Services/module.service'
import Swal from 'sweetalert2'


@Component({
  selector: 'app-edit-module',
  templateUrl: './edit-module.component.html',
  styleUrls: ['./edit-module.component.scss']
})
export class EditModuleComponent implements OnInit {

  newParentModule = ''
  newModuleName = ''
  newConnectedModule = ''
  id = ''

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
    if(this.newParentModule.trim() === ''
      ||this.newModuleName.trim() === ''
      || this.newConnectedModule.trim() === '') {
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
    const connected = regex.test(this.newConnectedModule)
    if(parent == true && name==true && connected == true){
      return true
    } else {
      return false
    }
  }

  onClick(){
    Swal.fire({
      title : "Updating Module",
      willOpen: () => {
        Swal.showLoading()        
      },     
    }).then((result) => {
     
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('updating Module ')
      }
      })
      const module = {
        parentModule : this.newParentModule,
        moduleName : this.newModuleName,
        connectedModule : this.newConnectedModule
      }
    
    console.log(module)
    let body = JSON.stringify({
          "attribute" : ["module"],
          "value" : [module]
        })

    this.ModuleService.updateModule(this.id, body).subscribe({
      next : responseData =>{
        console.log(responseData)
        if(responseData){
          Swal.fire(
            'Congratulations!',
            'Module has been Updated',
            'success'
          ).then(result => {
            this.router.navigate(['/org/list-module'])
          })
        }
      },
      error : error => {
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
    this.id = this.activatedRoute.snapshot.params.itemId;
    const parent =this.activatedRoute.snapshot.params.parentModule
    const name =this.activatedRoute.snapshot.params.moduleName
    const connected =this.activatedRoute.snapshot.params.connectedModule

    console.log(this.id, parent, name, connected)
    this.newParentModule = parent
    this.newModuleName = name
    this.newConnectedModule = connected

  }

}
