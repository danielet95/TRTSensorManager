import {Component, OnInit, ViewChild} from '@angular/core';
import {SensoriService} from '../../classes/SensoriService';
import {Sensore} from '../../classes/Sensore';
import {Rilevazione} from '../../classes/Rilevazione';
import {RilevazioniService} from '../../classes/RilevazioniService';
import {AmministratoriService} from '../../classes/AmministratoriService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [SensoriService, RilevazioniService]
})


export class DashboardComponent implements OnInit {

  public listaSensori: Sensore[] = [];
  public codiceSensore: string;
  public listaRilevazioni: Rilevazione[] = [];
  // public idAmministratore = this.amministratoriService.getId();
  public amministratore = JSON.parse(localStorage.getItem('Amministratore'));
  @ViewChild ('modalRilevazioni') modalRilevazioni;


  constructor(private sensoriService: SensoriService, private rilevazioniService: RilevazioniService,
              private amministratoriService: AmministratoriService) {}

  ngOnInit() {

    this.sensoriService.getSensoriDashboard(this.amministratore.id, 'http://localhost/ingegneria/src/getSensoriDashboard.php',
    (data) => {this.listaSensori = data; }
   );
  }

  public rimuoviSensoreDashboard(i) {
    this.sensoriService.updateVisibilitaSensori(this.listaSensori[i].codice, false,
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
