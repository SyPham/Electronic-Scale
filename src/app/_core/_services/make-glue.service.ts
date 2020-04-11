import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { Brand } from '../_models/brand';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IMakeGlue } from '../_models/make-glue';
import { IGlue } from '../_models/Glue';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
  }),
};
@Injectable({
  providedIn: 'root'
})
export class MakeGlueService {
  baseUrl = environment.apiUrl;
  gueIngredientSource = new BehaviorSubject<object>({});
  currentMakeGlue = this.gueIngredientSource.asObservable();
  flagSource = new BehaviorSubject<string>("0");
  currentFlag = this.flagSource.asObservable();
  constructor(private http: HttpClient) { }

  getAllGlues() {
    return this.http.get<IGlue[]>(this.baseUrl + 'MakeGlue/getAllGlues', {});
  }
 // GetGlueWithIngredientByGlueCode
  getGlueWithIngredientByGlueCode(code: string) {
    return this.http.get<IMakeGlue[]>(this.baseUrl + 'MakeGlue/GetGlueWithIngredientByGlueCode/' + code);
  }
  getMakeGlueByGlueID(id: number) {
    return this.http.get<IMakeGlue[]>(this.baseUrl + 'MakeGlue/getGlueIngredientByGlueID/' + id, {});
  }
}
