import { Component, OnInit } from '@angular/core';
import { ModelForPackage } from '../model';
import { PackagesService } from '../../../services/packages.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.scss']
})
export class AddPackageComponent implements OnInit {
  packageType : string = 'Choose'
  packageName : string
  paymentPlan : string = 'Choose'
  packageDuration : string
  packagePrice : string
  packageDescription : string = ''
  isTrial : boolean = false
  trialDuration : string = ''

  package : ModelForPackage

  packageTypeArray : string[]
  paymentPlanArray : string[]


  constructor(private packageService : PackagesService, private router : Router) { }

  validatePackageName() : boolean {
    const regex = /^[a-zA-Z0-9' -]+$/;
    return regex.test(this.packageName)
  }

  requiredTrialDuration(): boolean{
    // console.log(this.isTrial);
    
    if(this.isTrial){
      if(this.trialDuration.trim()==='')
        return true
    } else 
        return false
  }

  requiredPackageDuration(){
    this.validatePackageName();
    const regex = /^(\w+\S*)$/
    return regex.test(this.packageDuration)

  }

  requiredPackagePrice(){
    const regex = /^(\w+\S*)$/
    return regex.test(this.packagePrice)
  }

  paymentPlanOnChange(event:any){
    console.log(event.target.value);
    
    this.paymentPlan = event.target.value
  }
  packageTypeOnChange(event:any){
    this.packageType = event.target.value
  }
  
  checkBoxOnChange(event:any) {
    console.log('checkBox: '+this.isTrial);
    
    // console.log(document.getElementById('trialPackage'));
    // console.log('Value of checkbox'+event.target.value)
  }

  onSubmit(){
    // console.log(document.getElementById('trialPackage').contains);
    
    this.package = {
      packageType : this.packageType,
      packageName : this.packageName,
      paymentPlan : this.paymentPlan,
      packageDuration : this.packageDuration,
      packagePrice : this.packagePrice,
      packageDescription : this.packageDescription,
      isTrial : this.isTrial,
      trialDuration : this.trialDuration,
      isActivated : true,
      isDeleted : false
    }
    console.log(this.package);
    this.packageService.addPackage(this.package).subscribe((data)=> {
      console.log(data);
      if(data) {
        this.router.navigate(['./org/list-packages'])
      }
      
    })
    
  }
  ngOnInit(): void {
    this.packageTypeArray = this.packageService.getPackageType()
    console.log(this.packageTypeArray)
    this.paymentPlanArray = this.packageService.getPaymentPlan()
    console.log(this.paymentPlanArray);
  }

}
