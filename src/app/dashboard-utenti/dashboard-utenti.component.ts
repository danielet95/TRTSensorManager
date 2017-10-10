import {Component, OnInit, ViewChild} from '@angular/core';
import {SensoriService} from '../../classes/SensoriService';
import {Sensore} from '../../classes/Sensore';
import {Rilevazione} from '../../classes/Rilevazione';
import {RilevazioniService} from '../../classes/RilevazioniService';
import {AmministratoriService} from '../../classes/AmministratoriService';
import {UtentiService} from '../../classes/UtentiService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-utenti.component.html',
  styleUrls: ['./dashboard-utenti.component.css'],
  providers: [SensoriService, RilevazioniService]
})


export class DashboardUtentiComponent implements OnInit {

  public listaSensori: Sensore[] = [];
  // public num: number;
  public codiceSensore: string;
  public listaRilevazioni: Rilevazione[] = [];
 // public idAmministratore = this.amministratoriService.getId();
 //  public idUtente = this.utentiService.getUtente().id;
  public utente = JSON.parse(localStorage.getItem('Utente'));
  @ViewChild ('modalRilevazioni') modalRilevazioni;


  constructor(private sensoriService: SensoriService, private rilevazioniService: RilevazioniService,
              private amministratoriService: AmministratoriService, private utentiService: UtentiService) { }

  ngOnInit() {

    this.sensoriService.getSensoriDashboardUtenti(this.utente.id, 'http://localhost/ingegneria/src/getSensoriDashboardUtenti.php',
      (data) => {this.listaSensori = data; }
    );
  }

  public rimuoviSensoreDashboard(i) {
    // this.sensoriService.updateVisibilitaSensori(this.listaSensori[i].codice, false,
    //   () => {
    //     this.listaSensori.splice(i, 1);
    //   });
      this.sensoriService.rimuoviSensoreDashboardUtenti(this.listaSensori[i].codice, this.utente.id,
      () => {
        this.listaSensori.splice(i, 1);
      });
  }

  public mostraRilevazioni(i) {

    // this.modalRilevazioni.open();
    this.codiceSensore = this.listaSensori[i].codice;
    this.rilevazioniService.getRilevazioni(this.listaSensori[i].codice, 'http://localhost/ingegneria/src/readRilevazioni.php',
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
