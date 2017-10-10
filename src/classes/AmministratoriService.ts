import { Http } from '@angular/http';
import { Injectable} from '@angular/core';
import {Amministratore} from './Amministratore';

@Injectable()
export class AmministratoriService {

  private idAmministratore: number;

  private amministratore = new Amministratore();

  constructor(private http: Http) {
  }

  public setId(value) {
    this.idAmministratore = value;
  }

  public getId() {
    return this.idAmministratore;
  }

  public setAmministratore(id, nome, cognome, username, password) {

    this.amministratore.id = id;
    this.amministratore.nome = nome;
    this.amministratore.cognome = cognome;
    this.amministratore.username = username;
    this.amministratore.password = password;

    console.log(this.amministratore.nome);
  }

  public getAmministratore() {
    return this.amministratore;
  }

  public getAmministratori(onComplete) {
    return this.http.get('http://localhost/ingegneria/src/readAmministratori.php').subscribe(
      (data) => onComplete(data.json())
    );

  }
}
