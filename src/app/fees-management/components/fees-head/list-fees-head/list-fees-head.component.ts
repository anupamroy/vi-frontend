import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FeesService } from '../../../services/fees.service';
import FeesHeadModel from '../../../models/fees-head.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-fees-head',
  templateUrl: './list-fees-head.component.html',
  styleUrls: ['./list-fees-head.component.scss'],
})
export class ListFeesHeadComponent implements OnInit {
  feesHeadList: Array<FeesHeadModel>;

  constructor(private feesService: FeesService) {}

  ngOnInit(): void {
    this.feesService.getFeesHeads().subscribe(
      (data) => {
        this.feesHeadList = JSON.parse(data).Items.map((item) => {
          return new FeesHeadModel({
            feesHeadId: item.fees_head_id,
            feesHeadName: item.feesHeadName,
            instituteType: item.instituteType,
            isActivated: item.isActivated,
            parentFees: item.parentFees,
          });
        });
        console.log(this.feesHeadList);
      },
      (error) => console.error(error)
    );
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
        // tslint:disable-next-line: deprecation
        this.feesService.deleteFeesHeadById(id).subscribe(
          (res) => {
            this.feesHeadList = this.feesHeadList.filter((item) => {
              return item.feesHeadId !== id;
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

  activateFeesHead(id: string): void {
    Swal.fire({
      title: 'Are you sure you want to activate?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: "#DD6B55"
    }).then((result) => {
      if(result.isConfirmed) {
        // Activate Logic
        console.log('Activate')

        const selectedFeesHead: FeesHeadModel = Object.assign(
          this.feesHeadList.find((item) => item.feesHeadId === id)
        );
        // console.log(selectedFeesHead);
        if (selectedFeesHead) {
          this.feesService
            .updateFeesHeadById(selectedFeesHead.feesHeadId, {
              attribute: [
                'instituteType',
                'feesHeadName',
                'parentFees',
                'isActivated',
              ],
              value: [
                selectedFeesHead.instituteType,
                selectedFeesHead.feesHeadName,
                selectedFeesHead.parentFees,
                (selectedFeesHead.isActivated = true),
              ],
            })
            .subscribe(
              (data) => {
                console.log(data);
                if (data) {
                  this.feesHeadList.find(
                    (item) => item.feesHeadId === id
                  ).isActivated = true;
                }
              },
              (error) => console.error(error)
            );
        }

        Swal.fire('Activated!', 'Your Fees Head has been activated', 'success');
      } else if(result.isDismissed) {
        Swal.fire('Cancelled!', 'Your Fees Head is not activated', 'error');
      }
    })
  }

  deactivateFeesHead(id: string): void {
    Swal.fire({
      title: 'Are you sure you want to deactivate?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: "#DD6B55"
    }).then((result) => {
      if(result.isConfirmed) {
        // Deactivate Logic
        console.log('Deactivate')

        const selectedFeesHead: FeesHeadModel = Object.assign(
          this.feesHeadList.find((item) => item.feesHeadId === id)
        );
        // console.log(selectedFeesHead);
        if (selectedFeesHead) {
          this.feesService
            .updateFeesHeadById(selectedFeesHead.feesHeadId, {
              attribute: [
                'instituteType',
                'feesHeadName',
                'parentFees',
                'isActivated',
              ],
              value: [
                selectedFeesHead.instituteType,
                selectedFeesHead.feesHeadName,
                selectedFeesHead.parentFees,
                (selectedFeesHead.isActivated = false),
              ],
            })
            .subscribe(
              (data) => {
                console.log(data);
                if (data) {
                  this.feesHeadList.find(
                    (item) => item.feesHeadId === id
                  ).isActivated = false;
                }
              },
              (error) => console.error(error)
            );
        }

        Swal.fire('Deactivated!', 'Your Fees Head has been deactivated', 'success');
      } else if(result.isDismissed) {
        Swal.fire('Cancelled!', 'Your Fees Head is not deactivated', 'error');
      }
    })
  }
}
