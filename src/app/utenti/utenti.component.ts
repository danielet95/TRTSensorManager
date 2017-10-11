import {Component, OnInit, ViewChild} from '@angular/core';
import {Utente} from '../../classes/Utente';
import { UtentiService} from '../../classes/UtentiService';
import {AmministratoriService} from '../../classes/AmministratoriService';
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
  // idAmministratore = this.amministratoriService.getId();
  public amministratore = JSON.parse(localStorage.getItem('Amministratore'));

  constructor(private utentiService: UtentiService, private amministratoriService: AmministratoriService) { }

  ngOnInit() {


    this.utentiService.postId(this.amministratore.id, 'http://localhost/ingegneria/src/readUtenti.php',
      (data) => {this.listaUtenti = data; });

    console.log(this.amministratore.id);

  }

  public aggiungiUtentePiattaforma() {
    const nomeUtente = this.nome.nativeElement.value;
    const cognomeUtente = this.cognome.nativeElement.value;
    const userUtente = this.username.nativeElement.value;
    const passUtente = this.password.nativeElement.value;
    const urlAggiunta = 'http://localhost/ingegneria/src/inserisciUtentePiattaforma.php';

    if (this.nome.nativeElement.value === '' || cognomeUtente === '' || this.username.nativeElement.value === '') {
      alert('I dati inseriti non sono validi');
    } else if (this.password.nativeElement.value.length < 8) {
      alert('Password non valida. Inserire una password di almeno 8 caratteri');
    } else {

      this.utentiService.postUtenti(nomeUtente, cognomeUtente, userUtente, passUtente, this.amministratore.id, urlAggiunta,
        () => {
          this.utentiService.postId(this.amministratore.id, 'http://localhost/ingegneria/src/readUtenti.php',
            (data) => {this.listaUtenti = data; });
        });

    }

    this.modalAggiuntaUtente.close();

  }

  public apriModificaUtente(i) {

    this.modalModificaUtente.open();

    this.u.setId(this.listaUtenti[i].getId());
    this.u.nome = this.listaUtenti[i].nome;
    this.u.cognome = this.listaUtenti[i].cognome;
    this.u.username = this.listaUtenti[i].username;

    console.log(this.u.nome);

  }

  public modificaUtentePiattaforma() {

    if (this.nomeModificato.nativeElement.value === '' || this.cognomeModificato.nativeElement.value === ''
      || this.usernameModificata.nativeElement.value === '') {
      alert('I dati inseriti non sono validi');
    } else {
      const urlModifica = 'http://localhost/ingegneria/src/modificaUtentePiattaforma.php';
      this.utentiService.modificaUtente(this.u.getId(), this.nomeModificato.nativeElement.value, this.cognomeModificato.nativeElement.value,
        this.usernameModificata.nativeElement.value, urlModifica,
        () => {
          this.utentiService.postId(this.amministratore.id, 'http://localhost/ingegneria/src/readUtenti.php',
            (data) => {this.listaUtenti = data; });
        });
      this.modalModificaUtente.close();
    }

  }

  public rimuoviUtentePiattaforma(i) {
    const urlRimozione = 'http://localhost/ingegneria/src/rimuoviUtentePiattaforma.php';
    this.utentiService.rimuoviUtente(this.listaUtenti[i].getId(), urlRimozione,
      () => {
      this.listaUtenti.splice(i, 1);
    });
  }



}
