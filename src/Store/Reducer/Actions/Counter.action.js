import { DECREMENT, INCREMENT, INCREMENT_N } from "../../ActionTypes/Counter.actions.types"

export const increment = () => ({type:INCREMENT})
export const decrement = () => ({type:DECREMENT})
export const increment_n = (payload) => ({type: INCREMENT_N,payload})