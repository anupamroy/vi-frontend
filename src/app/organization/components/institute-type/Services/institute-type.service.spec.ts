import { TestBed } from '@angular/core/testing';

import { InstituteTypeService } from './institute-type.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('InstituteTypeService', () => {
  let service: InstituteTypeService;
  let httpmock: HttpTestingController;
  let mockid:string;
  let mockbody:any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[InstituteTypeService]
    });
    service = TestBed.inject(InstituteTypeService);
    httpmock = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpmock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it('should retrive InstituteType from the API via GET',()=>{
    const dummyInst =[
      {InstType:'xyz'},
      {InstType:'qwe'},
    ];

    service.getInstituteType().subscribe(values=>{
      expect(values.length).toBe(2);
      expect(values).toEqual(dummyInst);
    });

    const request = httpmock.expectOne(`${service.api}/all`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyInst);
  });

  it('postInstituteType should add',()=>{
    const dummyAddInst =
    [
      {InstType:'xyz'},
      {InstType:'qwe'},
    ];
    service.postInstituteType(dummyAddInst).subscribe(values=>{
      // expect(values.length).toBe(2);
      expect(values).toEqual(dummyAddInst);
    });

    const request = httpmock.expectOne(`${service.api}`, mockbody);

    expect(request.request.method).toBe('POST');

    expect(request.request.body).toEqual(dummyAddInst);
    
    request.flush(dummyAddInst);
  });

  it('updateInstituteType should update',() => {

    const dummyInst =
      {id:'121',InstType:'xyz'};

    service.updateInstituteTypeById(mockid,mockbody).subscribe(values => {
      expect(values.id).toBe('121');
      expect(values).toEqual(dummyInst);
    });

    const request = httpmock.expectOne(`${service.api}/${mockid}`, mockbody);

    expect(request.request.method).toBe('PUT');

    request.flush(dummyInst);
  });

   
  // it('deleteInstituteType should return null',() => {
    
  //   // const dummyFeesDelete =
  //   //   {id:'121'};
  //   service.deleteInstituteType(mockid).subscribe(values => {
  //     // expect(values.id).toBe('121');
  //     expect(values).toEqual(null);
  //   });
  
  // const request = httpmock.expectOne(`${service.api}/${mockid}`);

  // expect(request.request.method).toBe('DELETE');

  // // request.flush(dummyFeesDelete);
  // });
});
