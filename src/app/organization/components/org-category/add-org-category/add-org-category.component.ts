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
  requiredError : string = 'Organization Category cannot be blank'
  validationError : string = 'Special Characters and Numbers are not Allowed'

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

    Swal.fire({
      title: 'Please Wait',
      allowEscapeKey: false,
      allowOutsideClick: true,
      background: '#fff',
      showConfirmButton: false,
      onOpen: ()=>{
        Swal.showLoading();
        this.organizationService
          .addOrganizationCategory(orgCategoryObj)
          .subscribe((data) => {
          console.log('ID'+data);
          if(data){
            Swal.fire({
              title: 'Added',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
            }).then(()=>{
              this.router.navigate(['./org/list-org-category']);
            })  
          }
        });
        // Swal.close()
       
      }
    });

    // this.organizationService
    //     .addOrganizationCategory(orgCategoryObj)
    //     .subscribe((data) => {
    //       console.log(data);
    //     });
    
    // Swal.fire({
    //   title: 'Added',
    //   text: 'Data Added Successfully',
    //   icon: 'success',
    //   confirmButtonText: 'Ok'
    // }).then(()=>{
    //   setTimeout(() => {
    //     this.router.navigate(['./org/list-org-category']);
    //   }, 500);
    // })
  }

  ngOnInit(): void {
  }

}
