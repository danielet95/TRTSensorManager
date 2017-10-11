import { Http } from '@angular/http';
import { Injectable} from '@angular/core';
import {Utente} from './Utente';

@Injectable()
export class UtentiService {

  private utente = new Utente();

  constructor(private http: Http) {}

  // non serve più
  public setUtente(id, nome, cognome, username, password, amministratore) {

    this.utente.setId(id);
    this.utente.nome = nome;
    this.utente.cognome = cognome;
    this.utente.username = username;
    this.utente.password = password;
    this.utente.amministratore = amministratore;

    console.log(this.utente.nome);
  }

  // non serve più
  public getUtente() {
    return this.utente;
  }

  public getUtenti(onComplete) {
    return this.http.get('http://localhost/ingegneria/src/getUtenti.php').subscribe(
      (data) => onComplete(data.json())
    );
  }

  public postUtenti(nome, cognome, username, password, idAmministratore, url, onComplete ) {

    const obj = {'nomeUtente': nome, 'cognomeUtente': cognome, 'userUtente': username,
      'passUtente': password, idAmministratore: idAmministratore};
    const body = JSON.stringify(obj);
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

  public modificaUtente(id, nome, cognome, username, url, onComplete) {

    const body = JSON.stringify({id: id, nome: nome, cognome: cognome, username: username});
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    this.http.post(url, body, headers).subscribe(
      onComplete,
      err => console.error('ERRORE')
    );
  }


  public rimuoviUtente(id, url, onComplete) {

    const body = JSON.stringify({id: id});
    console.log(body);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    this.http.post(url, body, headers).subscribe(
      onComplete,
      err => console.error('ERRORE')
    );
  }

}
