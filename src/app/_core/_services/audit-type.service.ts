import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { AuditType } from '../_models/audit-type';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AuditTypeService {

  baseUrl = environment.apiUrl;
  auditTypeSource = new BehaviorSubject<Object>({});
  currentAuditType = this.auditTypeSource.asObservable();
  flagSource = new BehaviorSubject<string>("0");
  currentFlag = this.flagSource.asObservable();
  constructor(private http: HttpClient) { }

  getListAll(page?, itemsPerPage?): Observable<PaginatedResult<AuditType[]>> {
    const paginatedResult: PaginatedResult<AuditType[]> = new PaginatedResult<AuditType[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<AuditType[]>(this.baseUrl + 'auditType', { observe: 'response', params })
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

  search(page?, itemsPerPage?, text?): Observable<PaginatedResult<AuditType[]>> {
    const paginatedResult: PaginatedResult<AuditType[]> = new PaginatedResult<AuditType[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }


    return this.http.get<AuditType[]>(this.baseUrl + 'auditType/search/' + text, { observe: 'response', params })
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

  create(auditType: AuditType) {
    console.log(httpOptions);
    return this.http.post(this.baseUrl + 'auditType/', auditType);
  }

  getAlls() {
    return this.http.get<AuditType[]>(this.baseUrl + 'auditType/all', {});
  }

  changeStatus(id: number) {
    return this.http.post(this.baseUrl + 'auditType/' + id + '/changeStatus', {});
  }

  update(auditType: AuditType) {
    return this.http.put(this.baseUrl + 'auditType/', auditType);
  }

  delete(id: string) {
    return this.http.delete(this.baseUrl + 'auditType/' + id, {});
  }

  changeAuditType(auditType: AuditType) {
    this.auditTypeSource.next(auditType);
  }

  changeFlag(flag: string) {
    this.flagSource.next(flag);
  }

}
