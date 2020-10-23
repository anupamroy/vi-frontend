import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Validations } from '../../../../shared/Services/Validations'
import { InstituteTypeService} from '../Services/institute-type.service'
import Swal from 'sweetalert2'


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

  constructor( 
    private activatedRoute : ActivatedRoute, 
    private router : Router,
    private InstituteTypeService : InstituteTypeService) { }

  onAddInstituteType( event : Event ){
    this.instituteType = (<HTMLInputElement>event.target).value
    const validationResult = this.validations.validateName(this.instituteType)
    // console.log(validationResult)
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
        Swal.fire(
          'Congratulations!',
          'Institute Type has been added',
          'success'
        )
      const instituteTypeObj = {
        instituteType : this.instituteType,
        isActivated: true
      }
      this.InstituteTypeService.postInstituteType(instituteTypeObj)
      .subscribe({
        next : responseData =>{
          console.log(responseData)
        
          this.router.navigate(['/org/list-institute-type'])
                 
        }, 
        error : error => {
          console.log(error)
        }
      })
      }
  

  ngOnInit(): void {
    this.validations = new Validations()
  }

}

