import { createAction, props } from "@ngrx/store";

// export const increment=createAction('[INCREMENT]')
// export const decrement=createAction('[DECREMENT]')
// export const reset=createAction('[REST]')


export const increment=createAction('increment')
export const decrement=createAction('decrement')
export const reset=createAction('reset')

export const customIncrement =createAction('customIncrement',props<{value:number}>())