import {Component, OnInit, ViewChild} from '@angular/core';
import {SensoriService} from '../../classes/SensoriService';
import {Sensore} from '../../classes/Sensore';
import {Rilevazione} from '../../classes/Rilevazione';
import {RilevazioniService} from '../../classes/RilevazioniService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-utenti.component.html',
  styleUrls: ['./dashboard-utenti.component.css'],
  providers: [SensoriService, RilevazioniService]
})


export class DashboardUtentiComponent implements OnInit {

  public listaSensori: Sensore[] = [];
  public codiceSensore: string;
  public listaRilevazioni: Rilevazione[] = [];
  public utente = JSON.parse(localStorage.getItem('Utente'));
  @ViewChild ('modalRilevazioni') modalRilevazioni;


  constructor(private sensoriService: SensoriService, private rilevazioniService: RilevazioniService) { }

  ngOnInit() {

    this.sensoriService.getSensoriDashboardUtente(this.utente.id, 'http://localhost/ingegneriajs/src/php/getSensoriDashboardUtenti.php',
      (data) => {this.listaSensori = data; }
    );
  }

  /*
  Rimuove un sensore dalla dashboard dell'utente.
  Riceve in input i che indica la posizione occupata dal sensore all'interno dell'array listaSensori.
   */

  public rimuoviSensoreDashboardUtente(i) {

      this.sensoriService.updateVisibilitaSensoriDashboardUtenti(this.listaSensori[i].codice, this.utente.id,
        'http://localhost/ingegneriajs/src/php/rimuoviSensoreDashboardUtenti.php',
      () => {
        this.listaSensori.splice(i, 1);
      });
  }

  /*
  Mostra le rilevazioni effettuate da un sensore.
  Riceve in input i che indica la posizione occupata dal sensore all'internp dell'array listaSensori.
   */

  public mostraRilevazioni(i) {

    this.codiceSensore = this.listaSensori[i].codice;
    this.rilevazioniService.getRilevazioniSensore(this.listaSensori[i].codice, 'http://localhost/ingegneriajs/src/php/getRilevazioni.php',
      (data) => {this.listaRilevazioni = data,
        setTimeout(() => {
          if (this.listaRilevazioni.length > 0) {
            this.modalRilevazioni.open();
          } else {
            alert('Nessuna rilevazione presente per questo sensore');

          }
        }, 100);
      });
  }

}
