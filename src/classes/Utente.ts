export class Utente  {
  private id: number;
  public nome: string;
  public cognome: string;
  public username: string;
  public password: string;
  public amministratore: number;

  public setId(id) {
    this.id = id;
  }

  public getId(): number {
    return this.id;
  }
}
