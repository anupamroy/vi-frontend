import { AbstractControl, ValidatorFn } from '@angular/forms';

export const emptyValidator = (): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value && control.value.trim() === '') {
      return { emptyvalidator: true };
    } else {
      return null;
    }
  };
};

export const validUptoValidator = (): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (new Date(control.value).getTime() < new Date().getTime()) {
      return { validuptovalidator: true };
    } else {
      return null;
    }
  };
};

export const validFromValidator = (): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (new Date(control.value).getTime() > new Date().getTime()) {
      return { validfromvalidator: true };
    } else {
      return null;
    }
  };
};
