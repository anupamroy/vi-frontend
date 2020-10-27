import { TestBed } from '@angular/core/testing';

import { OrganizationCategoryService } from './organization-category.service';


import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('OrganizationCategoryService', () => {
  let service: OrganizationCategoryService;
  let httpmock: HttpTestingController;
  let mockid:string;
  let mockbody:any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[OrganizationCategoryService]
    });
    service = TestBed.inject(OrganizationCategoryService);
    httpmock = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpmock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrive OrganizationCategory from the API via GET',()=>{
    const dummyOrgCtg =[
      {OrgCtg:'xyz'},
      {OrgCtg:'qwe'},
    ];

    service.getOrganizationCategory().subscribe(values=>{
      expect(values.length).toBe(2);
      expect(values).toEqual(dummyOrgCtg);
    });

    const request = httpmock.expectOne(`${service.api}/all`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyOrgCtg);
  });
  
  it('OrganizationCategory should add',()=>{
    const dummyAddOrg =
    [
      {OrgCtg:'xyz'},
      {OrgCtg:'qwe'},
    ];
    service.addOrganizationCategory(dummyAddOrg).subscribe(values=>{
      // expect(values.length).toBe(2);
      expect(values).toEqual(dummyAddOrg);
    });

    const request = httpmock.expectOne(`${service.api}`, mockbody);

    expect(request.request.method).toBe('POST');

    expect(request.request.body).toEqual(dummyAddOrg);
    
    request.flush(dummyAddOrg);
  });

  it('updateOrganization should update',() => {

    const dummyOrgCtg =
      {id:'121',OrgCtg:'xyz'};

    service.updateOrganizationById(mockid,mockbody).subscribe(values => {
      expect(values.id).toBe('121');
      expect(values).toEqual(dummyOrgCtg);
    });

    const request = httpmock.expectOne(`${service.api}/${mockid}`, mockbody);

    expect(request.request.method).toBe('PUT');

    request.flush(dummyOrgCtg);
  });

  // it('deleteOrganization should return null',() => {
    
  //   // const dummyFeesDelete =
  //   //   {id:'121'};
  //   service.deleteOrganizationById(mockid).subscribe(values => {
  //     // expect(values.id).toBe('121');
  //     expect(values).toEqual(null);
  //   });
  
  // const request = httpmock.expectOne(`${service.api}/${mockid}`);

  // expect(request.request.method).toBe('DELETE');

  // // request.flush(dummyFeesDelete);
  // });
});

