import React from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import Textbox from '../fields/Textbox';
import { setParkingData } from '../actions/parking';

const schema = Yup.object({
    total_places: Yup.number()
        .min(1, 'This field must be greater than 0')
        .required('Required!'),
    car_parked: Yup.number()
        .min(1, 'This field must be greater than 0')
        .max(Yup.ref('total_places'), 'Car parked should be less than or equal to no. of total places')
        .required('Required!')
});

const Main = () => {
    const dispatch = useDispatch();
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-4 offset-4">
                    <Formik
                    initialValues={{
                        total_places: '',
                        car_parked: ''
                    }}
                    onSubmit={(values) => {
                        dispatch(setParkingData(values));
                    }}
                    validationSchema={schema}
                    >
                        {({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <h4 className="mt-5">Enter details</h4>
                                <Field name="total_places" type="number" component={Textbox} label="Number of parking places" />
                                <Field name="car_parked" type="number" component={Textbox} label="Number of cars parked"/>
                                <button type="submit" className="btn btn-primary">
                                    Save
                                </button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Main;