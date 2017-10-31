import {Component, OnInit, ViewChild} from '@angular/core';
import {Utente} from '../../classes/Utente';
import {AmministratoriService} from '../../classes/AmministratoriService';
import {UtentiService} from '../../classes/UtentiService';
import {Amministratore} from '../../classes/Amministratore';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  @ViewChild('username') username;
  @ViewChild('password') password;
  public listaUtenti: Utente[] = [];
  public listaAmministratori: Amministratore[] = [];


  constructor(private amministratoriService: AmministratoriService, private utentiService: UtentiService, private router: Router) {
  }

  ngOnInit() {
    this.amministratoriService.getAmministratoriDatabase(
      (data) => {
        this.listaAmministratori = data;
      }
    );
    this.utentiService.getUtentiDatabase(
      (data) => {
        this.listaUtenti = data;
      }
    );

  }

  /*
  Verfica che le credenziali immesse dall'utente/amministratore siano corrette.
  Se si tratta di un amministratore lo memorizza nella localStorage con la chiave 'Amministratore' e lo reindirizza
  alla dashboard degli amministratori.
  Se si tratta di un utente lo memorizza nella localStorage con la chiave 'Utente' e lo reindirizza
  alla dashboard degli utenti.
   */

  public verificaCredenziali() {

    let trovato = false;
    for (let i = 0; i < this.listaAmministratori.length && (!trovato); i++) {
      if (this.listaAmministratori[i].username === this.username.nativeElement.value) {
        if (this.listaAmministratori[i].password === this.password.nativeElement.value) {
          trovato = true;

          localStorage.setItem('Amministratore', JSON.stringify(this.listaAmministratori[i]));

          this.router.navigate(['/dashboard']);
        }
      }
    }

    if (!trovato) {
      for (let i = 0; i < this.listaUtenti.length && (!trovato); i++) {
        if (this.listaUtenti[i].username === this.username.nativeElement.value) {
          if (this.listaUtenti[i].password === this.password.nativeElement.value) {
            trovato = true;

            localStorage.setItem('Utente', JSON.stringify(this.listaUtenti[i]));

            this.router.navigate(['/dashboard-utenti']);
          }
        }
      }
    }

    if (!trovato) {
      alert('credenziali non valide');
    }

  }

}
