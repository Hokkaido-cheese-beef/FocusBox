import { Store, combineReducers } from 'redux'
import userSlice, { initialState as userInitialState } from './user/slice'
import sensorSlice, { initialState as sensorInitialState } from './sensor/slice'
import blinkSlice, { initialState as blinkInitialState } from './blink/slice'
import workTimeSlice, { initialState as workTimeInitialState } from './workTime/slice'

export const rootReducer = combineReducers({
    user: userSlice,
    sensor: sensorSlice,
    blink: blinkSlice,
    workTime: workTimeSlice
})

export const preloadedState = () => {
    return {
        user: userInitialState,
        sensor: sensorInitialState,
        blink: blinkInitialState,
        workTime: workTimeInitialState
    }
}

export type StoreState = ReturnType<typeof preloadedState>

export type ReduxStore = Store<StoreState>