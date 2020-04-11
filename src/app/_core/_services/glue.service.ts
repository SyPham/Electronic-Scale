import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { Brand } from '../_models/brand';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IGlueIngredient } from '../_models/glue-ingredient';
import { IGlue } from '../_models/Glue';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    //'Authorization': 'Bearer ' + localStorage.getItem('token'),
  }),
};
@Injectable({
  providedIn: 'root'
})
export class GlueService {
  baseUrl = environment.apiUrl;
  glueSource = new BehaviorSubject<number>(0);
  currentGlue = this.glueSource.asObservable();
  constructor(private http: HttpClient) { }
  getGlues(page?, itemsPerPage?): Observable<PaginatedResult<IGlue[]>> {
    const paginatedResult: PaginatedResult<IGlue[]> = new PaginatedResult<IGlue[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }


    return this.http.get<IGlue[]>(this.baseUrl + 'Glue/getGlues', { observe: 'response', params})
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
  getAllGlue() {
    return this.http.get<IGlue[]>(this.baseUrl + 'Glue/GetAll', {});
  }

  create(ingredient: IGlue) {
    return this.http.post(this.baseUrl + 'Glue/create', ingredient);
  }
  update(ingredient: IGlue) {
    return this.http.put(this.baseUrl + 'Glue/update', ingredient);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'Glue/delete/' + id);
  }

  changeGlue(glue) {
    this.glueSource.next(glue);
  }
}
