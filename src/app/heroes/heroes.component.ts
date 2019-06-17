import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Hero } from '../hero';
import { State } from '../reducers';
import { addHero, deleteHero } from '../reducers/hero.actions';
import { selectAllHeroes } from '../reducers/heroes.reducer';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
  heroes: Observable<Hero[]>;

  constructor(private store: Store<State>) {
    this.heroes = store.select(selectAllHeroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    const hero = { name } as Hero;
    this.store.dispatch(addHero({hero}));
  }

  delete(hero: Hero): void {
    this.store.dispatch(deleteHero({hero}));
  }
}
