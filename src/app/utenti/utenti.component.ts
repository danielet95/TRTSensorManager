import {Component, OnInit, ViewChild} from '@angular/core';
import {Utente} from '../../classes/Utente';
import { UtentiService} from '../../classes/UtentiService';
import {Amministratore} from '../../classes/Amministratore';

@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.css'],
  providers: [UtentiService]
})
export class UtentiComponent implements OnInit {

  @ViewChild ('nome') nome;
  @ViewChild ('cognome') cognome;
  @ViewChild ('username') username;
  @ViewChild ('nomeModificato') nomeModificato;
  @ViewChild ('cognomeModificato') cognomeModificato;
  @ViewChild ('usernameModificata') usernameModificata;
  @ViewChild ('password') password;
  @ViewChild ('modalModificaUtente') modalModificaUtente;
  @ViewChild ('modalAggiuntaUtente') modalAggiuntaUtente;
  public listaUtenti: Utente[] = [];
  public u = new Utente();
  utentiFilter: any = { cognome: '' };
  public amministratore = JSON.parse(localStorage.getItem('Amministratore'));

  constructor(private utentiService: UtentiService) { }

  ngOnInit() {

    this.utentiService.getUtentiAmministratore(this.amministratore.id, 'http://localhost/ingegneriajs/src/php/getUtentiPiattaforma.php',
      (data) => {this.listaUtenti = data; });

  }

  /*
  Aggiunge un utente alla piattaforma.
   */

  public aggiungiUtentePiattaforma() {
    const nomeUtente = this.nome.nativeElement.value;
    const cognomeUtente = this.cognome.nativeElement.value;
    const userUtente = this.username.nativeElement.value;
    const passUtente = this.password.nativeElement.value;
    const urlAggiunta = 'http://localhost/ingegneriajs/src/php/aggiungiUtentePiattaforma.php';

    if (this.nome.nativeElement.value === '' || cognomeUtente === '' || this.username.nativeElement.value === '') {
      alert('I dati inseriti non sono validi');
    } else if (this.password.nativeElement.value.length < 8) {
      alert('Password non valida. Inserire una password di almeno 8 caratteri');
    } else {

      this.utentiService.aggiungiUtenteDatabase(nomeUtente, cognomeUtente, userUtente, passUtente, this.amministratore.id, urlAggiunta,
        () => {
          this.utentiService.getUtentiAmministratore(this.amministratore.id, 'http://localhost/ingegneriajs/src/php/getUtentiPiattaforma.php',
            (data) => {this.listaUtenti = data; });
          this.modalAggiuntaUtente.close();
        });

    }


  }

  /*
  Apre la finestra che permette di modificare i dati di un utente.
  Riceve in input i che indica la posizione occupata dall'utente all'interno dell'array listaUtenti.
   */

  public apriModificaUtente(i) {

    this.modalModificaUtente.open();

    this.u.id = this.listaUtenti[i].id;
    this.u.nome = this.listaUtenti[i].nome;
    this.u.cognome = this.listaUtenti[i].cognome;
    this.u.username = this.listaUtenti[i].username;

  }

  /*
  Verifica i dati inseriti. Modifica i dati di un utente
   */

  public modificaUtentePiattaforma() {

    if (this.nomeModificato.nativeElement.value === '' || this.cognomeModificato.nativeElement.value === ''
      || this.usernameModificata.nativeElement.value === '') {
      alert('I dati inseriti non sono validi');
    } else {
      const urlModifica = 'http://localhost/ingegneriajs/src/php/modificaUtentePiattaforma.php';
      this.utentiService.modificaUtenteDatabase(this.u.id, this.nomeModificato.nativeElement.value,
        this.cognomeModificato.nativeElement.value,
        this.usernameModificata.nativeElement.value, urlModifica,
        () => {
          this.utentiService.getUtentiAmministratore(this.amministratore.id,
            'http://localhost/ingegneriajs/src/php/getUtentiPiattaforma.php',
            (data) => {this.listaUtenti = data; });
        });
      this.modalModificaUtente.close();
    }

  }

  /*
  Rimuove un utente dalla piattaforma.
  Riceve in input i che indica la posizione occupata dall'utente all'interno dell'array listaUtenti.
   */

  public rimuoviUtentePiattaforma(i) {
    const urlRimozione = 'http://localhost/ingegneriajs/src/php/rimuoviUtentePiattaforma.php';
    this.utentiService.rimuoviUtenteDatabase(this.listaUtenti[i].id, urlRimozione,
      () => {
      this.listaUtenti.splice(i, 1);
    });
  }



}
