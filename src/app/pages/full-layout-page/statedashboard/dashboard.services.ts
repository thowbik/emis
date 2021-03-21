import { Injectable } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class StateDashboardService {
  private getSignedUrlApi = environment.getSignedUrlApi;
  private readingFileApi = environment.readingFileApi;
   constructor(private dataService: DataService) {
  }

  getDashboardData(){
      return this.dataService.getData('/api/dashboard', true)
  }
//   getGeoServerData(data: any) {
//     // tslint:disable-next-line: max-line-length
//     // let url = '/geoserver/' + this.geoserverStoreName + '/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=' + this.geoserverStoreName + ':DOF&outputFormat=application%2Fjson&srsName=EPSG:4326';
//     // tslint:disable-next-line: max-line-length
//     const url = '/geoserver/' + this.geoserverStoreName + '/ows?service=WFS&version=1.0.0&request=GetFeature';
//     // if (cqlfilter) {
//     //     url += '&cql_filter=' + cqlfilter;
//     // }
//     return this.dataService.getGeoServerData(url, data, true);
// }
  getDashboardDetailsData(distId,eduDistId,blockId,beomapId) {
    debugger;
    return this.dataService.getDataSample('/sta1/'+distId+'?edudstId='+eduDistId+'&blockId='+blockId+'&beomapId='+beomapId,true);
  }

  getDownloadData()
  {
    return this.dataService.getData('/api/downloads/?report_level=1', true)
  }
getDownloadDataByValue(report_value)
{
    
    
    return this.dataService.getData('/api/downloads/?report_level='+report_value, true)
}
getSignedUrl(bucketName,ext,fileName,expiry) {
  let params = {"bcktId":bucketName,"ext":ext,"filename":fileName,"expiry":expiry};
  return this.dataService.getDataWithParams(this.getSignedUrlApi,params, true)
}
uploadFile(path,file) {
  return this.dataService.put(path,file);
}
getUploadedFiles(bucketName,fileName,expiry) {
  let params = {"bcktId":bucketName,"filename":fileName,"expiry":expiry};
  return this.dataService.getDataWithParams(this.readingFileApi,params, true)
}
getDikshaToken() {
  return this.dataService.post('/api/dikshaLogin', true);
}
}