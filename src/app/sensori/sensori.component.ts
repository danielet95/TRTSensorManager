import {Component, OnInit, ViewChild} from '@angular/core';
import {SensoriService} from '../../classes/SensoriService';
import {Sensore} from '../../classes/Sensore';
import {AmministratoriService} from '../../classes/AmministratoriService';
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
  // public idAmministratore = this.amministratoriService.getId();
  public amministratore = JSON.parse(localStorage.getItem('Amministratore'));
  public posizioneSensore;
  sensoriFilter: any = { codice: '' };

  constructor(private sensoriService: SensoriService, private amministratoriService: AmministratoriService, private router: Router) {}

  ngOnInit() {

    this.sensoriService.postId(this.amministratore.id, 'http://localhost/ingegneria/src/readSensoriAmministratori.php',
      (data) => {this.listaSensori = data; });

  }

  public apriModalAggiuntaSensorePiattafroma() {

    this.sensoriService.getSensoriDatabase('http://localhost/ingegneria/src/getSensoriDatabase.php',
      (data) => {this.listaSensoriDatabase = data; });

    this.modalAggiuntaSensorePiattaforma.open();
  }


  public aggiungiSensorePiattaforma() {

    let trovato = false;
    let aggiunto = false;
    for (let i = 0; i < this.listaSensoriDatabase.length; i++) {
      if (this.codice.nativeElement.value === this.listaSensoriDatabase[i].codice) {
        console.log(this.listaSensoriDatabase[i].amministratore);
        if (this.listaSensoriDatabase[i].amministratore === null) {
          trovato = true;
        } else {
          aggiunto = true;
        }
      }
    }

    if (trovato) {
      const urlAggiunta = 'http://localhost/ingegneria/src/inserisciSensorePiattaforma.php';
      this.sensoriService.postSensori(this.codice.nativeElement.value, this.amministratore.id, urlAggiunta,
        () => {
          this.sensoriService.postId(this.amministratore.id, 'http://localhost/ingegneria/src/readSensoriAmministratori.php',
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

  public apriModalConfermaRimozioneSensore(i) {

    this.modalConfermaRimozioneSensore.open();

    this.posizioneSensore = i;

  }

  public rimuoviSensorePiattaforma() {
    // const removed = this.listaSensori.splice(i, 1);
    const urlRimozione = 'http://localhost/ingegneria/src/rimuoviSensorePiattaforma.php';
    this.sensoriService.updateVisibilitaSensori(this.listaSensori[this.posizioneSensore].codice, false, () => {});
    this.sensoriService.postSensori(this.listaSensori[this.posizioneSensore].codice, this.amministratore.id, urlRimozione,
      () => {
      this.listaSensori.splice(this.posizioneSensore, 1);
    });
    this.modalConfermaRimozioneSensore.close();
  }

  public aggiungiSensoriDashboard() {

    let checked = false;
    for (let i = 0; i < this.listaSensori.length; i++) {
      if (this.listaSensori[i].aggiuntoDashboardAmministratore) {
        this.sensoriService.updateVisibilitaSensori(this.listaSensori[i].codice, this.listaSensori[i].aggiuntoDashboardAmministratore,
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
