import { Component, OnInit } from '@angular/core';
import { AuditTypeService } from '../../../../_core/_services/audit-type.service';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { AuthService } from '../../../../_core/_services/auth.service';
import { Router } from '@angular/router';
import { BrandService } from '../../../../_core/_services/brand.service';
import { Brand } from '../../../../_core/_models/brand';

@Component({
  selector: 'app-type-add',
  templateUrl: './type-add.component.html',
  styleUrls: ['./type-add.component.scss']
})
export class TypeAddComponent implements OnInit {

  auditType: any = {};
  brands: Brand[];
  flag = "0";
  constructor(
    private auditTypeService: AuditTypeService,
    private alertify: AlertifyService,
    private brandService: BrandService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auditTypeService.currentAuditType.subscribe(auditType => this.auditType = auditType);
    this.auditTypeService.currentFlag.subscribe(flag => this.flag = flag);
    this.getAllBrands();
  }

  backList() {
    this.router.navigate(["/maintenance/audit-type"])
  }

  saveAndNext() {
    console.log(this.auditType);
    if (this.flag == "0") {
      this.auditTypeService.create(this.auditType).subscribe(
        () => {
          this.alertify.success("Add succeed");
          this.auditType = {};
          //  this.router.navigate(["/maintenance/brand"])
        },
        error => {
          this.alertify.error(error);
        }
      )
    }
    else {
      this.auditTypeService.update(this.auditType).subscribe(
        () => {
          this.alertify.success("Updated succeed");
          this.router.navigate(["/maintenance/audit-type"])
        },
        error => {
          this.alertify.error(error)
        }
      )

    }
  }

  save() {
    if (this.flag == "0") {
      this.auditTypeService.create(this.auditType).subscribe(
        () => {
          this.alertify.success("Add succeed");
          this.router.navigate(["/maintenance/audit-type"])
        },
        error => {
          this.alertify.error(error);
        }
      )
    }
    else {
      this.auditTypeService.update(this.auditType).subscribe(
        () => {
          this.alertify.success("Updated succeed");
          this.router.navigate(["/maintenance/audit-type"])
        },
        error => {
          this.alertify.error(error)
        }
      )

    }
  }

  getAllBrands() {
    this.brandService.getAllBrands().subscribe(
      data => {
        console.log("brands: ", data)
        this.brands = data;
      },
      error => {
        this.alertify.error(error);
      }
    )
  }
}
