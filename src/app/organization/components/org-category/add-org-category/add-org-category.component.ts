import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizationCategoryService } from '../Services/organization-category.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-org-category',
  templateUrl: './add-org-category.component.html',
  styleUrls: ['./add-org-category.component.scss']
})
export class AddOrgCategoryComponent implements OnInit {

  disableButton : boolean = true
  orgCategory : string = ''

  constructor(private router : Router, private organizationService : OrganizationCategoryService) { }

  enableButton() {
    if(this.orgCategory.trim() === '') {
      return true
    }
    else {
      return false
    }
  }

  enableAlert(){
    const regex = /^[a-zA-Z ]*$/
    return regex.test(this.orgCategory)
  }
  
  onSubmit(){
    const orgCategoryObj = {
      orgCategory : this.orgCategory,
      isActivated: true
    }

    console.log(orgCategoryObj)

    this.organizationService
        .addOrganizationCategory(orgCategoryObj)
        .subscribe((data) => {
          console.log(data);
        });
    
    Swal.fire({
      title: 'Added',
      text: 'Data Added Successfully',
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then(()=>{
      setTimeout(() => {
        this.router.navigate(['./org/list-org-category']);
      }, 500);
    })
  }

  ngOnInit(): void {
  }

}
