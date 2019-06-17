import { createAction, props } from '@ngrx/store';

import { Hero } from '../hero';

export const loadHeroes = createAction('[Hero] Load Heroes');
export const loadHeroesSuccess = createAction('[Hero] Load Heroes Success', props<{heroes: Hero[]}>());
export const getHero = createAction('[Hero] Get Hero', props<{heroId: number}>());

const heroPayload = props<{hero: Hero}>();

export const getHeroSuccess = createAction('[Hero] Get Hero Success', heroPayload);
export const addHero = createAction('[Hero] Add Hero', heroPayload);
export const addHeroSuccess = createAction('[Hero] Add Hero Success', heroPayload);
export const updateHero = createAction('[Hero] Update Hero', heroPayload);
export const updateHeroSuccess = createAction('[Hero] Update Hero Success', heroPayload);
export const deleteHero = createAction('[Hero] Delete Hero', heroPayload);
export const deleteHeroSuccess = createAction('[Hero] Delete Hero Success', heroPayload);
