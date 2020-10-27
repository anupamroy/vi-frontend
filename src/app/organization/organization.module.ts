import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './organization.component';
import { AddMastersComponent } from './components/add-masters/add-masters.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { InstituteTypeComponent } from './components/institute-type/institute-type/institute-type.component';
import { EditInstituteTypeComponent } from './components/institute-type/edit-institute-type/edit-institute-type.component';
import { ListInstituteTypeComponent } from './components/institute-type/list-institute-type/list-institute-type.component';
import { ViewMastersComponent } from './components/view-masters/view-masters.component';
import { EditMastersComponent } from './components/edit-masters/edit-masters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAssociatedPostComponent } from './components/associated-post/add-associated-post/add-associated-post.component';
import { EditAssociatedPostComponent } from './components/associated-post/edit-associated-post/edit-associated-post.component';
import { ListAssociatedPostComponent } from './components/associated-post/list-associated-post/list-associated-post.component';
import { AddOrgCategoryComponent } from './components/org-category/add-org-category/add-org-category.component';
import { EditOrgCategoryComponent } from './components/org-category/edit-org-category/edit-org-category.component';
import { ViewOrgCategoryComponent } from './components/org-category/view-org-category/view-org-category.component';
import { AddFeesTypeComponent } from './components/fees-type/add-fees-type/add-fees-type.component';
import { EditFeesTypeComponent } from './components/fees-type/edit-fees-type/edit-fees-type.component';
import { ListFeesTypeComponent } from './components/fees-type/list-fees-type/list-fees-type.component';
import { AddAccountsHeadComponent } from './components/accounts-head/add-accounts-head/add-accounts-head.component';
import { EditAccountsHeadComponent } from './components/accounts-head/edit-accounts-head/edit-accounts-head.component';
import { ListAccountsHeadComponent } from './components/accounts-head/list-accounts-head/list-accounts-head.component';
import { AddModuleComponent } from './components/module/add-module/add-module.component';
import { EditModuleComponent } from './components/module/edit-module/edit-module.component';
import { ListModuleComponent } from './components/module/list-module/list-module.component';
import { ListOrganizationComponent } from './components/list-organization/list-organization.component';
import { AddPackageComponent } from './components/packages-master/add-package/add-package.component';
import { EditPackageComponent } from './components/packages-master/edit-package/edit-package.component';
import { ListPackageComponent } from './components/packages-master/list-package/list-package.component';
import { ListDetailOrganizationComponent } from './components/list-detail-organization/list-detail-organization.component';
import { AddOrganizationComponent } from './components/add-organization/add-organization.component';
import { EditOrganizationComponent } from './components/edit-organization/edit-organization.component';

@NgModule({
    declarations: [
        OrganizationComponent,
        AddMastersComponent,
        AdminDashboardComponent,
        InstituteTypeComponent,
        EditInstituteTypeComponent,
        ListInstituteTypeComponent,
        ViewMastersComponent,
        EditMastersComponent,
        AddAssociatedPostComponent,
        EditAssociatedPostComponent,
        ListAssociatedPostComponent,
        AddOrgCategoryComponent,
        EditOrgCategoryComponent,
        ViewOrgCategoryComponent,
        AddFeesTypeComponent,
        EditFeesTypeComponent,
        ListFeesTypeComponent,
        AddAccountsHeadComponent,
        EditAccountsHeadComponent,
        ListAccountsHeadComponent,
        AddModuleComponent,
        EditModuleComponent,
        ListModuleComponent,
        ListOrganizationComponent,
        AddPackageComponent,
        EditPackageComponent,
        ListPackageComponent,
        ListDetailOrganizationComponent,
        AddOrganizationComponent,
        EditOrganizationComponent
    ],
    imports: [CommonModule, OrganizationRoutingModule, FormsModule, ReactiveFormsModule],
})
export class OrganizationModule {}
