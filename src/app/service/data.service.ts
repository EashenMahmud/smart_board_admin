import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  httpClient: any;

  constructor(private http:HttpClient) { }
  
  login(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post(environment.apiUrl + '/api/login', data, {
      headers: headers,
    });
  }

  
  indexSliderList() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get(environment.apiUrl + '/api/open/get-index-slider', {
      headers: headers
    });
  }

  indexSliderUpdate(data: any) {
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.post(environment.apiUrl + '/api/update-index-slider', data,{
      headers: headers
    });
  }

  //PRODUCT
  productUpdate(data: any) {
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.post(environment.apiUrl + '/api/update-product',data,{
      headers: headers
    });
  }
  product(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get(environment.apiUrl + '/api/product-item', {
      headers: headers
    });
  }

//PANEL

panel(){
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
  return this.http.get(environment.apiUrl + '/api/panel-list', {
    headers: headers
  });
}

panelUpdate(data: any) {
  const headers = new HttpHeaders({
    // 'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
  return this.http.post(environment.apiUrl + '/api/update-panel',data,{
    headers: headers
  });
}





  titleList() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get(environment.apiUrl + '/api/title-list', {
      headers: headers
    });
  }

}
