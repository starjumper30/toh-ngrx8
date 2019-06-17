import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Hero } from '../hero';
import { State } from '../reducers';
import { selectAllHeroes } from '../reducers/heroes.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  heroes: Observable<Hero[]>;

  constructor(store: Store<State>) {
    this.heroes = store.select(selectAllHeroes).pipe(
      map(heroes => heroes.slice(1, 5))
    );
  }
}
