import {Recipe} from "../entities/recipe";
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class DataService {
  constructor(private http:Http) {

  }

  getData() : Observable<Recipe[]> {
    return this.http.get('/data').map(resp => {
      return <Recipe[]> resp.json();
    })
  }
}
