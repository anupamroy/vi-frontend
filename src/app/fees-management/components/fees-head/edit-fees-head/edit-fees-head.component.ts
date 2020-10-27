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
        item = JSON.parse(item).Items[0];
        console.log(item);

        var obj = new FeesHead();

        obj.feesHeadName = item.feesHeadName;
        obj.instituteType = item.instituteType;
        obj.parentFeesName = item.parentFeesName;
        obj.isActivated = item.isActivated;
        obj.isDeleted = item.isDeleted;
        obj.itemId = item.itemId;

        this.selectedFeesHead = obj;
        console.log(this.selectedFeesHead);

        this.editFeesHeadForm.patchValue({
          feesHeadName: this.selectedFeesHead.feesHeadName,
          parentFees: this.selectedFeesHead.parentFeesName,
          instituteType: this.selectedFeesHead.instituteType,
        });
      },
      // (error) => console.error(error)
    );

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
      (error) => console.error(error)
    );

    // Get data to populate parent fees Dropdown
    this.feesService.getFeesHeads().subscribe(
      (res) => {
        const data = JSON.parse(res).Items;
        let temp = [];

        data.map((item) => {
          if (item.itemId === 'FEES_HEAD' && item.isDeleted === false) {
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
