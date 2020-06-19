import { SET_PARKING_DATA, PARK_CAR, REMOVE_SLOT } from '../types';
import history from '../history';

const fakeData = [
    {
        plate_no: 'KA-64-YX-0619',
        color: 'Red'
    },
    {
        plate_no: 'KA-62-AO-1533',
        color: 'Red'
    },
    {
        plate_no: 'KA-50-MG-5373',
        color: 'Blue'
    },
    {
        plate_no: 'KA-58-TW-9181',
        color: 'Blue'
    },
    {
        plate_no: 'KA-62-VA-0202',
        color: 'Black'
    }
];

export const setParkingData = data => dispatch => {
    data.slots = {};
    data.totalMoney = 0;
    for (let i = 1; i <= data.total_places; i++) {
        data.slots[i] = (i <= data.car_parked) ? ({ ...fakeData[Math.floor(Math.random() * fakeData.length)], datetime: new Date() }) : null;
    }
    dispatch({
        type: SET_PARKING_DATA,
        payload: data
    });
    history.replace('/list');
};

export const parkCar = data => dispatch => {
    console.log(data);
    dispatch({
        type: PARK_CAR,
        payload: data
    });
    history.replace('/list');
};

export const removeSlot = slot => dispatch => {
    dispatch({
        type: REMOVE_SLOT,
        payload: slot
    });
};