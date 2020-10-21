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
import FeesHeadModel from '../../../models/fees-head.model';

@Component({
  selector: 'app-edit-fees-head',
  templateUrl: './edit-fees-head.component.html',
  styleUrls: ['./edit-fees-head.component.scss'],
})
export class EditFeesHeadComponent implements OnInit {
  editFeesHeadForm: FormGroup;
  instituteTypeList = [];
  parentFeesList: Array<FeesHeadModel>;
  selectedId: string;
  selectedFeesHead: FeesHeadModel;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private feesService: FeesService
  ) {}

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
        this.selectedFeesHead = new FeesHeadModel({
          feesHeadId: item.fees_head_id,
          feesHeadName: item.feesHeadName,
          instituteType: item.instituteType,
          isActivated: item.isActivated,
          parentFees: item.parentFees,
        });
        this.editFeesHeadForm.patchValue({
          feesHeadName: this.selectedFeesHead.feesHeadName,
          parentFees: this.selectedFeesHead.parentFees,
          instituteType: this.selectedFeesHead.instituteType,
        });
        // console.log(this.selectedFeesHead);
      },
      (error) => console.error(error)
    );

    this.feesService.getInstituteTypes().subscribe(
      (res) => {
        const data = JSON.parse(res).Items;
        const temp = [];
        data.map((item) => {
          if (item.instituteType) {
            temp.push(item);
          }
        });
        this.instituteTypeList = temp;
        // console.log(this.instituteTypeList);
      },
      (error) => console.error(error)
    );

    this.feesService.getFeesHeads().subscribe(
      (data) => {
        this.parentFeesList = JSON.parse(data).Items.map((item) => {
          return new FeesHeadModel({
            feesHeadId: item.fees_head_id,
            feesHeadName: item.feesHeadName,
            instituteType: item.instituteType,
            isActivated: item.isActivated,
            parentFees: item.parentFees,
          });
        });
        // console.log(this.parentFeesList);
      },
      (error) => console.error(error)
    );
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
    if (
      this.editFeesHeadForm.controls.instituteType.value !==
        this.selectedFeesHead.instituteType ||
      this.editFeesHeadForm.controls.feesHeadName.value !==
        this.selectedFeesHead.feesHeadName ||
      this.editFeesHeadForm.controls.parentFees.value !==
        this.selectedFeesHead.parentFees
    ) {
      // Update fees head data
      this.feesService
        .updateFeesHeadById(this.selectedId, {
          attribute: ['instituteType', 'feesHeadName', 'parentFees'],
          value: [
            this.editFeesHeadForm.controls.instituteType.value,
            this.editFeesHeadForm.controls.feesHeadName.value,
            this.editFeesHeadForm.controls.parentFees.value,
          ],
        })
        .subscribe(
          (data) => {
            this.router.navigate(['/fees-management/fees-head']);
          },
          (error) => console.error()
        );
    } else {
      this.router.navigate(['/fees-management/fees-head']);
    }
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
