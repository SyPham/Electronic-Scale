import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Brand } from '../_models/brand';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { BrandService } from '../_services/brand.service';
import { AlertifyService } from '../_services/alertify.service';
import { GlueService } from '../_services/glue.service';

@Injectable()
export class GlueResolver implements Resolve<Brand[]> {
    pageNumber = 1;
    pageSize = 10;
    constructor(private glueService: GlueService, private router: Router, private alertify: AlertifyService ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Brand[]> {
        return this.glueService.getGlues(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/dashboard']);
                return of(null);
            }),
        );
    }
}
