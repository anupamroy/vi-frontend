import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAccountsHeadComponent } from './components/accounts-head/add-accounts-head/add-accounts-head.component';
import { EditAccountsHeadComponent } from './components/accounts-head/edit-accounts-head/edit-accounts-head.component';
import { ListAccountsHeadComponent } from './components/accounts-head/list-accounts-head/list-accounts-head.component';
import { AddMastersComponent } from './components/add-masters/add-masters.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddAssociatedPostComponent } from './components/associated-post/add-associated-post/add-associated-post.component';
import { EditAssociatedPostComponent } from './components/associated-post/edit-associated-post/edit-associated-post.component';
import { ListAssociatedPostComponent } from './components/associated-post/list-associated-post/list-associated-post.component';
import { EditMastersComponent } from './components/edit-masters/edit-masters.component';
import { AddFeesTypeComponent } from './components/fees-type/add-fees-type/add-fees-type.component';
import { EditFeesTypeComponent } from './components/fees-type/edit-fees-type/edit-fees-type.component';
import { ListFeesTypeComponent } from './components/fees-type/list-fees-type/list-fees-type.component';
import { EditInstituteTypeComponent } from './components/institute-type/edit-institute-type/edit-institute-type.component';
import { InstituteTypeComponent } from './components/institute-type/institute-type/institute-type.component';
import { ListInstituteTypeComponent } from './components/institute-type/list-institute-type/list-institute-type.component';
import { AddOrgCategoryComponent } from './components/org-category/add-org-category/add-org-category.component';
import { EditOrgCategoryComponent } from './components/org-category/edit-org-category/edit-org-category.component';
import { ViewOrgCategoryComponent } from './components/org-category/view-org-category/view-org-category.component';
import { ViewMastersComponent } from './components/view-masters/view-masters.component';
import { OrganizationComponent } from './organization.component';
import { AddModuleComponent } from './components/module/add-module/add-module.component'
import { EditModuleComponent } from './components/module/edit-module/edit-module.component'
import { ListModuleComponent } from './components/module/list-module/list-module.component'
import { ListOrganizationComponent } from './components/list-organization/list-organization.component';
import { AddPackageComponent } from './components/packages-master/add-package/add-package.component';
import { ListPackageComponent } from './components/packages-master/list-package/list-package.component';
import { EditPackageComponent } from './components/packages-master/edit-package/edit-package.component';


const routes: Routes = [
  {
    path: '',
    component: OrganizationComponent,
    children: [
      {
        path: 'add-masters',
        component: AddMastersComponent,
      },
      {
        path: 'view-masters',
        component: ViewMastersComponent,
      },
      {
        path: 'edit-masters',
        component: EditMastersComponent,
      },
      { path: 'add-institute-type', component: InstituteTypeComponent },
      { path: 'add-module', component: AddModuleComponent },

      { path: '', component: AdminDashboardComponent },
      { path: 'add-org-category', component: AddOrgCategoryComponent},
      { path: 'add-fees-type', component: AddFeesTypeComponent},
      { path: 'add-accounts-head', component: AddAccountsHeadComponent },
      { path: 'add-package', component: AddPackageComponent }
    ],
  },

  { path: 'list-institute-type', component: ListInstituteTypeComponent },
  { path: 'list-module', component: ListModuleComponent },
  { path: 'edit-module/:parentModule', component: EditModuleComponent },


  {
    path: 'edit-institute-type/:itemId/:instituteType',
    component: EditInstituteTypeComponent,
  },
  { path: 'add-associated-post', component: AddAssociatedPostComponent },
  { path: 'edit-associated-post/:id/:associated_post', component: EditAssociatedPostComponent },
  { path: 'list-associated-post', component: ListAssociatedPostComponent },
  { path: 'list-org-category', component: ViewOrgCategoryComponent },
  { path: 'edit-org-category/:itemId', component: EditOrgCategoryComponent },
  { path: 'list-fees-type', component: ListFeesTypeComponent},
  { path: 'edit-fees-type/:itemId', component: EditFeesTypeComponent},
  { path: 'list-accounts-head', component: ListAccountsHeadComponent},
  { path: 'edit-accounts-head/:itemId', component: EditAccountsHeadComponent},
  { path: 'list-organization', component: ListOrganizationComponent },
  { path: 'list-packages' , component: ListPackageComponent },
  { path: 'edit-package/:itemId' , component: EditPackageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule {}
