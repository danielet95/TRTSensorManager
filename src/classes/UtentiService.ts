import { Http } from '@angular/http';
import { Injectable} from '@angular/core';

@Injectable()
export class UtentiService {

  constructor(private http: Http) {}

  public getUtentiDatabase(onComplete) {
    return this.http.get('http://localhost/php/getUtenti.php').subscribe(
      (data) => onComplete(data.json())
    );
  }

  /*
  Aggiunge un utente all'interno del database.
   */

  public aggiungiUtenteDatabase(nome, cognome, username, password, idAmministratore, url, onComplete ) {

    const obj = {'nomeUtente': nome, 'cognomeUtente': cognome, 'userUtente': username,
      'passUtente': password, idAmministratore: idAmministratore};
    const body = JSON.stringify(obj);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    this.http.post(url, body, headers).subscribe(
      onComplete,
      err => console.error('ERRORE')
    );
  }

  /*
  Tramite una richiesta http di tipo POST invia al database l'id dell'amministratore,
  e riceve la lista degli utenti corrispondenti a quell'amministratore.
   */

  public getUtentiAmministratore(idAmministratore, url, onComplete) {

    const body = JSON.stringify({idAmministratore: idAmministratore});
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    return this.http.post(url, body, headers).subscribe(
      (data) => onComplete(data.json())
    );
  }


  /*
  Modifica un utente all'interno del database.
   */

  public modificaUtenteDatabase(id, nome, cognome, username, url, onComplete) {

    const body = JSON.stringify({id: id, nome: nome, cognome: cognome, username: username});
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    this.http.post(url, body, headers).subscribe(
      onComplete,
      err => console.error('ERRORE')
    );
  }


  /*
  Rimuove un utente dal database.
   */

  public rimuoviUtenteDatabase(id, url, onComplete) {

    const body = JSON.stringify({id: id});
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    this.http.post(url, body, headers).subscribe(
      onComplete,
      err => console.error('ERRORE')
    );
  }

}
