export interface FeesHeadProperties {
  feesHeadId?: string;
  parentFees?: string;
  feesHeadName: string;
  instituteType: string;
  isActivated?: boolean;
}

export default class FeesHead {
  feesHeadId: string | undefined;
  parentFees: string;
  feesHeadName: string;
  instituteType: string;
  isActivated: boolean;

  constructor(params: FeesHeadProperties) {
    this.feesHeadId = params.feesHeadId || undefined;
    this.feesHeadName = params.feesHeadName;
    this.parentFees = params.parentFees || '';
    this.instituteType = params.instituteType;
    this.isActivated = params.isActivated || true;
  }
}
