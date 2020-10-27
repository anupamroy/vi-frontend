import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FeesService } from '../../../services/fees.service';
import { FeesHead } from '../../../models/fees-head.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-fees-head',
  templateUrl: './list-fees-head.component.html',
  styleUrls: ['./list-fees-head.component.scss'],
})
export class ListFeesHeadComponent implements OnInit {
  feesHeadList: any;
  final_items: any;

  constructor(private feesService: FeesService) { }

  ngOnInit(): void {
    this.feesService.getFeesHeads().subscribe(
      (data) => {
        this.feesHeadList = JSON.parse(data).Items
        let temp = [];
        this.feesHeadList.forEach(record => {
          if (record.isDeleted === false && record.itemId === 'FEES_HEAD') {
            temp.push(record);
          }
        })

        this.final_items = temp;
        console.log(this.final_items);
      },
      (error) => console.error(error)
    );
  }

  processObjUpdated(object: FeesHead){
    var attribute = [];
    var value = [];
    for (const key in object) {
      if (key !== 'itemId') {
        attribute.push(key);
        value.push(object[key]);
      }
    }
  }

  onDelete(id: string): void {
    Swal.fire({
      title: 'Are you sure you want to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showCloseButton: true,
    }).then((result) => {
      if (result.value) {
        var obj = new FeesHead();
        obj.isDeleted = true;

        this.feesService.deleteFeesHeadById(id, this.processObjUpdated(obj)).subscribe(
          (res) => {
            this.final_items = this.final_items.filter((item) => {
              return item.institue_type !== id;
            });
          },
          (error) => console.error(error)
        );
        Swal.fire('Deleted!', 'Fees Head has been deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled!', 'Nothing Deleted', 'error');
      }
    });
  }

    // activateFeesHead(id: string): void {
      // Swal.fire({
      //   title: 'Are you sure you want to activate?',
      //   icon: 'warning',
      //   showCancelButton: true,
      //   confirmButtonText: 'Yes',
      //   cancelButtonText: 'No',
      //   confirmButtonColor: "#DD6B55"
      // }).then((result) => {
      //   if(result.isConfirmed) {
      //     // Activate Logic
      //     console.log('Activate')

      //     const selectedFeesHead: FeesHead = Object.assign(
      //       this.feesHeadList.find((item) => item.feesHeadId === id)
      //     );
      //     // console.log(selectedFeesHead);
      //     if (selectedFeesHead) {
      //       this.feesService
      //         .updateFeesHeadById(selectedFeesHead.feesHeadId, {
      //           attribute: [
      //             'instituteType',
      //             'feesHeadName',
      //             'parentFees',
      //             'isActivated',
      //           ],
      //           value: [
      //             selectedFeesHead.instituteType,
      //             selectedFeesHead.feesHeadName,
      //             selectedFeesHead.parentFees,
      //             (selectedFeesHead.isActivated = true),
      //           ],
      //         })
      //         .subscribe(
      //           (data) => {
      //             console.log(data);
      //             if (data) {
      //               this.feesHeadList.find(
      //                 (item) => item.feesHeadId === id
      //               ).isActivated = true;
      //             }
      //           },
      //           (error) => console.error(error)
      //         );
      //     }

      //     Swal.fire('Activated!', 'Your Fees Head has been activated', 'success');
      //   } else if(result.isDismissed) {
      //     Swal.fire('Cancelled!', 'Your Fees Head is not activated', 'error');
      //   }
      // })

    // deactivateFeesHead(id: string): void {
      //   Swal.fire({
      //     title: 'Are you sure you want to deactivate?',
      //     icon: 'warning',
      //     showCancelButton: true,
      //     confirmButtonText: 'Yes',
      //     cancelButtonText: 'No',
      //     confirmButtonColor: "#DD6B55"
      //   }).then((result) => {
      //     if(result.isConfirmed) {
      //       // Deactivate Logic
      //       console.log('Deactivate')

      //       const selectedFeesHead: FeesHead = Object.assign(
      //         this.feesHeadList.find((item) => item.feesHeadId === id)
      //       );
      //       // console.log(selectedFeesHead);
      //       if (selectedFeesHead) {
      //         this.feesService
      //           .updateFeesHeadById(selectedFeesHead.feesHeadId, {
      //             attribute: [
      //               'instituteType',
      //               'feesHeadName',
      //               'parentFees',
      //               'isActivated',
      //             ],
      //             value: [
      //               selectedFeesHead.instituteType,
      //               selectedFeesHead.feesHeadName,
      //               selectedFeesHead.parentFees,
      //               (selectedFeesHead.isActivated = false),
      //             ],
      //           })
      //           .subscribe(
      //             (data) => {
      //               console.log(data);
      //               if (data) {
      //                 this.feesHeadList.find(
      //                   (item) => item.feesHeadId === id
      //                 ).isActivated = false;
      //               }
      //             },
      //             (error) => console.error(error)
      //           );
      //       }

      //       Swal.fire('Deactivated!', 'Your Fees Head has been deactivated', 'success');
      //     } else if(result.isDismissed) {
      //       Swal.fire('Cancelled!', 'Your Fees Head is not deactivated', 'error');
      //     }
      //   })
      // }


}