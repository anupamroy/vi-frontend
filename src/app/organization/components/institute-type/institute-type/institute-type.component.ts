import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Validations } from '../../../../shared/Services/Validations'


@Component({
  selector: 'app-institute-type',
  templateUrl: './institute-type.component.html',
  styleUrls: ['./institute-type.component.scss']
})
export class InstituteTypeComponent implements OnInit {
  disabledButton : boolean = true
  instituteType : string = ''
  validations : any
  showMessage : boolean = false
  message : string
  class : string = ""

  constructor( private activatedRoute : ActivatedRoute, private router : Router) { }

  onAddInstituteType( event : Event ){
    this.instituteType = (<HTMLInputElement>event.target).value
    const validationResult = this.validations.validateName(this.instituteType)
    console.log(validationResult)
    if(validationResult){
      this.disabledButton = false
      this.showMessage = false
    }
    else{
      if(this.instituteType.trim() === ''){
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

  }

  onSubmit(){
      const instituteTypeObj = {
        instituteType : this.instituteType
      }
      this.showMessage = true
      this.class = 'alert alert-success'
      this.message = 'Institute Type Added Successfully'
  
      console.log(instituteTypeObj)
  
      fetch('https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/org', {
        method : 'post',
        body : JSON.stringify(instituteTypeObj)
      })

      .then(result =>{
        
        console.log(result)
        this.router.navigate(['/org/list-institute-type'])
        })
      .catch(err => {
        console.log(err)
      })
  }

  ngOnInit(): void {
    this.validations = new Validations()
  }

}
