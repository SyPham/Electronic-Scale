import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { Brand } from '../_models/brand';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IGlueIngredient } from '../_models/glue-ingredient';
import { IIngredient } from '../_models/Ingredient';
import { IGlue } from '../_models/Glue';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
  }),
};
@Injectable({
  providedIn: 'root'
})
export class GlueIngredientService {
  baseUrl = environment.apiUrl;
  gueIngredientSource = new BehaviorSubject<object>({});
  currentGlueIngredient = this.gueIngredientSource.asObservable();
  flagSource = new BehaviorSubject<string>("0");
  currentFlag = this.flagSource.asObservable();
  constructor(private http: HttpClient) { }
  getIngredients(glueid, page?, itemsPerPage?): Observable<PaginatedResult<IIngredient[]>> {
    const paginatedResult: PaginatedResult<IIngredient[]> = new PaginatedResult<IIngredient[]>();
    return this.http.get<IIngredient[]>(`${this.baseUrl}GlueIngredient/getAllIngredients/${glueid}/${page}/${itemsPerPage}`, { observe: 'response'})
      .pipe(
        map(response => {
          console.log(response);
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        }),
      );
  }
  getGlues(page?, itemsPerPage?): Observable<PaginatedResult<IGlue[]>> {
    const paginatedResult: PaginatedResult<IGlue[]> = new PaginatedResult<IGlue[]>();
    return this.http.get<IGlue[]>(`${this.baseUrl}GlueIngredient/getAllGlues/${page}/${itemsPerPage}`, { observe: 'response'})
      .pipe(
        map(response => {
          console.log(response);
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        }),
      );
  }
  mappGlueIngredient(glueIngredient) {
    return this.http.post(`${this.baseUrl}GlueIngredient`, glueIngredient);
  }
  delete(glueid, ingredient) {
    return this.http.get(`${this.baseUrl}GlueIngredient/${glueid}/${ingredient}`);
  }
}
