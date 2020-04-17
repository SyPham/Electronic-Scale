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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlueModalComponent } from '../glue/glue-modal/glue-modal.component';
import { PageSettingsModel, GridComponent } from '@syncfusion/ej2-angular-grids';

import { EditService, ToolbarService, PageService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-glue-ingredient',
  templateUrl: './glue-ingredient.component.html',
  styleUrls: ['./glue-ingredient.component.scss'],
  providers: [ToolbarService, EditService, PageService]
})
export class GlueIngredientComponent implements OnInit {
  data: IGlue[];
  glue: IGlue = {
    id: 0,
    name: '',
    code: '',
    createdDate: ''
  };
  show: boolean;
  public pageSettings: PageSettingsModel;
  pagination: Pagination;
  page = 1 ;
  public glues: Object[];
  public ingredients: IIngredient[];
   paginationG: Pagination;
   paginationI: Pagination;
   glueid: number;
   percentage: number;
   gIchecked: boolean;
   public editSettings: Object;
    public toolbar: string[];
    public orderidrules: Object;
    public customeridrules: Object;
    public freightrules: Object;
    public editparams: Object;
    @ViewChild('grid')
    public grid: GridComponent;
  constructor(
    private glueIngredientService: GlueIngredientService,
    private glueService: GlueService,
    private alertify: AlertifyService,
    public modalService: NgbModal,
    private chartDataService: ChartDataService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.resolver();
    this.pageSettings = { pageSize: 6 };

    this.paginationI = {
      currentPage : 1,
      itemsPerPage: 10,
      totalItems: 0,
      totalPages: 0
    };
    this.editSettings = { showDeleteConfirmDialog: true, allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.toolbar = ['Add', 'Edit', 'Delete'];
    this.orderidrules = { required: true, number: true };
    this.customeridrules = { required: true };
    this.freightrules =  { required: true };
    this.editparams = { params: { popupHeight: '300px' }};
  }
  dataBound(args: any) {
    this.grid.hideColumns(['code', 'code']); // show by HeaderText
    this.grid.hideColumns(['createdDate', 'createdDate']); // show by HeaderText
    // (this.grid.columns[0] as any).isPrimaryKey = 'true';
    // for (const cols of this.grid.columns) {
    //   if ((cols as any).field === 'id') {
    //       (cols as any).width = 120;
    //   }
    //   if ((cols as any).field === 'createdDate') {
    //       (cols as any).type = 'date';
    //       (cols as any).format = 'yMd';
    //   }
    //   if ((cols as any).field === 'name') {
    //       (cols as any).format = 'text';
    //   }
    // }
    // this.grid.refreshColumns();
  }
  rowSelected(args: any ){
    console.log("rowSelected :", args);
    this.glueid = args.data.id;
    this.getIngredients();
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
       .subscribe((res: PaginatedResult<Object[]>) => {
         console.log('Glues: ', res);
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
  deleteGlue(glue: IGlue) {
    this.alertify.confirm('Delete Glue', 'Are you sure you want to delete this GlueID "' + glue.id + '" ?', () => {
      this.glueService.delete(glue.id).subscribe(() => {
        this.getGlues();
        this.alertify.success('Glue has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the Glue');
      });
    });
  }
  onPageChangeGlue($event) {
    this.pagination.currentPage = $event;
    this.getGlues();
  }
  openGlueModalComponent() {
    const modalRef = this.modalService.open(GlueModalComponent, { size: 'md' });
    modalRef.componentInstance.glue = this.glue;
    modalRef.componentInstance.title = 'Add Glue';
    modalRef.result.then((result) => {
      console.log('OpenGlueModalComponent', result );
    }, (reason) => {
    });
  }
  openGlueEditModalComponent(item) {
    const modalRef = this.modalService.open(GlueModalComponent, { size: 'md' });
    modalRef.componentInstance.glue = item;
    modalRef.componentInstance.title = 'Edit Glue';
    modalRef.result.then((result) => {
      console.log('openGlueEditModalComponent', result );
    }, (reason) => {
    });
  }
}
