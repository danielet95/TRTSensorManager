import { Http } from '@angular/http';
import { Injectable} from '@angular/core';

@Injectable()
export class AmministratoriService {

  constructor(private http: Http) {
  }

  /*
  Tramite una richiesta http di tipo GET preleva dal database la lista degli amministratori.
   */

  public getAmministratoriDatabase(onComplete) {
    return this.http.get('http://localhost/ingegneriajs/src/php/getAmministratori.php').subscribe(
      (data) => onComplete(data.json())
    );

  }
}
