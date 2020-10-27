// Basic Details Class and Interface
export interface BasicDetailsProps {
  instituteType: Array<string>;
  organizationName: string;
  organizationCode: string;
  fileChoosen: string;
}

export class BasicDetails {
  instituteType: Array<string>;
  organizationName: string;
  organizationCode: string;
  fileChoosen: string;

  constructor(params: BasicDetailsProps) {
    this.instituteType = params.instituteType;
    this.organizationName = params.organizationName;
    this.organizationCode = params.organizationCode;
    this.fileChoosen = params.fileChoosen;
  }
}

// Contact Detail Interface and Class
export interface ContactDetailsProps {
  phone: Array<PhoneProps>;
  email: Array<EmailProps>;
  address: Array<AddressProps>;
  socialMedia: Array<SocialMediaProps>;
}

export class ContactDetails {
  phone: Array<Phone>;
  email: Array<Email>;
  address: Array<Address>;
  socialMedia: Array<SociaMedia>;

  constructor(params: ContactDetailsProps) {
    this.address = params.address;
    this.phone = params.phone;
    this.email = params.email;
    this.socialMedia = params.socialMedia;
  }
}

// Phone Interface and class
export interface PhoneProps {
  phoneText: string;
  phoneNumber: string;
  phoneType: string;
  timing: string;
  days: Array<string>;
  shift: string;
  associatedWith: string;
}

export class Phone {
  phoneText: string;
  phoneNumber: string;
  phoneType: string;
  timing: string;
  days: Array<string>;
  shift: string;
  associatedWith: string;

  constructor(params: PhoneProps) {
    this.phoneText = params.phoneText;
    this.phoneNumber = params.phoneNumber;
    this.phoneType = params.phoneType;
    this.timing = params.timing;
    this.days = params.days;
    this.shift = params.shift;
    this.associatedWith = params.associatedWith;
  }
}

// Address Interface and Class
export interface AddressProps {
  addressFor: string;
  address: string;
}

export class Address {
  addressFor: string;
  address: string;

  constructor(params: AddressProps) {
    this.address = params.address;
    this.addressFor = params.addressFor;
  }
}

// Email Interface and class
export interface EmailProps {
  emailText: string;
  emailAddress: string;
  emailType: string;
  shift: string;
  associatedWith: string;
}

export class Email {
  emailText: string;
  emailAddress: string;
  emailType: string;
  shift: string;
  associatedWith: string;

  constructor(params: EmailProps) {
    this.emailType = params.emailType;
    this.emailAddress = params.emailAddress;
    this.emailText = params.emailText;
    this.shift = params.shift;
    this.associatedWith = params.associatedWith;
  }
}

// Social Media Interface and Class
export interface SocialMediaProps {
  socialMediaType: string;
  socialMediaLink: string;
}

export class SociaMedia {
  socialMediaType: string;
  socialMediaLink: string;

  constructor(params: SocialMediaProps) {
    this.socialMediaType = params.socialMediaType;
    this.socialMediaLink = params.socialMediaLink;
  }
}

// Registration Details Class and Interface

export interface RegistrationDetailsProps {
  organizationCategory: string;
  registrationNumber: string;
  registrationDocument: string;
  validUpto: string;
  additionalDocument: Array<AdditionalDocumentProps>;
  accrediton: boolean;
  accreditionFrom: string;
  accreditionTo: string;
  issuingAuthority: string;
  grade: string;
  certificateDocument: string;
  certificateNumber: string;
  status: boolean;
}

export class RegistrationDetails {
  organizationCategory: string;
  registrationNumber: string;
  registrationDocument: string;
  validUpto: string;
  additionalDocument: Array<AdditionalDocumentProps>;
  accrediton: boolean;
  accreditionFrom: string;
  accreditionTo: string;
  issuingAuthority: string;
  grade: string;
  certificateDocument: string;
  certificateNumber: string;
  status: boolean;

  constructor(params: RegistrationDetailsProps) {
    this.organizationCategory = params.organizationCategory;
    this.registrationNumber = params.registrationNumber;
    this.registrationDocument = params.registrationDocument;
    this.validUpto = params.validUpto;
    this.additionalDocument = params.additionalDocument;
    this.accrediton = params.accrediton;
    this.accreditionFrom = params.accreditionFrom;
    this.accreditionTo = params.accreditionTo;
    this.issuingAuthority = params.issuingAuthority;
    this.grade = params.grade;
    this.certificateDocument = params.certificateDocument;
  }
}

// Additional Document class and interface

export interface AdditionalDocumentProps {
  documentType: string;
  documentNumber: string;
  registrationDocument: string;
  validUpto: string;
}

export class AdditionalDocument {
  documentType: string;
  documentNumber: string;
  registrationDocument: string;
  validUpto: string;

  constructor(params: AdditionalDocumentProps) {
    this.documentNumber = params.documentNumber;
    this.documentType = params.documentType;
    this.registrationDocument = params.registrationDocument;
    this.validUpto = params.validUpto;
  }
}

// Settings

export interface SettingsProps {
  passwordAuthentication: boolean;
  multifactorAuthentication: boolean;
  modules: Array<string>;
}

export class Settings {
  passwordAuthentication: boolean;
  multifactorAuthentication: boolean;
  modules: Array<string>;

  constructor(params: SettingsProps) {
    this.passwordAuthentication = params.passwordAuthentication;
    this.multifactorAuthentication = params.multifactorAuthentication;
    this.modules = params.modules;
  }
}

// User details class and interface

export interface UserDetailsProps {
  firstName: string;
  middleName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
}

export class UserDetails {
  firstName: string;
  middleName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;

  constructor(params: UserDetailsProps) {
    this.firstName = params.firstName;
    this.middleName = params.middleName;
    this.lastName = params.lastName;
    this.emailAddress = params.emailAddress;
    this.phoneNumber = params.phoneNumber;
  }
}

export interface OrganizationModelProps {
  orgType: string;
  basicDetails: BasicDetailsProps;
  contactDetails: ContactDetailsProps;
  registrationDetails: RegistrationDetailsProps;
  settings: SettingsProps;
  userDetails: UserDetailsProps;
}

export class OrganizationModel {
  orgType: string;
  basicDetails: BasicDetailsProps;
  contactDetails: ContactDetailsProps;
  registrationDetails: RegistrationDetailsProps;
  settings: SettingsProps;
  userDetails: UserDetailsProps;

  constructor(params: OrganizationModelProps) {
    this.orgType = params.orgType;
    this.basicDetails = params.basicDetails;
    this.contactDetails = params.contactDetails;
    this.registrationDetails = params.registrationDetails;
    this.settings = params.settings;
    this.userDetails = params.userDetails;
  }
}

export default class Organization {
  itemId = 'ORGANIZATION';
  isActivated: boolean;
  isDeleted: boolean;
  organization: OrganizationModel;
}
