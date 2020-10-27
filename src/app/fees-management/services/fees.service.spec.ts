import { TestBed } from '@angular/core/testing';

import { FeesService } from './fees.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('FeesService', () => {
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
  
  it('should retrive getFeesHeads from the API via GET',()=>{
    const dummyFeesHd =[
      {feesHd:'xyz'},
      {feesHd:'qwe'},
    ];

    service.getFeesHeads().subscribe(values=>{
      expect(values.length).toBe(2);
      expect(values).toEqual(dummyFeesHd);
    });

    const request = httpmock.expectOne(`${service.api}/all`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyFeesHd);
  });

  it('FeesHead should add',()=>{
    const dummyAddFeesHd =
    [
      {feesHd:'xyz'},
      {feesHd:'qwe'},
    ];
    service.addFeesHead(dummyAddFeesHd).subscribe(values=>{
      // expect(values.length).toBe(2);
      expect(values).toEqual(dummyAddFeesHd);
    });

    const request = httpmock.expectOne(`${service.api}`, mockbody);

    expect(request.request.method).toBe('POST');

    expect(request.request.body).toEqual(dummyAddFeesHd);
    
    request.flush(dummyAddFeesHd);
  });

  it('updateFeesHead should update',() => {

    const dummyFeesHd =
      {id:'121',feesHd:'xyz'};

    service.updateFeesHeadById(mockid,mockbody).subscribe(values => {
      expect(values.id).toBe('121');
      expect(values).toEqual(dummyFeesHd);
    });

    const request = httpmock.expectOne(`${service.api}/${mockid}`, mockbody);

    expect(request.request.method).toBe('PUT');

    request.flush(dummyFeesHd);
  });
  
  // it('deleteFeesHead should return null',() => {
    
  //   // const dummyFeesDelete =
  //   //   {id:'121'};
  //   service.deleteFeesHeadById(mockid).subscribe(values => {
  //     // expect(values.id).toBe('121');
  //     expect(values).toEqual(null);
  //   });
  
  // const request = httpmock.expectOne(`${service.api}/${mockid}`);

  // expect(request.request.method).toBe('DELETE');

  // // request.flush(dummyFeesDelete);
  // });
});
