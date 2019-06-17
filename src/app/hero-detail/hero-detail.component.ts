import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Hero } from '../hero';
import { State } from '../reducers';
import { getHero, updateHero } from '../reducers/hero.actions';
import { selectCurrentHero } from '../reducers/heroes.reducer';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {
  hero: Observable<Hero>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<State>
  ) {
    const heroId = +this.route.snapshot.paramMap.get('id');
    store.dispatch(getHero({heroId}));

    this.hero = store.select(selectCurrentHero).pipe(
      // make a copy because we intend to mutate it locally
      map(hero => ({ ...hero }))
    );
  }

  goBack(): void {
    this.location.back();
  }

  save(hero: Hero): void {
    this.store.dispatch(updateHero({hero}));
    this.goBack();
  }
}
