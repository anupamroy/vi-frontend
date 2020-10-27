import { TestBed } from '@angular/core/testing';

import { AccountsHeadService } from './accounts-head.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AccountsHeadService', () => {
  let service: AccountsHeadService;
  let httpmock: HttpTestingController;
  let mockid:string;
  let mockbody:any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[AccountsHeadService]
    });
    service = TestBed.inject(AccountsHeadService);
    httpmock = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpmock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrive AccountsHead from the API via GET',()=>{
    const dummyAcc =[
      {accHead:'xyz'},
      {accHead:'qwe'},
    ];

    service.getAccountsHead().subscribe(values=>{
      expect(values.length).toBe(2);
      expect(values).toEqual(dummyAcc);
    });

    const request = httpmock.expectOne(`${service.api}/all`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyAcc);
  });

  it('AccountsHead should add',()=>{
    const dummyAddAcc =
    [
      {accHead:'xyz'},
      {accHead:'qwe'},
    ];
    service.addAccountsHead(dummyAddAcc).subscribe(values=>{
      // expect(values.length).toBe(2);
      expect(values).toEqual(dummyAddAcc);
    });

    const request = httpmock.expectOne(`${service.api}`, mockbody);

    expect(request.request.method).toBe('POST');

    expect(request.request.body).toEqual(dummyAddAcc);
    
    request.flush(dummyAddAcc);
  });
  
  it('updateAccountsHead should update',() => {

    const dummyFeesUpdate =
      {id:'121',accHead:'xyz'};

    service.updateAccountsHeadById(mockid,mockbody).subscribe(values => {
      expect(values.id).toBe('121');
      expect(values).toEqual(dummyFeesUpdate);
    });

    const request = httpmock.expectOne(`${service.api}/${mockid}`, mockbody);

    expect(request.request.method).toBe('PUT');

    request.flush(dummyFeesUpdate);
  });

  // it('deleteAccountsHead should return null',() => {
    
  //   // const dummyAccDelete =
  //   //   {id:'121'};

  //   service.deleteAccountsHeadById(mockid).subscribe(values => {
  //     // expect(values.id).toBe('121');
  //     expect(values).toEqual(null);
  //   });
  

  // const request = httpmock.expectOne(`${service.api}/${mockid}`);

  // expect(request.request.method).toBe('DELETE');

  // // request.flush(dummyAccDelete);
  // });
});
