import { Component, OnInit, ViewChild } from '@angular/core';
import { GlueIngredientService } from '../../../_core/_services/glue-ingredient.service';
import { GlueService } from '../../../_core/_services/glue.service';
import { IGlue } from '../../../_core/_models/Glue';
import { IGlueIngredient } from '../../../_core/_models/glue-ingredient';
import { IIngredient } from '../../../_core/_models/Ingredient';
import { AlertifyService } from '../../../_core/_services/alertify.service';
import { ChartDataService } from '../../../_core/_services/chart-data.service';
import { AccumulationChartComponent, IAccLoadedEventArgs, AccumulationTheme, AccumulationChart } from '@syncfusion/ej2-angular-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions } from 'chart.js';
import { PaginatedResult, Pagination } from '../../../_core/_models/pagination';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-glue-ingredient',
  templateUrl: './glue-ingredient.component.html',
  styleUrls: ['./glue-ingredient.component.scss']
})
export class GlueIngredientComponent implements OnInit {

  public glues: object[];
  public ingredients: IIngredient[];
   paginationG: Pagination;
   paginationI: Pagination;
   glueid: number;
   percentage: number;
   gIchecked: boolean;
  constructor(
    private glueIngredientService: GlueIngredientService,
    private glueService: GlueService,
    private alertify: AlertifyService,
    private chartDataService: ChartDataService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.resolver();
    this.paginationI = {
      currentPage : 1,
      itemsPerPage: 10,
      totalItems: 0,
      totalPages: 0
    }
  }
  resolver() {
    this.route.data.subscribe(data => {
      this.glues = data['glues'].result;
      this.paginationG = data['glues'].pagination;
      console.log(this.paginationG)
      console.log(this.paginationG.totalItems);
    });
  }
  async onOff($event, item) {
    console.log('onOff: ', $event);
    if ($event.checked) {
      const { value: percentage } = await this.alertify.$swal.fire({
        value: item.percentage,
        title: 'How many percentage do you want to enter?',
        input: 'number',
        inputPlaceholder: 'Enter percentage',
        inputAttributes: {
          // maxlength: 10,
          // autocapitalize: 'off',
          // autocorrect: 'off'
        }
      });
      this.percentage = percentage;
      const glueIngredient = {
        ingredientid: item.id,
        percentage,
        glueid: this.glueid
      };
      this.mapGlueIngredient(glueIngredient);
    console.log('onOff: ', this.percentage, this.glueid);

    } else {
      this.delete(item.id, this.glueid);
    }
  }
  getIngredients() {
    // this.spinner.show();
     this.glueIngredientService.getIngredients(this.glueid, this.paginationI.currentPage, this.paginationI.itemsPerPage)
       .subscribe((res: PaginatedResult<IIngredient[]>) => {
         console.log('Ingredients: ', res)
         this.ingredients = res.result;
          this.paginationI = res.pagination;
     //    this.spinner.hide();
       }, error => {
         this.alertify.error(error);
       });
   }
   onClickGlue($event, item) {
    console.log('onClickGlue: ', $event);
    console.log('onClickGlue: ', item);
    this.glueid = item.id;
    this.getIngredients();
   }
   onPageChange($event) {
    this.paginationG.currentPage = $event;
    this.getGlues();
  }
  onPageChangeI($event) {
    this.paginationI.currentPage = $event;
    this.getIngredients();
  }
   getGlues() {
    // this.spinner.show();
     this.glueIngredientService.getGlues(this.paginationG.currentPage, this.paginationG.itemsPerPage)
       .subscribe((res: PaginatedResult<IGlue[]>) => {
         console.log('Glues: ', res)
         this.glues = res.result;
         this.paginationG = res.pagination;
     //    this.spinner.hide();
       }, error => {
         this.alertify.error(error);
       });
   }
   mapGlueIngredient(glueIngredient) {
     this.glueIngredientService.mappGlueIngredient(glueIngredient).subscribe( res => {
       this.alertify.success('Glue and Ingredient have been mapping!');
     });
   }
   delete(glueid, ingredient) {
    this.glueIngredientService.delete(glueid, ingredient).subscribe( res => {
      this.alertify.success('Glue and Ingredient have been deleted!');
    });
  }
}
