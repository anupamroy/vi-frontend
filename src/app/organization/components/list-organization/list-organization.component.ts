import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-organization',
  templateUrl: './list-organization.component.html',
  styleUrls: ['./list-organization.component.scss']
})
export class ListOrganizationComponent implements OnInit {

  list_organization = ['Silicon', 'CV Raman', 'KIIT', 'CET', 'IIIT', 'IIT', 'ITER'];

  constructor() { }

  ngOnInit(): void {
  }

}
