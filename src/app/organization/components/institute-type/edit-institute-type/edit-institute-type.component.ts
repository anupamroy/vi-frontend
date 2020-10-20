import { NumberFormatStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Validations} from '../../../../shared/Services/Validations'



@Component({
  selector: 'app-edit-institute-type',
  templateUrl: './edit-institute-type.component.html',
  styleUrls: ['./edit-institute-type.component.scss']
})
export class EditInstituteTypeComponent implements OnInit {
  oldInstituteType = "MTech"
  newInstituteType = ""
  id = ""
  
  validations : any
  disabledButton : boolean = false
  showMessage : boolean = false
  message : string
  class : string = ""

  constructor(private activatedRoute : ActivatedRoute, private router : Router ) { }
  onEditInstituteType( event : Event ){
    
    const validationResult = this.validations.validateName(this.newInstituteType)
    console.log(validationResult)
    if(validationResult ){
      this.disabledButton = false
      this.showMessage = false
    }
    else {
      if(this.newInstituteType.trim() === ''){
        this.disabledButton = true
        this.showMessage = true
        this.class = 'alert alert-danger'
        this.message = 'Institute Type Can Not Be Blank'
      } else{
        this.disabledButton=true
        this.showMessage = true
        this.class = 'alert alert-danger'
        this.message = 'Numbers And  Special Characters Are Not Allowed . '

      }
      
    }
    
    this.newInstituteType = (<HTMLInputElement>event.target).value

  }
  goToView(){
    this.router.navigate(['/org/list-institute-type'])
  }
  goToAdd(){
    this.router.navigate(['/org/add-institute-type'])
  }
  goToDashboard(){
    this.router.navigate(['/org'])
  }

  onClick(){
    console.log(this.newInstituteType)
   
      this.showMessage = true
      this.class = 'alert alert-success'
      this.message = 'Institute Type Updated Successfully'
      if(this.oldInstituteType !== this.newInstituteType)
      {
        console.log(this.oldInstituteType, this.newInstituteType)
  
        fetch(`https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/org/${this.id}`, {
          method : 'PUT',
          body : JSON.stringify({
            "attribute" : ["instituteType"],
            "value" : [this.newInstituteType]
          })
        })
        .then( result => {
          console.log(result)
          this.router.navigate(['/org/list-institute-type'])
        })
        .catch(err => {
          console.log(err)
        })
      }  
  }

  ngOnInit(): void {
    this.validations = new Validations()
    this.id = this.activatedRoute.snapshot.params.itemId;
    const instituteType =this.activatedRoute.snapshot.params.instituteType
    console.log(this.id, instituteType)
    this.newInstituteType = instituteType
  }

}
