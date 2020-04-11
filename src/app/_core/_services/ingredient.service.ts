import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IIngredient } from '../_models/Ingredient';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    //'Authorization': 'Bearer ' + localStorage.getItem('token'),
  }),
};
@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  baseUrl = environment.apiUrl;
  ingredientSource = new BehaviorSubject<number>(0);
  currentIngredient = this.ingredientSource.asObservable();
  constructor(private http: HttpClient) { }
  getIngredients(page?, itemsPerPage?): Observable<PaginatedResult<IIngredient[]>> {
    const paginatedResult: PaginatedResult<IIngredient[]> = new PaginatedResult<IIngredient[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }


    return this.http.get<IIngredient[]>(this.baseUrl + 'ingredient/getingredients', { observe: 'response', params})
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
 
  getAllIngredient() {
    return this.http.get<IIngredient[]>(this.baseUrl + 'ingredient/GetAll', {});
  }

  create(ingredient: IIngredient) {
    return this.http.post(this.baseUrl + 'ingredient/create', ingredient);
  }
  update(ingredient: IIngredient) {
    return this.http.put(this.baseUrl + 'ingredient/update', ingredient);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'ingredient/delete/' + id);
  }

  changeIngredient(ingredient) {
    this.ingredientSource.next(ingredient);
  }
}
