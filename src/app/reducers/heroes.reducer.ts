import { Action, createFeatureSelector, createReducer, createSelector, on, } from '@ngrx/store';

import { Hero } from '../hero';
import {
  addHeroSuccess,
  deleteHeroSuccess,
  getHeroSuccess,
  loadHeroesSuccess,
  updateHeroSuccess
} from './hero.actions';

export interface HeroState {
  heroes: Hero[];
  selectedHeroId?: number;
}

const initialState: HeroState = {
  heroes: []
};

export const heroReducer = createReducer(
  initialState,
  on(getHeroSuccess, (state, action) => ({...state, selectedHeroId: action.hero.id})),
  on(deleteHeroSuccess, (state, action) => ({
    ...state,
    selectedHeroId: undefined,
    heroes: state.heroes.filter(hero => hero.id !== action.hero.id)
  })),
  on(loadHeroesSuccess, (state, action) => ({...state, heroes: action.heroes})),
  on(addHeroSuccess, (state, action) => ({...state, heroes: [...state.heroes, action.hero]})),
  on(updateHeroSuccess, (state, action) => {
    const index = state.heroes
      .findIndex((hero: Hero) => hero.id === action.hero.id);
    if (index >= 0) {
      const heroes: Hero[] = state.heroes;
      return {
        ...state, heroes: [
          ...heroes.slice(0, index),
          action.hero,
          ...state.heroes.slice(index + 1)
        ]
      };
    }
    return state;
  })
);

export const selectHeroState = createFeatureSelector<HeroState>('heroes');

const getSelectedHeroId = (state: HeroState) => state.selectedHeroId;

export const selectAllHeroes = createSelector(
  selectHeroState,
  state => state.heroes
);

const selectCurrentHeroId = createSelector(
  selectHeroState,
  getSelectedHeroId
);

export const selectCurrentHero = createSelector(
  selectAllHeroes,
  selectCurrentHeroId,
  (heroes, heroId) => {
    return heroes.find(hero => hero.id === heroId);
  }
);
