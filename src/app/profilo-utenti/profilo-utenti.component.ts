import {Component, OnInit, ViewChild} from '@angular/core';
import {AmministratoriService} from '../../classes/AmministratoriService';
import {UtentiService} from '../../classes/UtentiService';
import {Http} from '@angular/http';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo-utenti.component.html',
  styleUrls: ['./profilo-utenti.component.css']
})

export class ProfiloUtentiComponent implements OnInit {

  // public utente = this.utentiService.getUtente();
  // public amministratore = this.amministratoriService.getAmministratore();
  public utente = JSON.parse(localStorage.getItem('Utente'));
  @ViewChild('passwordAttuale') passwordAttuale;
  @ViewChild('nuovaPassword') nuovaPassword;
  @ViewChild('confermaNuovaPassword') confermaNuovaPassword;
  @ViewChild('modalModificaPassword') modalModificaPassword;


  constructor(private amministratoriService: AmministratoriService, private utentiService: UtentiService, private http: Http) { }

  ngOnInit() {

    console.log(this.amministratoriService.getAmministratore().nome);
    console.log(this.utentiService.getUtente().nome);

  }

  public modificaPassword() {

    if (this.utente.password === this.passwordAttuale.nativeElement.value) {
      if (this.nuovaPassword.nativeElement.value.length > 7) {
        if (this.confermaNuovaPassword.nativeElement.value === this.nuovaPassword.nativeElement.value) {

          const body = JSON.stringify({id: this.utente.id , password: this.nuovaPassword.nativeElement.value});
          const headers = new Headers();
          headers.append('Content-Type', 'application/json; charset=utf-8');

          console.log(this.nuovaPassword.nativeElement.value);

          this.http.post('http://localhost/ingegneria/src/modificaPasswordUtente.php', body, headers).subscribe(
            () => {},
            err => console.error('ERRORE')
          );

          this.utente.password = this.nuovaPassword.nativeElement.value;
          this.modalModificaPassword.close();

        } else {
          alert('Le due password non corrispondono');
        }
      } else {
        alert('Password non valida. Inserire una password di almeno 8 caratteri');
      }

    } else {

      alert('la password attuale non corrisponde');

    }


  }
}

