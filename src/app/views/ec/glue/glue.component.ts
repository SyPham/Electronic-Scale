import { Component, OnInit, ViewChild } from '@angular/core';
import { GlueService } from '../../../_core/_services/glue.service';
import { IGlue } from '../../../_core/_models/glue';
import {
  NgbModalConfig,
  NgbModal,
  NgbModalRef
} from '@ng-bootstrap/ng-bootstrap';
import { GlueModalComponent } from './glue-modal/glue-modal.component';
import { ModalDirective } from 'ngx-bootstrap';
import { AlertifyService } from '../../../_core/_services/alertify.service';
import { Pagination, PaginatedResult } from '../../../_core/_models/pagination';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-glue',
  templateUrl: './glue.component.html',
  styleUrls: ['./glue.component.scss']
})
export class GlueComponent implements OnInit {
  data: IGlue[];
  glue: IGlue = {
    id: 0,
    name: '',
    code: '',
    createdDate: ''
  };
  show: boolean;
  pagination: Pagination;
  page = 1 ;
  constructor(
    public modalService: NgbModal,
    private glueService: GlueService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.data = data['glues'].result;
      this.pagination = data['glues'].pagination;
      console.log(this.pagination)
      console.log(this.pagination.totalItems)
      this.glueService.currentGlue.subscribe(res => {
        if (res === 200) {
           this.getGlues();
        }
      });
    });
  }
  printBarcode() {
    this.show = true;
  }
  backList() {
    this.show = false;
  }
  getGlues() {
    // this.spinner.show();
     this.glueService.getGlues(this.pagination.currentPage, this.pagination.itemsPerPage)
       .subscribe((res: PaginatedResult<IGlue[]>) => {
         this.data = res.result;
         this.pagination = res.pagination;
     //    this.spinner.hide();
       }, error => {
         this.alertify.error(error);
       });
   }
  getAll() {
    this.glueService.getAllGlue().subscribe(res => {
      this.data = res;
      console.log('Get All: ', res);
    });
  }

  delete(glue: IGlue) {
    this.alertify.confirm('Delete Glue', 'Are you sure you want to delete this GlueID "' + glue.id + '" ?', () => {
      this.glueService.delete(glue.id).subscribe(() => {
        this.getGlues();
        this.alertify.success('Glue has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the Glue');
      });
    });
  }
  onPageChange($event) {
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
