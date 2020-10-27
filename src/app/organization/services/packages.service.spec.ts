import { TestBed } from '@angular/core/testing';

import { PackagesService } from './packages.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PackagesService', () => {
  let service: PackagesService;
  let httpmock: HttpTestingController;
  let mockid:string;
  let mockbody:any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[PackagesService]
    });
    service = TestBed.inject(PackagesService);
    httpmock = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpmock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrive Package from the API via GET',()=>{
    const dummyPackage =[
      {Package:'xyz'},
      {Package:'qwe'},
    ];

    service.getPackage().subscribe(values=>{
      expect(values.length).toBe(2);
      expect(values).toEqual(dummyPackage);
    });

    const request = httpmock.expectOne(`${service.api}/all`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyPackage);
  });
  
  it('Package should add',()=>{
    const dummyPackageAdd =
    [
      {Package:'xyz'},
      {Package:'qwe'},
    ];
    service.addPackage(dummyPackageAdd).subscribe(values=>{
      // expect(values.length).toBe(2);
      expect(values).toEqual(dummyPackageAdd);
    });

    const request = httpmock.expectOne(`${service.api}`, mockbody);

    expect(request.request.method).toBe('POST');

    expect(request.request.body).toEqual(dummyPackageAdd);
    
    request.flush(dummyPackageAdd);
  });

  
  it('Package should update',() => {

    const dummyPackage =
      {id:'121',Package:'xyz'};

    service.updatePackageById(mockid,mockbody).subscribe(values => {
      expect(values.id).toBe('121');
      expect(values).toEqual(dummyPackage);
    });

    const request = httpmock.expectOne(`${service.api}/${mockid}`, mockbody);

    expect(request.request.method).toBe('PUT');

    request.flush(dummyPackage);
  });

  // it('deletePackage should return null',() => {
    
  //   // const dummyFeesDelete =
  //   //   {id:'121'};
  //   service.deletePackagebyId(mockid).subscribe(values => {
  //     // expect(values.id).toBe('121');
  //     expect(values).toEqual(null);
  //   });
  
  // const request = httpmock.expectOne(`${service.api}/${mockid}`);

  // expect(request.request.method).toBe('DELETE');

  // // request.flush(dummyFeesDelete);
  // });
});
