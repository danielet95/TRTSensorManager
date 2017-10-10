import {Component, OnInit, ViewChild} from '@angular/core';
import {AmministratoriService} from '../../classes/AmministratoriService';
import {UtentiService} from '../../classes/UtentiService';
import {Http} from '@angular/http';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css']
})

export class ProfiloComponent implements OnInit {

  // public utente = this.utentiService.getUtente();
  // public amministratore = this.amministratoriService.getAmministratore();
  public amministratore = JSON.parse(localStorage.getItem('Amministratore'));
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

    if (this.amministratore.password === this.passwordAttuale.nativeElement.value) {
      if (this.nuovaPassword.nativeElement.value.length > 7) {
        if (this.confermaNuovaPassword.nativeElement.value === this.nuovaPassword.nativeElement.value) {

          const body = JSON.stringify({id: this.amministratore.id , password: this.nuovaPassword.nativeElement.value});
          const headers = new Headers();
          headers.append('Content-Type', 'application/json; charset=utf-8');

          console.log(this.nuovaPassword.nativeElement.value);

          this.http.post('http://localhost/ingegneria/src/modificaPasswordAmministratore.php', body, headers).subscribe(
            () => {},
            err => console.error('ERRORE')
          );

          this.amministratore.password = this.nuovaPassword.nativeElement.value;
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
