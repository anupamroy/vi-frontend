import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FeesHead } from '../../../models/fees-head.model';

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';

import { Router } from '@angular/router';
import { FeesService } from 'src/app/fees-management/services/fees.service';

@Component({
  selector: 'app-add-fees-head',
  templateUrl: './add-fees-head.component.html',
  styleUrls: ['./add-fees-head.component.scss'],
})
export class AddFeesHeadComponent implements OnInit {
  addFeesHeadForm: FormGroup;
  instituteTypeList = [];
  parentFeesList = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private feesService: FeesService
  ) {}

  ngOnInit(): void {
    this.addFeesHeadForm = this.formBuilder.group({
      instituteType: ['', [Validators.required, Validators.nullValidator]],
      feesHeadName: [
        '',
        [
          Validators.required,
          Validators.nullValidator,
          Validators.maxLength(25),
          Validators.pattern(RegExp(`^[a-zA-Z_ ]*$`)),
          this.emptyValidator(),
        ],
      ],
      parentFees: ['', [Validators.nullValidator]],
    });

    this.feesService.getInstituteTypes().subscribe(
      (res) => {
        const data = JSON.parse(res).Items;
        const temp = [];
        data.map((item) => {
          if (item.itemId === 'INSTITUTE_TYPE' && item.isDeleted === false) {
            temp.push(item);
          }
        });
        this.instituteTypeList = temp;
        console.log(this.instituteTypeList);
      },
      // (error) => console.error(error)
    );

    // Get data to populate parent fees Dropdown
    this.feesService.getFeesHeads().subscribe(
      (res) => {
        const data = JSON.parse(res).Items;
        let temp = [];
        
        data.map((item) => {
          if (item.itemId === 'FEES_HEAD' && item.isDeleted === false){
            temp.push(item)
          }
        });

        this.parentFeesList = temp;
      },
      (error) => console.error(error)
    );
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
    const feesHeadObject = new FeesHead();
    feesHeadObject.feesHeadName = this.addFeesHeadForm.controls.feesHeadName.value;
    feesHeadObject.parentFeesName = this.addFeesHeadForm.controls.parentFees.value;
    feesHeadObject.instituteType = this.addFeesHeadForm.controls.instituteType.value;
    feesHeadObject.isActivated = true;
    feesHeadObject.isDeleted = false;

    this.feesService.addFeesHead(feesHeadObject).subscribe(
      (data) => {
        Swal.fire(
          'Congratulations!',
          'Fees Head has been saved successfully',
          'success'
        ).then(() => {
          this.router.navigate(['/fees-management/fees-head']);
        });
      },
      (error) => console.error(error)
    );
  }

  emptyValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value.trim() === '') {
        // tslint:disable-next-line: object-literal-key-quotes
        return { emptyvalidator: true };
      } else {
        return null;
      }
    };
  }

  get feesHeadName(): AbstractControl {
    return this.addFeesHeadForm.get('feesHeadName');
  }
  get parentFees(): AbstractControl {
    return this.addFeesHeadForm.get('parentFees');
  }
  get instituteType(): AbstractControl {
    return this.addFeesHeadForm.get('instituteType');
  }
}
