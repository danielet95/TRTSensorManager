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
  public idUtente: number;
  public idAmministratore: number;


  constructor(private amministratoriService: AmministratoriService, private utentiService: UtentiService, private router: Router) {
  }

  ngOnInit() {
    this.amministratoriService.getAmministratori(
      (data) => {
        this.listaAmministratori = data;
      }
    );
    this.utentiService.getUtenti(
      (data) => {
        this.listaUtenti = data;
      }
    );
  }


  public verificaCredenziali() {

    let trovato = false;
    for (let i = 0; i < this.listaAmministratori.length && (!trovato); i++) {
      if (this.listaAmministratori[i].username === this.username.nativeElement.value) {
        if (this.listaAmministratori[i].password === this.password.nativeElement.value) {
          trovato = true;
          this.idAmministratore = this.listaAmministratori[i].id;
          console.log(this.listaAmministratori[i].id);
          this.amministratoriService.setId(this.listaAmministratori[i].id);

          this.amministratoriService.setAmministratore(this.listaAmministratori[i].id, this.listaAmministratori[i].nome,
            this.listaAmministratori[i].cognome, this.listaAmministratori[i].username, this.listaAmministratori[i].password);

          console.log(this.amministratoriService.getAmministratore().nome);

          localStorage.setItem('Amministratore', JSON.stringify(this.listaAmministratori[i]));

          this.router.navigate(['/dashboard']);
        }
      }
    }
    console.log(trovato);
    if (!trovato) {
      for (let i = 0; i < this.listaUtenti.length && (!trovato); i++) {
        if (this.listaUtenti[i].username === this.username.nativeElement.value) {
          if (this.listaUtenti[i].password === this.password.nativeElement.value) {
            trovato = true;
            this.idUtente = this.listaUtenti[i].getId();

            this.amministratoriService.setId(this.listaUtenti[i].amministratore);

            this.utentiService.setUtente(this.listaUtenti[i].getId(), this.listaUtenti[i].nome, this.listaUtenti[i].cognome,
              this.listaUtenti[i].username, this.listaUtenti[i].password, this.listaUtenti[i].amministratore);

            localStorage.setItem('Utente', JSON.stringify(this.listaUtenti[i]));

            console.log(this.utentiService.getUtente().nome);

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
