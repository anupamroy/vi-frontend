import { Component, OnInit } from '@angular/core';
import { InstituteTypeService} from '../../../../institute-type.service'
import { catchError, tap, map } from 'rxjs/operators'; 
import { templateJitUrl } from '@angular/compiler';


@Component({
  selector: 'app-list-institute-type',
  templateUrl: './list-institute-type.component.html',
  styleUrls: ['./list-institute-type.component.scss']
})
export class ListInstituteTypeComponent implements OnInit {

  institute_Type : any;
  temp=[]
  finalItems : any
  constructor(private InstituteTypeService : InstituteTypeService) { }

  onDelete(id: string){
    alert("Are You Sure ?")
    fetch(`https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/org/${id}`, {
      method: 'DELETE'
    }).then((res) => {
      console.log(res)

      this.finalItems = this.finalItems.filter((item) => {
        return item.itemId !== id;
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  ngOnInit(): void {
       fetch('https://r3mm6rz433.execute-api.us-east-1.amazonaws.com/Prod/org/all')
    .then( res=> res.json())
    .then( res => {
      this.institute_Type = JSON.parse(res).Items;
      console.log(this.institute_Type)

      let temp= []
      this.institute_Type.forEach(record => {
        if(record.instituteType){
          temp.push(record)
        }
      })
      this.finalItems = temp
    })
    .catch(err => console.log(err))
  }

    

}

