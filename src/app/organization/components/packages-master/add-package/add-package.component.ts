import { Component, OnInit } from '@angular/core';
import { ModelForPackage } from '../model';
import { PackagesService } from '../../../services/packages.service'
import { Router } from '@angular/router';
import {Packages} from '../../../../shared/models/packages';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.scss']
})
export class AddPackageComponent implements OnInit {
  packageType : string = 'Choose'
  packageName : string
  paymentPlan : string ='Choose'
  packageDuration : string
  packagePrice : string
  packageDescription : string = ''
  isTrial : boolean = false
  trialDuration : string = ''

  package : ModelForPackage

  packageTypeArray : string[]
  paymentPlanArray : string[]


  constructor(private packageService : PackagesService, private router : Router) { }


  requiredTrialDuration(): boolean{
    // console.log(this.isTrial);
    
    if(this.isTrial){
      if(this.trialDuration.trim()==='')
        return true
      else
        return false
    } else 
        return false
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

  requiredPackageValidator(): boolean{
    if(this.packageName.trim()==='')
      return false;
    else
      return true;
  }
  requiredDurationValidator(): boolean{
    if(this.packageDuration.trim()==='')
      return false;
    else
      return true;
  }
  requiredPriceValidator(): boolean{
    if(this.packagePrice.trim()==='')
      return false;
    else
      return true;
  }
  onSubmit(){
    // console.log(document.getElementById('trialPackage').contains);
    
    let obj = new Packages();
    
    obj.packageType = this.packageType;
    obj.packageName = this.packageName;
    obj.paymentPlan = this.paymentPlan;
    obj.packageDuration = this.packageDuration;
    obj.packagePrice = this.packagePrice;
    obj.packageDescription = this.packageDescription;
    obj.isTrial = this.isTrial;
    obj.trialDuration = this.trialDuration;
    obj.isActivated = true;
    obj.isDeleted = false;
    
    console.log(obj);
    this.packageService.addPackage(obj).subscribe((data)=> {
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
