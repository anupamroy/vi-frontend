import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { modelForModules } from '../model'

@Component({
  selector: 'app-edit-module',
  templateUrl: './edit-module.component.html',
  styleUrls: ['./edit-module.component.scss']
})
export class EditModuleComponent implements OnInit {

  constructor(
    private activatedRoute : ActivatedRoute, 
    private router : Router ) { }

  module : string
  oldModule : string
  modules : string[] 
  model : modelForModules

  goToDashboard(){
    this.router.navigate(['/org'])

  }
  goToView(){
    this.router.navigate(['/org/list-module'])

  }

  goToAdd(){
    this.router.navigate(['/org/add-module'])

  }

  onEdit(){
    const id = this.modules.findIndex( item => item === this.oldModule)
    console.log(this.oldModule, id, this.module)
    this.model.postModules(id, this.module)
    console.log(this.modules)
    this.router.navigate([`/org/list-module`])
  }

  ngOnInit(): void {
  this.model = new modelForModules()
   this.modules=this.model.getModules()
   console.log(this.modules)
   this.module =this.activatedRoute.snapshot.params.module
   this.oldModule = this.module
    console.log(module)

  }

}
