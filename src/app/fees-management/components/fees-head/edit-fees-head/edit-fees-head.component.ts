import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FeesService } from '../../../services/fees.service';
import { FeesHead } from '../../../models/fees-head.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-fees-head',
  templateUrl: './edit-fees-head.component.html',
  styleUrls: ['./edit-fees-head.component.scss'],
})
export class EditFeesHeadComponent implements OnInit {
  editFeesHeadForm: FormGroup;
  instituteTypeList = [];
  parentFeesList = [];
  selectedId: string;
  selectedFeesHead: FeesHead;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private feesService: FeesService
  ) { }

  ngOnInit(): void {
    this.editFeesHeadForm = this.formBuilder.group({
      instituteType: ['', [Validators.required]],
      feesHeadName: [
        '',
        [
          Validators.nullValidator,
          Validators.required,
          Validators.maxLength(25),
          Validators.pattern(`^[a-zA-Z_ ]*$`),
          this.emptyValidator(),
        ],
      ],
      parentFees: [''],
    });

    this.selectedId = this.activatedRoute.snapshot.params.id;

    this.feesService.getFeesHeadById(this.selectedId).subscribe(
      (item) => {
        item = JSON.parse(item);
        var selectedFeesHead = new FeesHead();
        selectedFeesHead.feesHeadName = item.feesHeadName;
        selectedFeesHead.instituteType = item.instituteType;
        selectedFeesHead.parentFeesName = item.parentFeesName;
        selectedFeesHead.isActivated = item.isActivated;
        selectedFeesHead.isDeleted = item.isDeleted;
        selectedFeesHead.itemId = item.itemId;

        this.editFeesHeadForm.patchValue({
          feesHeadName: this.selectedFeesHead.feesHeadName,
          parentFees: this.selectedFeesHead.parentFeesName,
          instituteType: this.selectedFeesHead.instituteType,
        });
        console.log(this.selectedFeesHead);
      },
      // (error) => console.error(error)
    );

    this.feesService.getInstituteTypes().subscribe(
      (res) => {
        const data = JSON.parse(res).Items;
        const temp = [];
        data.map((item) => {
          if (item.itemId === 'INSTITUTE_TYPE') {
            temp.push(item);
          }
        });
        this.instituteTypeList = temp;
        console.log(this.instituteTypeList);
      },
      (error) => console.error(error)
    );

    // Get data to populate parent fees Dropdown
    this.feesService.getFeesHeads().subscribe(
      (res) => {
        const data = JSON.parse(res).Items;
        let temp = [];

        data.map((item) => {
          if (item.itemId === 'FEES_HEAD') {
            temp.push(item)
          }
        });

        this.parentFeesList = temp;
      },
      (error) => console.error(error)
    );
  }

  processObjUpdated(object: FeesHead){
    var attribute = [];
    var value = [];
    for (const key in object) {
      if (key !== 'itemId') {
        attribute.push(key);
        value.push(object[key]);
      }
    }

    return {
      attribute,
      value,
      itemId: object.itemId
    }
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
    // this.feesService
    //     .updateFeesHeadById(this.selectedId, {
    //       attribute: ['instituteType', 'feesHeadName', 'parentFees'],
    //       value: [
    //         this.editFeesHeadForm.controls.instituteType.value,
    //         this.editFeesHeadForm.controls.feesHeadName.value,
    //         this.editFeesHeadForm.controls.parentFees.value,
    //       ],
    //     })
    //     .subscribe(
    //       (data) => {
    //         Swal.fire(
    //           'Congratulations!',
    //           'Fees Head has been editted successfully',
    //           'success'
    //         ).then(() => {
    //           this.router.navigate(['/fees-management/fees-head']);
    //         });
    //       },
    //       (error) => console.error()
    //     );

    var obj = new FeesHead();
    obj.feesHeadName = this.editFeesHeadForm.controls.feesHeadName.value;
    obj.parentFeesName = this.editFeesHeadForm.controls.parentFees.value;
    obj.instituteType = this.editFeesHeadForm.controls.instituteType.value;

    obj.isActivated = this.selectedFeesHead.isActivated;
    obj.isDeleted = this.selectedFeesHead.isDeleted;
    obj.itemId = this.selectedFeesHead.itemId;

    this.feesService.updateFeesHeadById(this.selectedId, this.processObjUpdated(obj)).subscribe((res) => {
      Swal.fire(
        'Congratulations!',
        'Fees Head has been edited successfully',
        'success'
      ).then(() => {
        this.router.navigate(['/fees-management/fees-head']);
      });
    })

    console.log(this.editFeesHeadForm.value);
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
    return this.editFeesHeadForm.controls.feesHeadName;
  }
  get parentFees(): AbstractControl {
    return this.editFeesHeadForm.controls.parentFees;
  }
  get instituteType(): AbstractControl {
    return this.editFeesHeadForm.controls.instituteType;
  }
}
