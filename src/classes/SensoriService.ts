import {Http} from '@angular/http';
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

  /*
  Tramite una richiesta http di tipo POST invia al database l'id dell'amministratore e riceve la lista dei
  sensori aggiunti alla dashboard da quell'amministratore.
   */

  public getSensoriDashboardAmministratore(idAmministratore, url, onComplete) {

    const body = JSON.stringify({idAmministratore: idAmministratore});
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    return this.http.post(url, body, headers).subscribe(
      (data) => onComplete(data.json())
    );
  }

  /*
  Tramite una richiesta http di tipo POST invia al database l'id dell'utente e riceve la lista dei
  sensori aggiunti alla dashboard da quell'utente.
   */

  public getSensoriDashboardUtente(idUtente, url, onComplete) {

    const body = JSON.stringify({idUtente: idUtente});
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    return this.http.post(url, body, headers).subscribe(
      (data) => onComplete(data.json())
    );
  }

  /*
  Tramite una richiesta http di tipo POST invia al database l'id dell'utente e l'id dell'amministratore,
  e riceve la lista dei sensori che l'utente corrispondente a quell'amministratore può visualizzare sulla piattaforma
   */

  public getSensoriPiattaformaUtenti(idAmministratore, idUtente, url, onComplete) {

    const body = JSON.stringify({idAmministratore: idAmministratore, idUtente: idUtente});
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    return this.http.post(url, body, headers).subscribe(
      (data) => onComplete(data.json())
    );
  }


  /*
  Tramite una richiesta http di tipo POST invia ala database il codice del sensore e l'id dell'amministratore.
  In base all'url della pagina php che gli viene passato aggiunge o rimuovi alla piattaforma il sensore con quel codice.
   */

  public aggiungiRimuoviSensorePiattaforma(codice, idAmministratore, url, onComplete) {

    const body = JSON.stringify({codice: codice, idAmministratore: idAmministratore});
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    this.http.post(url, body, headers).subscribe(
      onComplete,
      err => console.error('ERRORE')
    );
  }

  /*
  Tramite una richiesta http di tipo POST invia al database l'id dell'amministratore,
  e riceve la lista dei sensori che quell'amministratore può visualizzare sulla piattaforma.
   */

  public getSensoriPiattaformaAmministratore(idAmministratore, url, onComplete) {

    const body = JSON.stringify({idAmministratore: idAmministratore});
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    return this.http.post(url, body, headers).subscribe(
      (data) => onComplete(data.json())
    );
  }

  /*
  Aggiorna nel database la visibilità del sensore all'interno della dashboard dell'amministratore.
  Quando il sensore con codice 'codice' sarà alla dashboard la visibilità sarà true,
  altrimenti sarà false.
   */

  public updateVisibilitaSensoriDashboardAmministratore(codice, visibilita, onComplete) {

    const body = JSON.stringify({codice: codice, visibilita: visibilita});
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    this.http.post('http://localhost/php/modificaVisibilitaSensore.php', body, headers).subscribe(
      onComplete,
      err => console.error('ERRORE')
    );
  }

  /*
  In base all'url che gli viene passata, aggiunge o rimuove un sensore dalla tabella sensore_utente.
  In questa tabella sono presenti tutti i sensori che ogni utente aggiunge alla dashboard.
   */

  public updateVisibilitaSensoriDashboardUtenti(codice, idUtente, url, onComplete) {

    const body = JSON.stringify({codice: codice, idUtente: idUtente});
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    this.http.post(url, body, headers).subscribe(
      onComplete,
      err => console.error('ERRORE')
    );
  }

}
