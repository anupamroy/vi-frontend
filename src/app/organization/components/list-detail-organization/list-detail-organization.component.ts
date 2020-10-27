import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-detail-organization',
  templateUrl: './list-detail-organization.component.html',
  styleUrls: ['./list-detail-organization.component.scss']
})
export class ListDetailOrganizationComponent implements OnInit {
  id: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // console.log(this.activatedRoute.snapshot.params.id);
    this.id = this.activatedRoute.snapshot.params.id;
  }

}
