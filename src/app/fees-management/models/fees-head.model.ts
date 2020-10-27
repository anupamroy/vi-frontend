// export interface FeesHeadProperties {
//   feesHeadId?: string;
//   parentFees?: string;
//   feesHeadName: string;
//   instituteType: string;
//   isActivated?: boolean;
//   isDeleted?: boolean;
// }

// export default class FeesHead {
//   feesHeadId: string | undefined;
//   parentFees: string;
//   feesHeadName: string;
//   instituteType: string;
//   isActivated: boolean;
//   isDeleted: boolean;

//   constructor(params: FeesHeadProperties) {
//     this.feesHeadId = params.feesHeadId || undefined;
//     this.feesHeadName = params.feesHeadName;
//     this.parentFees = params.parentFees || '';
//     this.instituteType = params.instituteType;
//     this.isActivated = params.isActivated || true;
//     this.isDeleted = params.isDeleted || false;
//   }
// }

export class FeesHead {
  itemId: string = 'FEES_HEAD';
  feesHeadName: string;
  parentFeesName: string;
  instituteType: string;
  isActivated: boolean;
  isDeleted: boolean;
}
