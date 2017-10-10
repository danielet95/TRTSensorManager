import { Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class RilevazioniService {

  constructor(private http: Http) {}

  public getRilevazioni(codiceSensore, url, onComplete) {

    const body = JSON.stringify({codiceSensore: codiceSensore});
    console.log(body);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    return this.http.post(url, body, headers).subscribe(
      (data) => onComplete(data.json())
    );
  }


}
