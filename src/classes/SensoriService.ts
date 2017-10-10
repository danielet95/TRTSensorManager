import {Http, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import { Headers} from '@angular/http';

@Injectable()
export class SensoriService {

  constructor(private http: Http) {}

  public getSensoriDatabase(url, onComplete) {

    return this.http.get(url).subscribe(
      (data) => onComplete(data.json())
    );
  }


  public getSensoriDashboard(idAmministratore, url, onComplete) {

    const body = JSON.stringify({idAmministratore: idAmministratore});
    console.log(body);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    return this.http.post(url, body, headers).subscribe(
      (data) => onComplete(data.json())
    );
  }

  public getSensoriDashboardUtenti(idUtente, url, onComplete) {

    const body = JSON.stringify({idUtente: idUtente});
    console.log(body);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    return this.http.post(url, body, headers).subscribe(
      (data) => onComplete(data.json())
    );
  }

  public getSensoriPiattaformaUtenti(idAmministratore, idUtente, url, onComplete) {

    const body = JSON.stringify({idAmministratore: idAmministratore, idUtente: idUtente});
    console.log(body);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    return this.http.post(url, body, headers).subscribe(
      (data) => onComplete(data.json())
    );
  }

  public postSensori(codice, idAmministratore, url, onComplete) {

    const body = JSON.stringify({codice: codice, idAmministratore: idAmministratore});
    console.log(body);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    this.http.post(url, body, headers).subscribe(
      onComplete,
      err => console.error('ERRORE')
    );
  }

  public postId(idAmministratore, url, onComplete) {

    const body = JSON.stringify({idAmministratore: idAmministratore});
    console.log(body);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    return this.http.post(url, body, headers).subscribe(
      (data) => onComplete(data.json())
    );
  }


  public updateVisibilitaSensori(codice, visibilita, onComplete) {

    const body = JSON.stringify({codice: codice, visibilita: visibilita});
    console.log(body);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    this.http.post('http://localhost/ingegneria/src/modificaVisibilitaSensore.php', body, headers).subscribe(
      onComplete,
      err => console.error('ERRORE')
    );
  }

  public aggiungiSensoriDashboardUtenti(id, codice, onComplete) {

    const body = JSON.stringify({id: id, codice: codice});
    console.log(body);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    this.http.post('http://localhost/ingegneria/src/aggiungiSensoriDashboardUtenti.php', body, headers).subscribe(
      onComplete,
      err => console.error('ERRORE')
    );
  }

  public rimuoviSensoreDashboardUtenti(codice, idUtente, onComplete) {

    const body = JSON.stringify({codice: codice, idUtente: idUtente});
    console.log(body);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    this.http.post('http://localhost/ingegneria/src/rimuoviSensoreDashboardUtenti.php', body, headers).subscribe(
      onComplete,
      err => console.error('ERRORE')
    );

  }


}
