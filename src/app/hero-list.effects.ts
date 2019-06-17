import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { EMPTY, MonoTypeOperatorFunction, Observable } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';

import {
  addHero,
  addHeroSuccess,
  deleteHero,
  deleteHeroSuccess,
  getHero,
  getHeroSuccess,
  loadHeroesSuccess,
  updateHero,
  updateHeroSuccess
} from './reducers/hero.actions';

@Injectable()
export class HeroListEffects {
  constructor(
    private actions$: Actions,
    private svc: HeroService,
    private messageService: MessageService,
  ) { }


  loadHeroes = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      mergeMap(() => this.svc.getHeroes()
        .pipe(
          map((heroes) => loadHeroesSuccess({heroes})),
          this.handleError('getHeroes')
        ))
    )
  );

  getHero = createEffect(() =>
    this.actions$.pipe(
      ofType(getHero),
      map(action => action.heroId),
      switchMap(id => this.svc.getHero(id)
        .pipe(
          map(hero => getHeroSuccess({hero})),
          this.handleError(`getHero id=${id}`)
        ))
      )
    );

  addHero = createEffect(() =>
    this.actions$.pipe(
      ofType(addHero),
      map(action => action.hero),
      mergeMap(hero => this.svc.addHero(hero)
        .pipe(
          map(savedHero => addHeroSuccess({hero: savedHero})),
          this.handleError('addHero')
        )
      )
    )
  );

  updateHero = createEffect(() =>
    this.actions$.pipe(
      ofType(updateHero),
      map(action => action.hero),
      mergeMap(hero => this.svc.updateHero(hero).pipe(
        map(() => updateHeroSuccess({hero})),
        this.handleError('updateHero'))
      ))
    );

  deleteHero = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteHero),
      map(action => action.hero),
      mergeMap(hero => this.svc.deleteHero(hero).pipe(
        map(() => deleteHeroSuccess({hero})),
        this.handleError('deleteHero')
      )))
  );

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   */
  private handleError(operation = 'operation'): MonoTypeOperatorFunction<Action> {
    return catchError((error: any): Observable<Action> => {

      // TODO: send the error to remote logging infrastructure
      console.error({ error }); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return EMPTY;
    });
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroListEffects: ' + message);
  }
}
