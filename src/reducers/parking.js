import { SET_PARKING_DATA, PARK_CAR, REMOVE_SLOT } from "../types";

export default (state = null, action) => {
    switch (action.type) {
        case SET_PARKING_DATA:
          return action.payload;
        case PARK_CAR:
          const availableSlot = Object.keys(state.slots).find(v => state.slots[v] === null);
          state.car_parked++;
          state.slots[availableSlot] = { ...action.payload, datetime: new Date() };
          return { ...state };
        case REMOVE_SLOT:
          state.car_parked--;
          state.totalMoney += 20;
          state.slots[action.payload] = null;
          return { ...state };
        default:
          return state;
    }
};