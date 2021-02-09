import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Response } from "../models/response";
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root'})

export class AppService {

  constructor(private httpClient: HttpClient) {}

  getData(param: string): Observable<Response> {
    const query = param.split(' ').join('-')
    const url = `https://mystique-v2-americanas.juno.b2w.io/autocomplete?content=${query}&source=nanook`
    return this.httpClient.get(url).pipe(
      map((x: Response) => {return x})
    )
  }



}
