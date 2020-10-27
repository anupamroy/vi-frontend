import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  AbstractControl,
  FormArray,
  ValidatorFn,
} from '@angular/forms';
import { AddOrganizationService } from '../../services/add-organization.service';
import { OrganizationModel } from '../../../shared/models/organization';
import Organization from '../../../shared/models/organization';
import {
  emptyValidator,
  validUptoValidator,
} from '../../../shared/Services/ReactiveValidations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.scss'],
})
export class AddOrganizationComponent implements OnInit {
  addOrganizationForm: FormGroup;
  currentStep = 0;
  validatedStep: number | null = null;
  instituteTypeList = [];
  selectAllInstitute = false;
  selectAllDays = [true];
  selectAllModules = false;
  addressForList = ['Manager', 'Employee'];
  phoneTextList = ['Manager', 'Employee'];
  phoneTypeList = ['Primary', 'Secondary', 'Emergency'];
  phoneDays = [
    { type: 'Monday', value: true },
    { type: 'Tuesday', value: true },
    { type: 'Wednesday', value: true },
    { type: 'Thursday', value: true },
    { type: 'Friday', value: true },
    { type: 'Saturday', value: true },
    { type: 'Sunday', value: true },
  ];
  daysList = [this.phoneDays];
  shiftList = ['Day', 'Evening', 'Night'];
  associatedWithList = ['Principal', 'Dean'];
  emailTypeList = ['Primary', 'Secondary', 'Emergency'];
  socialMediaList = ['Facebook', 'Instagram', 'Twitter'];
  organizationCategoryList = ['Private', 'LLP'];
  documentTypeList = ['Regular', 'Confidential'];
  moduleList = [];

