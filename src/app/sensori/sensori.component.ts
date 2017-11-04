import {Component, OnInit, ViewChild} from '@angular/core';
import {SensoriService} from '../../classes/SensoriService';
import {Sensore} from '../../classes/Sensore';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sensori',
  templateUrl: './sensori.component.html',
  styleUrls: ['./sensori.component.css']
})
export class SensoriComponent implements OnInit {

  @ViewChild('codice') codice;
  @ViewChild('modalAggiuntaSensorePiattaforma') modalAggiuntaSensorePiattaforma;
  @ViewChild('modalConfermaRimozioneSensore') modalConfermaRimozioneSensore;
  public listaSensoriDatabase: Sensore [] = [];
  public listaSensori: Sensore[] = [];
  public amministratore = JSON.parse(localStorage.getItem('Amministratore'));
  public posizioneSensore;
  sensoriFilter: any = { codice: '' };

  constructor(private sensoriService: SensoriService, private router: Router) {}

  ngOnInit() {

    this.sensoriService.getSensoriPiattaformaAmministratore(this.amministratore.id,
      'http://localhost/php/getSensoriAmministratori.php',
      (data) => {this.listaSensori = data; });

  }

  /*
  Apre la finestra che permette di aggiungere un sensore alla piattaforma.
   */

  public apriModalAggiuntaSensorePiattafroma() {

    this.sensoriService.getSensoriDatabase('http://localhost/php/getSensoriDatabase.php',
      (data) => {this.listaSensoriDatabase = data; });

    this.modalAggiuntaSensorePiattaforma.open();
  }

  /*
  Controlla che il codice inserito nella finestra di aggiunta dei sensori sia presente nel database.
  Se è presente aggiunge il sensore avente quel codice alla piattaforma.
   */

  public aggiungiSensorePiattaforma() {

    let trovato = false;
    let aggiunto = false;
    for (let i = 0; i < this.listaSensoriDatabase.length; i++) {
      if (this.codice.nativeElement.value === this.listaSensoriDatabase[i].codice) {
        if (this.listaSensoriDatabase[i].amministratore === null) {
          trovato = true;
        } else {
          aggiunto = true;
        }
      }
    }

    if (trovato) {
      const urlAggiunta = 'http://localhost/php/aggiungiSensorePiattaforma.php';
      this.sensoriService.aggiungiRimuoviSensorePiattaforma(this.codice.nativeElement.value, this.amministratore.id, urlAggiunta,
        () => {
          this.sensoriService.getSensoriPiattaformaAmministratore(this.amministratore.id,
            'http://localhost/php/getSensoriAmministratori.php',
            (data) => {this.listaSensori = data; });
        });
      this.modalAggiuntaSensorePiattaforma.close();
    } else if (!aggiunto) {
      alert('Il codice inserito è errato');
      this.modalAggiuntaSensorePiattaforma.close();
    }

    if (aggiunto) {
      alert('Il sensore è già stato aggiunto alla piattaforma');
      this.modalAggiuntaSensorePiattaforma.close();
    }

  }

  /*
  Apre la finestra per confermare la rimozione di un sensore dalla piattaforma.
   */

  public apriModalConfermaRimozioneSensore(i) {

    this.modalConfermaRimozioneSensore.open();

    this.posizioneSensore = i;

  }

  /*
  Rimuove il sensore dalla piattaforma
   */

  public rimuoviSensorePiattaforma() {

    const urlRimozione = 'http://localhost/php/rimuoviSensorePiattaforma.php';
    this.sensoriService.updateVisibilitaSensoriDashboardAmministratore(this.listaSensori[this.posizioneSensore].codice, false, () => {});
    this.sensoriService.aggiungiRimuoviSensorePiattaforma(this.listaSensori[this.posizioneSensore].codice,
      this.amministratore.id, urlRimozione,
      () => {
      this.listaSensori.splice(this.posizioneSensore, 1);
    });
    this.modalConfermaRimozioneSensore.close();
  }

  /*
  Controlla quali sensori sono stati selezionati e li aggiunge alla dashboard dell'amministratore.
   */

  public aggiungiSensoriDashboardAmministratore() {

    let checked = false;
    for (let i = 0; i < this.listaSensori.length; i++) {
      if (this.listaSensori[i].aggiuntoDashboardAmministratore) {
        this.sensoriService.updateVisibilitaSensoriDashboardAmministratore(this.listaSensori[i].codice,
          this.listaSensori[i].aggiuntoDashboardAmministratore,
          () => {
            setTimeout(() => {this.router.navigate(['./dashboard']); }, 1000);
          });
        checked = true;
      }
    }

    if (!checked) {
      alert('Non è stato selezionato alcun sensore da aggiungere alla dashboard');
    }
  }
}
