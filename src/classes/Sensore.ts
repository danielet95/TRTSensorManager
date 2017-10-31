export class Sensore {
  private _codice: string;
  private _nome: string;
  private _tipo: string;
  private _dataCreazione: string;
  private _aggiuntoDashboardAmministratore: boolean;
  private _aggiuntoDashboardUtente: boolean;
  private _aggiuntoPiattaforma: boolean;
  private _amministratore: number;


  get codice(): string {
    return this._codice;
  }

  set codice(value: string) {
    this._codice = value;
  }

  get nome(): string {
    return this._nome;
  }

  set nome(value: string) {
    this._nome = value;
  }

  get tipo(): string {
    return this._tipo;
  }

  set tipo(value: string) {
    this._tipo = value;
  }

  get dataCreazione(): string {
    return this._dataCreazione;
  }

  set dataCreazione(value: string) {
    this._dataCreazione = value;
  }

  get aggiuntoDashboardAmministratore(): boolean {
    return this._aggiuntoDashboardAmministratore;
  }

  set aggiuntoDashboardAmministratore(value: boolean) {
    this._aggiuntoDashboardAmministratore = value;
  }

  get aggiuntoDashboardUtente(): boolean {
    return this._aggiuntoDashboardUtente;
  }

  set aggiuntoDashboardUtente(value: boolean) {
    this._aggiuntoDashboardUtente = value;
  }

  get aggiuntoPiattaforma(): boolean {
    return this._aggiuntoPiattaforma;
  }

  set aggiuntoPiattaforma(value: boolean) {
    this._aggiuntoPiattaforma = value;
  }

  get amministratore(): number {
    return this._amministratore;
  }

  set amministratore(value: number) {
    this._amministratore = value;
  }
}
