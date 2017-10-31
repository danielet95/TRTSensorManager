export class Rilevazione {
  private _rilevazione: string;
  private _sensore: string;


  get rilevazione(): string {
    return this._rilevazione;
  }

  set rilevazione(value: string) {
    this._rilevazione = value;
  }

  get sensore(): string {
    return this._sensore;
  }

  set sensore(value: string) {
    this._sensore = value;
  }
}
