import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { modelForModules } from '../model'



@Component({
  selector: 'app-list-module',
  templateUrl: './list-module.component.html',
  styleUrls: ['./list-module.component.scss']
})
export class ListModuleComponent implements OnInit {
  modules : string[] 
  model : modelForModules

  constructor(private activatedRoute : ActivatedRoute, 
    private router : Router) { }

  ngOnInit(): void {
    this.model = new modelForModules()
    this.modules=this.model.getModules()

  }

}
