import { Component, OnInit } from '@angular/core';
import { ModelForPackage } from '../model'
import { PackagesService } from '../../../services/packages.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-package',
  templateUrl: './edit-package.component.html',
  styleUrls: ['./edit-package.component.scss']
})
export class EditPackageComponent implements OnInit {

  packageType : string
  packageName : string
  paymentPlan : string
  packageDuration : string
  packagePrice : string
  packageDescription : string = ''
  isTrial : boolean
  trialDuration : string


  id : string

  package : ModelForPackage
  packageTypeArray : string[]
  paymentPlanArray : string[]

  constructor(private packageService : PackagesService, private router: Router, private activatedRoute : ActivatedRoute) { }

  onView(){
    this.router.navigate(['./org/list-packages'])
  }

  onAdd() {
    this.router.navigate(['./org/add-package'])
  }

  onDashboard(){
    this.router.navigate(['./org'])
  }

  paymentPlanOnChange(event:any){
    this.paymentPlan = event.target.value
  }
  packageTypeOnChange(event:any){
    this.packageType = event.target.value
  }

  onSubmit(){
    // this.package = {
    //   packageType : this.packageType,
    //   packageName : this.packageName,
    //   paymentPlan : this.packageName,
    //   packageDuration : this.packageDuration,
    //   packagePrice : this.packagePrice,
    //   packageDescription : this.packageDescription,
    //   isTrial : true,
    //   trialDuration : this.trialDuration
    // }
    // console.log(this.package);
    this.packageService.updatePackageById(this.id,{
      attribute: ['packageType','packageName','paymentPlan','packageDuration','packagePrice','packageDescription','isTrial','trialDuration'],
      value: [
      this.packageType,
      this.packageName,
      this.paymentPlan,
      this.packageDuration,
      this.packagePrice,
      this.packageDescription,
      this.isTrial,
      this.trialDuration
      ],
    }).subscribe((data)=> {
      console.log(data);
      if(data) {
        this.router.navigate(['./org/list-packages'])
      }
      
    })
    
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.itemId;
    this.packageService.getPackageById(this.id).subscribe((item)=>{
      item = JSON.parse(item);
      this.packageType = item.packageType
      this.packageName = item.packageName
      this.paymentPlan = item.paymentPlan
      this.packageDuration = item.packageDuration
      this.packagePrice = item.packagePrice
      this.packageDescription = item.packageDescription
      this.isTrial = item.isTrial
      this.trialDuration = item.trialDuration
      
      // this.accountsHead = item.accountsHead
      // this.parentAccountHead = item.parentAccountHead
      console.log(item)
    })
    // Filtering duplicates
    this.packageTypeArray = this.packageService.getPackageType().filter((item)=>{
      
    })
    this.paymentPlanArray = this.packageService.getPaymentPlan().filter((item)=>{
      console.log('Hi'+item);
      
    })
  }

}
