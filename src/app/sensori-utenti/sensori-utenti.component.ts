import {Component, OnInit, ViewChild} from '@angular/core';
import {SensoriService} from '../../classes/SensoriService';
import {Sensore} from '../../classes/Sensore';
import {AmministratoriService} from '../../classes/AmministratoriService';
import {Router} from '@angular/router';
import {UtentiService} from '../../classes/UtentiService';

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
  // public idAmministratore = this.amministratoriService.getId();
  public amministratore = JSON.parse(localStorage.getItem('Amministratore'));
  public utente = JSON.parse(localStorage.getItem('Utente'));
  // public idUtente = this.utentiService.getUtente().id;

  constructor(private sensoriService: SensoriService, private amministratoriService: AmministratoriService,
              private utentiService: UtentiService, private router: Router) {}

  ngOnInit() {

    this.sensoriService.getSensoriPiattaformaUtenti(this.amministratore.id, this.utente.id,
      'http://localhost/ingegneria/src/readSensoriUtenti.php',
      (data) => {this.listaSensori = data; });

    console.log(this.amministratore.id);
    console.log(this.utente.id);
  }

  public aggiungiSensoriDashboard() {

      let checked = false;
      for (let i = 0; i < this.listaSensori.length; i++) {

        if (this.listaSensori[i].aggiuntoDashboardUtente) {
          console.log(this.listaSensori[i].codice);
          this.sensoriService.aggiungiSensoriDashboardUtenti(this.utente.id, this.listaSensori[i].codice,
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

