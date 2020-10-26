import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-organization',
  templateUrl: './list-organization.component.html',
  styleUrls: ['./list-organization.component.scss']
})
export class ListOrganizationComponent implements OnInit {

  list_organization = [
    {
      id: 2376,
      name: 'Silicon',
      isDeleted: false,
      isActivated: true
    },
    {
      id: 2376,
      name: 'KIIT',
      isDeleted: false,
      isActivated: true
    },
    {
      id: 2376,
      name: 'IIIT',
      isDeleted: true,
      isActivated: false
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
