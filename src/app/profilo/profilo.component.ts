import {Component, OnInit, ViewChild} from '@angular/core';
import {Http} from '@angular/http';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css']
})

export class ProfiloComponent implements OnInit {

  public amministratore = JSON.parse(localStorage.getItem('Amministratore'));
  @ViewChild('passwordAttuale') passwordAttuale;
  @ViewChild('nuovaPassword') nuovaPassword;
  @ViewChild('confermaNuovaPassword') confermaNuovaPassword;
  @ViewChild('modalModificaPassword') modalModificaPassword;


  constructor(private http: Http) { }

  ngOnInit() {

  }

  /*
  Modifica la password di un amministratore ed effettua i vari controlli.
   */

  public modificaPassword() {

    if (this.amministratore.password === this.passwordAttuale.nativeElement.value) {
      if (this.nuovaPassword.nativeElement.value.length > 7) {
        if (this.confermaNuovaPassword.nativeElement.value === this.nuovaPassword.nativeElement.value) {

          const body = JSON.stringify({id: this.amministratore.id , password: this.nuovaPassword.nativeElement.value});
          const headers = new Headers();
          headers.append('Content-Type', 'application/json; charset=utf-8');


          this.http.post('http://localhost/ingegneriajs/src/php/modificaPasswordAmministratore.php', body, headers).subscribe(
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
