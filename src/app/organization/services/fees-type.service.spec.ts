import { TestBed } from '@angular/core/testing';

import { FeesService } from './fees-type.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { exception } from 'console';

describe('FeesTypeService', () => {
  let service: FeesService;
  let httpmock: HttpTestingController;
  let mockid:string;
  let mockbody:any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[FeesService]

    });
    service = TestBed.inject(FeesService);
    httpmock = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpmock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrive feesType from the API via GET',()=>{
    const dummyFees =[
      {feesType:'xyz'},
      {feesType:'qwe'},
    ];

    service.getFeesType().subscribe(values=>{
      expect(values.length).toBe(2);
      expect(values).toEqual(dummyFees);
    });

    const request = httpmock.expectOne(`${service.api}/all`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyFees);
  });

  it('addFeesType should add',()=>{
    const dummyAddFees =
    [
      {feesType:'xyz'},
      {feesType:'qwe'},
    ];
    service.addFeesType(dummyAddFees).subscribe(values=>{
      // expect(values.length).toBe(2);
      expect(values).toEqual(dummyAddFees);
    });

    const request = httpmock.expectOne(`${service.api}`, mockbody);

    expect(request.request.method).toBe('POST');

    expect(request.request.body).toEqual(dummyAddFees);
    
    request.flush(dummyAddFees);
  });

  it('updateFeesType should update',() => {

    const dummyFeesUpdate =
      {id:'121',feesType:'xyz'};

    service.updateFeesTypeById(mockid,mockbody).subscribe(values => {
      expect(values.id).toBe('121');
      expect(values).toEqual(dummyFeesUpdate);
    });

    const request = httpmock.expectOne(`${service.api}/${mockid}`, mockbody);

    expect(request.request.method).toBe('PUT');

    request.flush(dummyFeesUpdate);
  });
  
  // it('deleteFeesType should return null',() => {
    
  //   // const dummyFeesDelete =
  //   //   {id:'121'};
  //   service.deleteFeesTypeById(mockid).subscribe(values => {
  //     // expect(values.id).toBe('121');
  //     expect(values).toEqual(null);
  //   });
  
  // const request = httpmock.expectOne(`${service.api}/${mockid}`);

  // expect(request.request.method).toBe('DELETE');

  // // request.flush(dummyFeesDelete);
  // });

});
