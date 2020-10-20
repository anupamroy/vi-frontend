export class Validations {
  constructor() {}

  // Validation for Name
  // A-Z a-z

  validateName(name: string): boolean {
    console.log(name)
    if (name.trim().length <= 25) {
      const regex = /^[A-Z a-z]+$/;
      return regex.test(name);
    } else {
      return false;
    }
  }

  // Validation for Email

  validateEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    return regex.test(email);
  }

  // Validation for PhoneNumber

  validatePhone(phoneNo: string): boolean {
    if (phoneNo.length >= 10 && phoneNo.length <= 15) {
      const regex = /^[+]*[{0,1}[0-9][{1,4}{0,1}][-\s\./0-9]*$/;
      return regex.test(phoneNo);
    } else {
      return false;
    }
  }

  // Validation for Address
  // Space, DOT, DASH, FRONT SLASH, COMMA, SINGLE QUOTES

  validateAddress(address: string): boolean {
    const regex = /^[a-zA-Z0-9\s,'.-/]*$/;
    return regex.test(address);
  }

  // Validation for Password

  validatePassword(password: string): boolean {
    if (password.length < 8) {
      return false;
    } else {
      return true;
    }
  }

  // Validation for Date

  validateDate(date: string): boolean {
    const regex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    return regex.test(date);
  }

  // Validation for required type

  validateRequired(field: string): boolean {
    if (field.trim() !== '') {
      return true;
    } else {
      return false;
    }
  }

  validateUrl(url: string): boolean {
    const regex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regex.test(url);
  }
}
