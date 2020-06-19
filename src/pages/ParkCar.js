import React from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Textbox from '../fields/Textbox';
import { parkCar } from '../actions/parking';
import Selectbox from '../fields/Selectbox';
import history from '../history';

const colors = [
    'Red',
    'Blue',
    'Green',
    'Yellow'
];

const schema = Yup.object({
    plate_no: Yup.string()
        .max(13, 'Invalid plate no.')
        .matches(/^[a-zA-Z]{2}-[0-9]{2}-[a-zA-Z]{2}-[0-9]{4}$/, 'Invalid plate no. format. Should be in format like KA-58-TW-0001')
        .required('Required!'),
    color: Yup.string()
        .required('Required!')
});

const ParkCar = () => {
    const dispatch = useDispatch();
    const parking = useSelector(state => state.parking);

    if (!parking) return <Redirect to="/" />;
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-4 offset-4">
                    <Formik
                    initialValues={{
                        plate_no: '',
                        color: ''
                    }}
                    onSubmit={(values) => {
                        dispatch(parkCar(values));
                    }}
                    validationSchema={schema}
                    >
                        {({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <h4 className="mt-5">Park a car</h4>
                                <Field name="plate_no" type="text" component={Textbox} label="Plate no" maxLength="13"/>
                                <Field name="color" type="text" component={Selectbox} label="Color" options={colors}/>
                                <button type="submit" className="btn btn-success">
                                    Save
                                </button>
                                <button type="button" className="btn btn-danger ml-4" onClick={() => history.replace('/list')}>
                                    Cancel
                                </button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default ParkCar;