  constructor(
    private fb: FormBuilder,
    private addOrgService: AddOrganizationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addOrganizationForm = this.fb.group({
      orgType: ['', [Validators.required, Validators.nullValidator]],
      // Step 2
      basicDetails: this.fb.group({
        instituteType: this.fb.array([]),
        organizationName: [
          '',
          [
            Validators.required,
            Validators.pattern(new RegExp(/^[a-zA-Z0-9\s-\.']*$/)),
            emptyValidator(),
          ],
        ],
        organizationCode: [
          '',
          [
            Validators.required,
            Validators.pattern(new RegExp(/^[a-zA-Z0-9]{1,6}$/)),
            emptyValidator(),
          ],
        ],
        fileChoosen: ['', [Validators.required]],
      }),
      // Step 3
      contactDetails: this.fb.group({
        address: this.fb.array([this.createAddressGroup()]),
        phone: this.fb.array([this.createPhoneGroup()]),
        email: this.fb.array([this.createEmailGroup()]),
        socialMedia: this.fb.array([this.createSocialMediaGroup()]),
      }),
      // Step 4
      registrationDetails: this.fb.group({
        organizationCategory: ['', [Validators.required]],
        registrationNumber: [
          '',
          [
            Validators.required,
            Validators.pattern(new RegExp(/^[a-zA-Z0-9-]+$/)),
            emptyValidator(),
          ],
        ],
        registrationDocument: ['', [Validators.required]],
        validUpto: ['', [Validators.required, validUptoValidator()]],
        additionalDocument: this.fb.array([
          this.createAdditionalDocumentGroup(),
        ]),
        accredition: [false],
        accreditionFrom: [''],
        accreditionTo: [''],
        issuingAuthority: [''],
        grade: [''],
        certificateDocument: [''],
        certificateNumber: [''],
        certificateStatus: [false],
      }),
      // Step 5
      settings: this.fb.group({
        multifactorAuthentication: [false],
        passwordAuthentication: [false],
        modules: this.fb.array([]),
      }),
      // Step 6
      userDetails: this.fb.group({
        firstName: [
          '',
          [
            Validators.required,
            Validators.pattern(new RegExp(/^[a-zA-Z\s\.]*$/)),
            emptyValidator(),
          ],
        ],
        middleName: ['', [Validators.pattern(new RegExp(/^[a-zA-Z\s\.]*$/))]],
        lastName: ['', [Validators.pattern(new RegExp(/^[a-zA-Z\s\.]*$/))]],
        emailAddress: [
          '',
          [
            Validators.required,
            Validators.pattern(
              new RegExp(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              )
            ),
            emptyValidator(),
          ],
        ],
        phoneNumber: [
          '',
          [
            Validators.required,
            Validators.pattern(
              new RegExp(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
            ),
            emptyValidator(),
          ],
        ],
      }),
    });

    this.addOrgService.getAllData().subscribe(
      (res) => {
        const data = JSON.parse(res).Items;
        console.log(data);

        const tempInstituteType = [];
        const tempModules = [];

        data.forEach((item) => {
          if (item.isDeleted === false) {
            if (item.itemId === 'INSTITUTE_TYPE') {
              tempInstituteType.push(item);
            } else if (item.itemId === 'MODULE') {
              tempModules.push(item);
            }
          }
        });

        this.instituteTypeList = tempInstituteType.map((item) => {
          return { type: item.instituteType, value: false };
        });
        this.moduleList = tempModules.map((item) => {
          return { type: item.moduleName, value: false };
        });
      },
      (error) => console.error(error)
    );

    this.settings.setValidators([
      this.noModuleValidator(),
      this.noAuthenticationValidator(),
    ]);
    this.settings.updateValueAndValidity();
  }

  // ngOnInit Ends -------------------------------------------------------------------

  // -----------------------------------------------------------------------------------
  // Common Controls -----------------------------------------------------------------
  // -----------------------------------------------------------------------------------

  // Step Controls

  step(no: number): void {
    this.validateForm();
    if (this.validatedStep !== null && no <= this.validatedStep + 1) {
      this.currentStep = no;
    }
  }

  nextStep(): void {
    console.log(this.addOrganizationForm.value);
    this.validateForm();
    if (
      (this.currentStep < 6 && this.validatedStep === this.currentStep) ||
      this.currentStep < this.validatedStep
    ) {
      this.currentStep = this.currentStep + 1;
    }
    console.log('Current', this.currentStep);
    console.log('validated', this.validatedStep);
  }

  previousStep(): void {
    console.log(this.addOrganizationForm.value);
    if (this.currentStep > 0) {
      this.currentStep = this.currentStep - 1;
    }
    console.log('Current', this.currentStep);
    console.log('validated', this.validatedStep);
  }

  ifDisabled(no: number): boolean {
    if (this.currentStep > no) {
      return false;
    }
    return true;
  }

  // Validating Form

  validateForm(): void {
    if (this.addOrganizationForm.controls.orgType.valid) {
      this.validatedStep = 0;
      if (this.addOrganizationForm.controls.basicDetails.valid) {
        this.validatedStep = 1;
        if (this.addOrganizationForm.controls.contactDetails.valid) {
          this.validatedStep = 2;
          if (this.addOrganizationForm.controls.registrationDetails.valid) {
            this.validatedStep = 3;
            if (this.addOrganizationForm.controls.settings.valid) {
              this.validatedStep = 4;
              if (this.addOrganizationForm.controls.userDetails.valid) {
                this.validatedStep = 5;
              }
            }
          }
        }
      }
    }
  }

  // -----------------------------------------------------------------------------------
  // Step 1 ----------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------

  onChangeOrg(): void {
    if (this.addOrganizationForm.controls.orgType.value === 'Institute') {
      (this.addOrganizationForm.controls
        .basicDetails as AbstractControl).setValidators([
        this.selectInstituteTypeValidation(),
      ]);
      this.registrationDetails.controls.accredition.setValidators([
        Validators.required,
      ]);
      this.registrationDetails.controls.accreditionFrom.setValidators([
        Validators.required,
      ]);
      this.registrationDetails.controls.issuingAuthority.setValidators([
        Validators.required,
      ]);
      this.registrationDetails.controls.accredition.updateValueAndValidity();
      this.registrationDetails.controls.accreditionFrom.updateValueAndValidity();
      this.registrationDetails.controls.issuingAuthority.updateValueAndValidity();
      this.instituteTypeFormArray.updateValueAndValidity();
    } else {
      (this.addOrganizationForm.controls
        .basicDetails as AbstractControl).setValidators([]);
      this.selectAllInstitute = false;
      this.instituteTypeFormArray.clear();
      this.instituteTypeFormArray.updateValueAndValidity();
      this.registrationDetails.controls.accredition.setValidators([]);
      this.registrationDetails.controls.accreditionFrom.setValidators([]);
      this.registrationDetails.controls.issuingAuthority.setValidators([]);
      this.registrationDetails.controls.accredition.updateValueAndValidity();
      this.registrationDetails.controls.accreditionFrom.updateValueAndValidity();
      this.registrationDetails.controls.issuingAuthority.updateValueAndValidity();
    }
  }

  // -----------------------------------------------------------------------------------
  // Step 2 ----------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------

  singleUpload(): void {}

  selectInstituteTypeValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const oneAdded = this.instituteTypeFormArray.controls.length === 0;
      return oneAdded ? { noInstituteSelected: true } : null;
    };
  }

  setOrgCode(): void {
    if (
      (this.addOrganizationForm.controls.basicDetails as FormGroup).controls
        .organizationCode.pristine ||
      (this.addOrganizationForm.controls.basicDetails as FormGroup).controls
        .organizationCode.value === ''
    ) {
      // tslint:disable-next-line: no-shadowed-variable
      const orgName = (this.addOrganizationForm.controls
        .basicDetails as FormGroup).controls.organizationName.value;
      // tslint:disable-next-line: no-shadowed-variable
      const acronymList = orgName.split(/\s/).map((word) => {
        const letter = word.slice(0, 1).toUpperCase();
        if (word.length > 2) {
          return letter;
        } else {
          return '';
        }
      });
      (this.addOrganizationForm.controls
        .basicDetails as FormGroup).controls.organizationCode.patchValue(
        acronymList.join('')
      );
    }
  }

  selectAllInstituteTypeToggle(e): void {
    this.instituteTypeFormArray.clear();
    if (e.target.checked) {
      this.selectAllInstitute = true;
      this.instituteTypeList.forEach((item) => {
        item.value = true;
        this.instituteTypeFormArray.push(new FormControl(item.type));
      });
    } else {
      this.selectAllInstitute = false;
      this.instituteTypeList.forEach((item) => {
        item.value = false;
      });
    }
  }

  onInstituteTypeSelectChange(ind, e): void {
    if (e.target.checked) {
      this.instituteTypeFormArray.push(new FormControl(e.target.value));
      this.instituteTypeList[ind].value = true;
    } else {
      let i = 0;
      this.instituteTypeFormArray.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          this.instituteTypeFormArray.removeAt(i);
          return;
        }
        i++;
        this.instituteTypeList[ind].value = false;
      });
    }
    if (
      this.instituteTypeFormArray.controls.length ===
      this.instituteTypeList.length
    ) {
      this.selectAllInstitute = true;
    } else {
      this.selectAllInstitute = false;
    }
  }

  // Getters

  get instituteTypeFormArray(): FormArray {
    return (this.addOrganizationForm.controls.basicDetails as FormGroup)
      .controls.instituteType as FormArray;
  }

  // -----------------------------------------------------------------------------------
  // Step 3 ----------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------

  // Validations

  minAddressValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const oneAdded = this.addressArray.controls.length === 0;
      return oneAdded ? { minaddressvalidation: true } : null;
    };
  }
  minPhoneValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const oneAdded = this.phoneArray.controls.length === 0;
      return oneAdded ? { minaddressvalidation: true } : null;
    };
  }
  minEmailValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const oneAdded = this.emailArray.controls.length === 0;
      return oneAdded ? { minaddressvalidation: true } : null;
    };
  }

  // Utility functions

  onSocialMediaChange(control: FormGroup, e): void {
    if (control.controls.socialMediaType.value === '') {
      control.controls.socialMediaLink.setValue('');
      control.controls.socialMediaLink.clearValidators();
      control.controls.socialMediaLink.updateValueAndValidity();
    } else {
      control.controls.socialMediaLink.reset();
      control.controls.socialMediaLink.setValidators([
        emptyValidator(),
        Validators.required,
        Validators.pattern(
          new RegExp(
            /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
          )
        ),
      ]);
      control.controls.socialMediaLink.updateValueAndValidity();
    }
  }

  selectAllDaysToggle(index, e): void {
    this.daysArray(index).clear();
    if (e.target.checked === true) {
      this.selectAllDays[index] = true;
      this.daysList[index].forEach((item) => {
        item.value = true;
        this.daysArray(index).push(new FormControl(item.type));
      });
    } else {
      this.selectAllDays[index] = false;
      this.daysList[index].forEach((item) => {
        item.value = false;
      });
    }
  }

  onDaySelectChange(index, ind, e): void {
    if (e.target.checked) {
      this.daysArray(index).push(new FormControl(e.target.value));
      this.daysList[index][ind].value = true;
    } else {
      let i = 0;
      this.daysArray(index).controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          this.daysArray(index).removeAt(i);
          return;
        }
        i++;
        this.daysList[index][ind].value = false;
      });
    }
    if (this.daysArray(index).controls.length === this.daysList[index].length) {
      this.selectAllDays[index] = true;
    } else {
      this.selectAllDays[index] = false;
    }
  }

  // Adding Groups

  addaddressGroup(): void {
    this.addressArray.push(this.createAddressGroup());
  }
  addPhoneGroup(): void {
    this.selectAllDays.push(true);
    this.daysList.push(this.phoneDays);
    this.phoneArray.push(this.createPhoneGroup());
  }
  addEmailGroup(): void {
    this.emailArray.push(this.createEmailGroup());
  }
  addSocialMediaGroup(): void {
    this.socialMediaArray.push(this.createSocialMediaGroup());
  }

  // Deleting Groups

  deleteAddressGroup(index: number): void {
    if (this.addressArray.length > 1) {
      this.selectAllDays.filter((item, i) => {
        return i !== index;
      });
      this.daysList.filter((item, i) => {
        return i !== index;
      });
      this.addressArray.removeAt(index);
    }
  }
  deletePhoneGroup(index: number): void {
    if (this.phoneArray.length > 1) {
      this.phoneArray.removeAt(index);
    }
  }
  deleteEmailGroup(index: number): void {
    if (this.emailArray.length > 1) {
      this.emailArray.removeAt(index);
    }
  }
  deleteSocialMediaGroup(index: number): void {
    if (this.socialMediaArray.length > 1) {
      this.socialMediaArray.removeAt(index);
    }
  }

  // Creating Groups

  createAddressGroup(): FormGroup {
    return this.fb.group({
      addressFor: ['Address'],
      address: [
        '',
        [
          Validators.required,
          Validators.pattern(new RegExp(/^[a-zA-Z0-9\s-\.\/',]*$/)),
          emptyValidator(),
        ],
      ],
    });
  }

  createPhoneGroup(): FormGroup {
    return this.fb.group({
      phoneText: ['Phone'],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(
            new RegExp(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
          ),
          emptyValidator(),
        ],
      ],
      phoneType: ['Primary'],
      timing: ['00:00-23:59'],
      days: this.fb.array([
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thrusday',
        'Friday',
        'Saturday',
        'Sunday',
      ]),
      shift: ['All'],
      associatedWith: ['Official Phone'],
    });
  }

  createEmailGroup(): FormGroup {
    return this.fb.group({
      emailText: ['Email'],
      emailAddress: [
        '',
        [
          Validators.pattern(
            new RegExp(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
          ),
          emptyValidator(),
          Validators.required,
        ],
      ],
      emailType: ['Primary'],
      shift: ['All'],
      associatedWith: ['Official Email'],
    });
  }

  createSocialMediaGroup(): FormGroup {
    return this.fb.group({
      socialMediaType: [''],
      socialMediaLink: [''],
    });
  }

  // Getters

  get addressArray(): FormArray {
    return (this.addOrganizationForm.controls.contactDetails as FormGroup)
      .controls.address as FormArray;
  }

  get phoneArray(): FormArray {
    return (this.addOrganizationForm.controls.contactDetails as FormGroup)
      .controls.phone as FormArray;
  }

  get emailArray(): FormArray {
    return (this.addOrganizationForm.controls.contactDetails as FormGroup)
      .controls.email as FormArray;
  }

  get socialMediaArray(): FormArray {
    return (this.addOrganizationForm.controls.contactDetails as FormGroup)
      .controls.socialMedia as FormArray;
  }

  daysArray(i: number): FormArray {
    return (((this.addOrganizationForm.controls.contactDetails as FormGroup)
      .controls.phone as FormArray).controls[i] as FormGroup).controls
      .days as FormArray;
  }

  // -----------------------------------------------------------------------------------
  // Step 4 ----------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------

  createAdditionalDocumentGroup(): FormGroup {
    return this.fb.group({
      documentType: ['', [Validators.required]],
      documentNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(new RegExp(/^[a-zA-Z0-9-]+$/)),
          emptyValidator(),
        ],
      ],
      registrationDocument: ['', [Validators.required]],
      validUpto: ['', [Validators.required, validUptoValidator()]],
    });
  }

  addAdditionalDocumentGroup(): void {
    this.additionalDocumentArray.push(this.createAdditionalDocumentGroup());
  }

  deleteAdditionalDocumentGroup(index: number): void {
    if (this.additionalDocumentArray.length > 1) {
      this.additionalDocumentArray.removeAt(index);
    }
  }

  get additionalDocumentArray(): FormArray {
    return (this.addOrganizationForm.controls.registrationDetails as FormGroup)
      .controls.additionalDocument as FormArray;
  }

  get registrationDetails(): FormGroup {
    return this.addOrganizationForm.controls.registrationDetails as FormGroup;
  }

  // -----------------------------------------------------------------------------------
  // Step 5 ----------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------

  noModuleValidator(): ValidatorFn {
    return (array: FormArray): { [key: string]: boolean } | null => {
      if (this.moduleArray.controls.length === 0) {
        return { nomodulevalidator: true };
      } else {
        return null;
      }
    };
  }

  noAuthenticationValidator(): ValidatorFn {
    return (array: FormArray): { [key: string]: boolean } | null => {
      if (
        this.settings.controls.passwordAuthentication.value === false &&
        this.settings.controls.multifactorAuthentication.value === false
      ) {
        return { noauthenticationvalidator: true };
      } else {
        return null;
      }
    };
  }

  selectAllModulesToggle(e): void {
    this.moduleArray.clear();
    if (e.target.checked) {
      this.selectAllModules = true;
      this.moduleList.forEach((item) => {
        item.value = true;
        this.moduleArray.push(new FormControl(item.type));
      });
    } else {
      this.selectAllModules = false;
      this.moduleList.forEach((item) => {
        item.value = false;
      });
    }
  }

  onModuleSelectChange(ind, e): void {
    if (e.target.checked) {
      this.moduleArray.push(new FormControl(e.target.value));
      this.moduleList[ind].value = true;
    } else {
      let i = 0;
      this.moduleArray.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          this.moduleArray.removeAt(i);
          return;
        }
        i++;
        this.moduleList[ind].value = false;
      });
    }
    if (this.moduleArray.controls.length === this.moduleList.length) {
      this.selectAllModules = true;
    } else {
      this.selectAllModules = false;
    }
  }

  get moduleArray(): FormArray {
    return (this.addOrganizationForm.controls.settings as FormGroup).controls
      .modules as FormArray;
  }

  get settings(): FormGroup {
    return this.addOrganizationForm.controls.settings as FormGroup;
  }

  // -----------------------------------------------------------------------------------
  // Step 6 ----------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------

  get userDetails(): FormGroup {
    return this.addOrganizationForm.controls.userDetails as FormGroup;
  }

  // -----------------------------------------------------------------------------------
  // Step 7 ----------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------

  onSubmit(): void {
    const formValue = this.addOrganizationForm.value;
    const newOrganizationData = new OrganizationModel(formValue);
    const newOrganization = new Organization();
    newOrganization.organization = newOrganizationData;
    newOrganization.isActivated = true;
    newOrganization.isDeleted = false;
    Swal.fire({
      title: 'Please Wait',
      allowEscapeKey: false,
      allowOutsideClick: true,
      background: '#fff',
      showConfirmButton: false,
      onOpen: () => {
        Swal.showLoading();
        this.addOrgService.addOrganization(newOrganization).subscribe(
          (data) => {
            console.log(data);
            if (data) {
              Swal.fire({
                title: 'Added',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                this.router.navigate(['/org/']);
              });
            }
          },
          (error) => console.error(error)
        );
      },
    });
  }
}
