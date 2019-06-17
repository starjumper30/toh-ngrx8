import { InjectionToken } from '@angular/core';
import {
  Action,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { heroReducer, HeroState } from './heroes.reducer';

export interface State {
  heroes: HeroState;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>
  >('Root reducers token', {
  factory: () => ({
    heroes: heroReducer
  }),
});


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
