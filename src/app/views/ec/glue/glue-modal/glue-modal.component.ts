import { Component, OnInit, Input } from '@angular/core';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IGlue } from '../../../../_core/_models/Glue';
import { GlueService } from '../../../../_core/_services/glue.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-glue-modal',
  templateUrl: './glue-modal.component.html',
  styleUrls: ['./glue-modal.component.scss']
})
export class GlueModalComponent implements OnInit {
  @Input() title: '';
  @Input() glue: IGlue = {
    id: 0,
    name: '',
    code: this.makeid(8),
    createdDate: ''
  };
  showBarCode: boolean;
  constructor(
    public activeModal: NgbActiveModal,
    private alertify: AlertifyService,
    private glueService: GlueService,
  ) { }

  ngOnInit() {
    if (this.glue.id === 0) {
      this.showBarCode = false;
      this.genaratorGlueCode();
    } else {
      this.showBarCode = true;
    }
  }
  create() {
    this.glueService.create(this.glue).subscribe( () => {
        this.alertify.success('Created successed!');
        this.activeModal.dismiss();
        this.glueService.changeGlue(200);
    },
    (error) => {
      this.alertify.error(error);
      this.genaratorGlueCode();
    });
  }
  update() {
    this.glueService.create(this.glue).subscribe( res => {
      if (res) {
        this.alertify.success('Updated successed!');
      }
    });
  }
  save() {
    if (this.glue.id === 0) {
      if (this.glue.code === '') {
        this.genaratorGlueCode();
      }
      this.create();
    } else {
      this.update();
    }
  }
  onBlur($event) {
    this.showBarCode = true;
  }
  genaratorGlueCode() {
    this.glue.code = this.makeid(8);
  }
  makeid(length) {
    let result           = '';
    let characters       = '0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
   // return '59129032';
 }
}
