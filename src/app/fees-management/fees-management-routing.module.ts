import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFeesHeadComponent } from './components/fees-head/add-fees-head/add-fees-head.component';
import { EditFeesHeadComponent } from './components/fees-head/edit-fees-head/edit-fees-head.component';
import { ListFeesHeadComponent } from './components/fees-head/list-fees-head/list-fees-head.component';
import { FeesManagementComponent } from './fees-management.component';

const routes: Routes = [
  {
    path: '',
    component: FeesManagementComponent,
    children: [
      {
        path: 'fees-head',
        component: FeesManagementComponent,
        children: [
          { path: 'add', component: AddFeesHeadComponent },
          { path: '', component: ListFeesHeadComponent },
          {
            path: 'edit/:id',
            component: EditFeesHeadComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeesManagementRoutingModule {}
