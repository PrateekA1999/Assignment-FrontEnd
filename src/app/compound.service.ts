import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../app/config';

@Injectable({
  providedIn: 'root'
})
export class CompoundService {

  constructor(private http : HttpClient) { }


  upload(file:any){
    const formData: FormData = new FormData();

    formData.append('file', file);

    return this.http.post<any>(`${Config.url}/multiCreateC`,formData);
  }

  getAllCompound(pageSize:any,pageIndex:any,filter:any){
    console.log(pageSize);
    console.log(pageIndex);
    return this.http.post<any>(`${Config.url}/AllC?page=${pageIndex}&size=${pageSize}`,filter);
  }

  createCompound(data:any){
    return this.http.post<any>(`${Config.url}/createC`,data);
  }


  getCompound(id:any){
    return this.http.get<any>(`${Config.url}/${id}`);
  }

  updateCompound(id:any,data:any){
    let compoundData={
      "id": id,
      "CompoundName": data.CompoundName,
      "CompoundDescription": data.CompoundDescription,
      "strImageSource": data.strImageSource,
      "strImageAttribution": data.strImageAttribution
    }
    console.log(compoundData);
    
    return this.http.put<any>(`${Config.url}/${id}`,compoundData);
  }

  deleteCompound(id:any){
    return this.http.delete<any>(`${Config.url}/${id}`);
  }
}