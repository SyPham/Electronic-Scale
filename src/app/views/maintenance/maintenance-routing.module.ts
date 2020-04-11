import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandListComponent } from './brands/brand-list/brand-list.component';
import { BrandListResolver } from '../../_core/_resolvers/brand-list.resolver';
import { BrandAddComponent } from './brands/brand-add/brand-add.component';
import { CategoryListResolver } from '../../_core/_resolvers/category-list.resolver';
import { TypeListComponent } from './audit-type/type-list/type-list.component';
import { TypeAddComponent } from './audit-type/type-add/type-add.component';
import { AuditTypeListResolver } from '../../_core/_resolvers/audit-type-list.resolver';



const routes: Routes = [
  {
    path: "",
    data: {
      title: "Maintenance"
    },
    children: [
      {
        path: "brand",
        children:
          [
            {
              path: "",
              component: BrandListComponent,
              resolve: { brands: BrandListResolver },
              data: {
                title: "Brand"
              }
            },
            {
              path: "add",
              component: BrandAddComponent,
              data: {
                title: "Add new brand"
              }
            }
          ]
      },
      {
        path: "audit-type",
        children:
          [
            {
              path: "",
              component: TypeListComponent,
              resolve: { auditTypes: AuditTypeListResolver },
              data: {
                title: "Audit Types"
              }
            },
            {
              path: "add",
              component: TypeAddComponent,
              data: {
                title: "Add new audit type"
              }
            }
          ]
      },
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
