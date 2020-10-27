import { TestBed } from '@angular/core/testing';

import { AssociatedPostService } from './associated-post.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AssociatedPostService', () => {
  let service: AssociatedPostService;
  let httpmock: HttpTestingController;
  let mockid:string;
  let mockbody:any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[AssociatedPostService]

    });
    service = TestBed.inject(AssociatedPostService);
    httpmock = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpmock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrive AssociatedPost from the API via GET',()=>{
    const dummyAsstPost =[
      {AsstPost:'xyz'},
      {AsstPost:'qwe'},
    ];

    service.getAssociatedPost().subscribe(values=>{
      expect(values.length).toBe(2);
      expect(values).toEqual(dummyAsstPost);
    });

    const request = httpmock.expectOne(`${service.api}/all`);

    expect(request.request.method).toBe('GET');

    request.flush(dummyAsstPost);
  });

  it('AssociatedPost should add',()=>{
    const dummyAddAsstPost =
    [
      {AsstPost:'xyz'},
      {AsstPost:'qwe'},
    ];
    service.addAssociatedPost(dummyAddAsstPost).subscribe(values=>{
      // expect(values.length).toBe(2);
      expect(values).toEqual(dummyAddAsstPost);
    });

    const request = httpmock.expectOne(`${service.api}`, mockbody);

    expect(request.request.method).toBe('POST');

    expect(request.request.body).toEqual(dummyAddAsstPost);
    
    request.flush(dummyAddAsstPost);
  });
  
  it('updateAssociatedPost should update',() => {

    const dummyAsstPost =
      {id:'121',AsstPost:'xyz'};

    // mockid='1';
    // mockbody='test';
    service.updateAssociatedPostById(mockid,mockbody).subscribe(values => {
      expect(values.id).toBe('121');
      expect(values).toEqual(dummyAsstPost);
    });

    const request = httpmock.expectOne(`${service.api}/${mockid}`, mockbody);

    expect(request.request.method).toBe('PUT');

    request.flush(dummyAsstPost);
  });

  // it('deleteAssociatedPost should return null',() => {
    
  //   // const dummyFeesDelete =
  //   //   {id:'121'};
  //   service.deleteAssociatedPostById(mockid,mockbody).subscribe(values => {
  //     // expect(values.id).toBe('121');
  //     expect(values).toEqual(null);
  //   });
  
  // const request = httpmock.expectOne(`${service.api}/${mockid}`, mockbody);

  // expect(request.request.method).toBe('PUT');

  // // request.flush(dummyFeesDelete);
  // });
});
