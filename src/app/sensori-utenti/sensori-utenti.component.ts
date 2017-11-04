import {Component, OnInit, ViewChild} from '@angular/core';
import {SensoriService} from '../../classes/SensoriService';
import {Sensore} from '../../classes/Sensore';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sensori',
  templateUrl: './sensori-utenti.component.html',
  styleUrls: ['./sensori-utenti.component.css'],
  providers: [SensoriService]
})
export class SensoriUtentiComponent implements OnInit {

  @ViewChild('codice') codice;
  @ViewChild('myModal') modal;
  public listaSensori: Sensore[] = [];
  public amministratore = JSON.parse(localStorage.getItem('Amministratore'));
  public utente = JSON.parse(localStorage.getItem('Utente'));

  constructor(private sensoriService: SensoriService, private router: Router) {}

  ngOnInit() {

    this.sensoriService.getSensoriPiattaformaUtenti(this.utente.amministratore, this.utente.id,
      'http://localhost/php/getSensoriUtenti.php',
      (data) => {this.listaSensori = data; });
  }

  /*
  Controlla quali sensori sono stati selezionati e li aggiunge alla dashboard dell'utente.
   */

  public aggiungiSensoriDashboardUtente() {

      let checked = false;
      for (let i = 0; i < this.listaSensori.length; i++) {

        if (this.listaSensori[i].aggiuntoDashboardUtente) {


          this.sensoriService.updateVisibilitaSensoriDashboardUtenti(this.listaSensori[i].codice, this.utente.id,
            'http://localhost/php/aggiungiSensoriDashboardUtenti.php',
            data => {
              setTimeout(() => {this.router.navigate(['./dashboard-utenti']); }, 1000);
            });
          checked = true;
        }
      }

      if (!checked) {
        alert('Non è stato selezionato alcun sensore da aggiungere alla dashboard');
      }
  }
}

