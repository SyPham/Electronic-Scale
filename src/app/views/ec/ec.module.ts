// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
// Components Routing
import { ECRoutingModule } from './ec-routing.module';
import { PaginationModule } from 'ngx-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { GlueIngredientComponent } from './glue-ingredient/glue-ingredient.component';
import { GlueComponent } from './glue/glue.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { GlueModalComponent } from './glue/glue-modal/glue-modal.component';
import { IngredientModalComponent } from './ingredient/ingredient-modal/ingredient-modal.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Import ngx-barcode module
import { NgxBarcodeModule } from 'ngx-barcode';
import { BarcodeGeneratorAllModule, DataMatrixGeneratorAllModule } from '@syncfusion/ej2-angular-barcode-generator';
import { ChartAllModule, AccumulationChartAllModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { ChartsModule } from 'ng2-charts';
import { MakeGlueComponent } from './make-glue/make-glue.component';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { GridModule } from '@syncfusion/ej2-angular-grids';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ECRoutingModule,
    PaginationModule,
    NgSelectModule,
    DropDownListModule,
    NgbModule,
    ChartsModule,
    NgxBarcodeModule,
    ChartAllModule,
    AccumulationChartAllModule,
    RangeNavigatorAllModule,
    BarcodeGeneratorAllModule,
    DataMatrixGeneratorAllModule,
    SwitchModule,
    GridModule
  ],
  declarations: [
    GlueIngredientComponent,
    GlueComponent,
    IngredientComponent,
    GlueModalComponent,
    IngredientModalComponent,
    MakeGlueComponent
  ],
  entryComponents: [GlueModalComponent, IngredientModalComponent, MakeGlueComponent]
})
export class ECModule { }
