// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from "ngx-spinner";
// Components Routing
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { BrandListComponent } from './brands/brand-list/brand-list.component';
import { PaginationModule } from 'ngx-bootstrap';
import { BrandAddComponent } from './brands/brand-add/brand-add.component';
import { TypeListComponent } from './audit-type/type-list/type-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TypeAddComponent } from './audit-type/type-add/type-add.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MaintenanceRoutingModule,
    PaginationModule,
    NgSelectModule
  ],
  declarations: [
    BrandListComponent,
    BrandAddComponent,
    TypeListComponent,
    TypeAddComponent
  ]
})
export class MaintenanceModule {}
