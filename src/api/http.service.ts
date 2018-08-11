import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    urlPoint: any = 'http://82.102.10.253:5001/api/';
    urlApp: any = 'bmi_customer/';
    headers: any;
    //----------------------------------------------------------------------
    constructor(private http: HttpClient){
        this.headers = new HttpHeaders()
            .set('enctype', 'multipart/form-data');
    }
    //----------------------------------------------------------------------
    public getUrlPoint() {
        return this.urlPoint;
    }
    //----------------------------------------------------------------------   
    public getUrlApp() {
        return this.urlApp;
    }
    public getUrlFile() {
        return this.urlPoint + this.urlApp + 'file';
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
