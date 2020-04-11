import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MakeGlueService } from '../../../_core/_services/make-glue.service';
import { GlueService } from '../../../_core/_services/glue.service';
import { IGlue } from '../../../_core/_models/Glue';
import { IMakeGlue } from '../../../_core/_models/make-glue';
import { IIngredient } from '../../../_core/_models/Ingredient';
import { AlertifyService } from '../../../_core/_services/alertify.service';
import { ChartDataService } from '../../../_core/_services/chart-data.service';
import { AccumulationChartComponent, IAccLoadedEventArgs, AccumulationTheme, AccumulationChart } from '@syncfusion/ej2-angular-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-make-glue',
  templateUrl: './make-glue.component.html',
  styleUrls: ['./make-glue.component.scss']
})
export class MakeGlueComponent implements OnInit {
  // defined the array of data
  // public data: string[] = ['Snooker', 'Tennis', 'Cricket', 'Football', 'Rugby'];
  public glues: IGlue[];
  public makeData: IGlue;
  public makeGlue: IMakeGlue[];
  public ingredients: IIngredient[];
  public fields: Object = { text: 'name', value: 'id' };
  public inputIngredient: number;
  public weight: number;
  show: boolean;
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          // console.log('formatter: ', ctx, value);
          // const label = ctx.chart.data.labels[ctx.dataIndex];
          return value + 'kg';
        },
      },
    }
  };
  public pieChartLabels: string[];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType = 'pie';
  public pieChartPlugins = [pluginDataLabels];
  constructor(
    private makeGlueService: MakeGlueService,
    private glueService: GlueService,
    private alertify: AlertifyService,
    private chartDataService: ChartDataService
  ) { }

  ngOnInit() {
    this.getAllGlue();
  }
  async onChangeInput($event) {
    console.log('onChangeInput: ', $event);
    const { value: weight } = await this.alertify.$swal.fire({
      title: 'How many amount do you want to mix?',
      input: 'number',
      inputPlaceholder: 'Enter amount'
    });
    this.weight = weight;
    if (this.weight) {
      this.alertify.message(`Entered amount: ${this.weight}`);
      this.getGlueWithIngredientByGlueCode($event.target.value);
    }
  }
  getAllGlue() {
    this.makeGlueService.getAllGlues().subscribe((res) => {
      console.log('getAllGlue', res);
      this.glues = res;
    });
  }
  onChange($event, percentage) {
    console.log('onChange: ', $event);
    let weight = parseFloat($event.target.value);
    let weight2 = Math.round(this.weight * percentage) / 100;
    if (weight > weight2) {
      this.alertify.message('Da vuot qua so can');
    }
  }
  async change($event) {
    console.log($event);
    this.show = true;
    const { value: weight } = await this.alertify.$swal.fire({
      title: 'How many kilogram do you want to mix?',
      input: 'number',
      inputPlaceholder: 'Enter kilogram',
      inputAttributes: {
        // maxlength: 10,
        // autocapitalize: 'off',
        // autocorrect: 'off'
      }
    });
    this.weight = weight;
    if (this.weight) {
      this.alertify.message(`Entered kilogram: ${this.weight}`);
    }
    this.getMakeGlueByGlueID($event.value);
  }
  suggestion(percentage) {
    return (Math.round(this.weight * percentage) / 100) + 'kg';
  }
  getMakeGlueByGlueID(id: number) {
    this.makeGlueService.getMakeGlueByGlueID(id).subscribe((res) => {
      console.log('getMakeGlueByGlueID: ', res['ingredients']);
      this.ingredients = res['ingredients'];
      this.pieChartLabels = this.ingredients.map(item => {
        return item.name;
      });
      this.pieChartData = this.ingredients.map(item => {
        return (Math.round(this.weight * item.percentage) / 100);
      });
    });
  }
  // 09978373
  getGlueWithIngredientByGlueCode(code: string) {
    this.makeGlueService.getGlueWithIngredientByGlueCode(code).subscribe((res) => {
      if (res['id'] === 0) {
        this.alertify.warning('Glue Code is not available!', true);
        this.show = false;
      } else {
        this.show = true;
        this.makeGlue = res;
        console.log(`getGlueWithIngredientByGlueCode: ${code} `, res['ingredients']);
        this.ingredients = res['ingredients'];
        this.loadDataChart();
      }
    });
  }

  loadDataChart() {
    this.pieChartLabels = this.ingredients.map(item => {
      return item.name;
    });
    this.pieChartData = this.ingredients.map(item => {
      const dataitem = (Math.round(this.weight * item.percentage) / 100);
      console.log('dataitem: ', dataitem);
      return dataitem;
    });
    console.log('labels: ', this.pieChartLabels);
    console.log('dataChart: ', this.pieChartData);
  }
  chartHovered($event) {

  }
  chartClicked($event) { }

}
