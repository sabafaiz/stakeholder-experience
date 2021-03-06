import {Injectable} from '@angular/core';

import { Http,Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CustomHttpService } from "../../../shared/shared.service";

@Injectable()
export class AuditService{
  constructor(public http: CustomHttpService){

  }

  public getAudits(){
    return this.http.get("https://hamdan-nxtlife.ind-cloud.everdata.com/api/employee/csa/audits")
    .map(this.extractData)
    .catch(this.handleError);
  }

  public getAuditsByUnit(unitId){
    return this.http.get("https://hamdan-nxtlife.ind-cloud.everdata.com/api/employee/csa/unit/"+unitId+"/audits")
    .map(this.extractData)
    .catch(this.handleError);
  }

  public getEmployees(unitId:any){
    return this.http.get("https://hamdan-nxtlife.ind-cloud.everdata.com/api/employee/unit/"+unitId+"/employees")
    .map(this.extractData)
    .catch(this.handleError);
  }

  public getPrerequisite(){
    return this.http.get("https://hamdan-nxtlife.ind-cloud.everdata.com/api/prerequisite")
    .map(this.extractData)
    .catch(this.handleError);
  }

  public assignUnit(unitId:any,employeeIds:any){
    return this.http.post("https://hamdan-nxtlife.ind-cloud.everdata.com/api/employee/csa/assign/unit/"+unitId+"/de",{de:employeeIds})
    .map(this.extractData)
    .catch(this.handleError);
  }

  updateTouchPoint(tpId:any,data:any){
    return this.http.put("https://hamdan-nxtlife.ind-cloud.everdata.com/api/employee/csa/touchpoint/"+tpId,data)
    .map(this.extractData)
    .catch(this.handleError);
  }

  deleteTouchPoint(tpId:any){
    return this.http.delete("https://hamdan-nxtlife.ind-cloud.everdata.com/api/employee/csa/touchpoint/"+tpId)
    .map(this.extractData)
    .catch(this.handleError);
  }  

  private extractData(res: Response) {
    if (res.status === 204) { return res; }
    let body = res.json();
    return body || {};
  }


  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      if (error.status === 0) {
        errMsg = `${error.status} - "Something is wrong.."`;
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}