import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Brand } from '../_models/brand';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { IngredientService } from '../_services/ingredient.service';

@Injectable()
export class IngredientResolver implements Resolve<Brand[]> {
    pageNumber = 1;
    pageSize = 10;
    constructor(private ingredientService: IngredientService, private router: Router, private alertify: AlertifyService ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Brand[]> {
        return this.ingredientService.getIngredients(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/dashboard']);
                return of(null);
            }),
        );
    }
}
