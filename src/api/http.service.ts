import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    urlPoint: any = 'http://localhost:5001/api/';
    urlApp: any = 'bmi_customer/';
    //----------------------------------------------------------------------
    constructor(private http: HttpClient){}
    //----------------------------------------------------------------------
    public getUrlPoint() {
        return this.urlPoint;
    }
    //----------------------------------------------------------------------   
    public getUrlApp() {
        return this.urlApp;
    }
    //----------------------------------------------------------------------   
    public getDate() {
        return this.http.get(this.urlPoint + 'currentDate');
    }
    //----------------------------------------------------------------------   
    save(data?: any) {
        return this.http.post(this.urlPoint + this.urlApp, data);
    }
    //----------------------------------------------------------------------   
    update(data?: any) {
        return this.http.put(this.urlPoint + this.urlApp, data);
    }
    //----------------------------------------------------------------------   
}
