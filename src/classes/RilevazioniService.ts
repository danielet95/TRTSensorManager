import { Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class RilevazioniService {

  constructor(private http: Http) {}

  /*
  Tramite una riochiesta http di tipo POST invia al database il codice del sensore e riceve le rilevazioni
  effettuate da quel sensore.
   */

  public getRilevazioniSensore(codiceSensore, url, onComplete) {

    const body = JSON.stringify({codiceSensore: codiceSensore});
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    return this.http.post(url, body, headers).subscribe(
      (data) => onComplete(data.json())
    );
  }


}
