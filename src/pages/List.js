import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field } from 'formik';

import Textbox from '../fields/Textbox';
import history from '../history';
import { removeSlot } from '../actions/parking';
import Selectbox from '../fields/Selectbox';

const colors = [
    'Red',
    'Blue',
    'Green',
    'Yellow'
];

const List = () => {
    const parking = useSelector(state => state.parking);
    const [filter, setFilter] = useState({
        reg_no: '',
        color: ''
    });
    const [filterData, setFilterData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const data = parking && Object.entries(parking.slots).filter(v => {
            return v[1] && v[1].plate_no.toLowerCase().includes(filter.reg_no.toLowerCase()) && v[1].color.includes(filter.color);
        });
        setFilterData(data);
    }, [filter, parking]);

    const onParkCarClick = () => {
        history.push('/park-car');
    };

    const onRemoveClick = slot => {
        dispatch(removeSlot(slot));
    };

    if (!parking) return <Redirect to="/" />;

    return (
        <div className="container-fluid">
            <div className="row align-items-center">
                <div className="col mt-4">
                    <p>Total Parking Slots - <span className="text-danger">{ parking.total_places }</span></p>
                    <p>Available Parking Slots - <span className="text-danger">{ parking.total_places - parking.car_parked }</span></p>
                    <p>Total Money - <span className="text-danger">Rs. { parking.totalMoney }</span></p>
                </div>
                <div className="col-auto">
                    <button className="btn btn-success">Query Data</button>
                    <button type="button" className="btn btn-danger ml-3" disabled={parking.car_parked === parking.total_places} onClick={onParkCarClick}>Park a Car</button>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-auto ml-auto">
                    <Formik
                        initialValues={{
                            reg_no: '',
                            color: ''
                        }}
                        onSubmit={(values) => {
                            setFilter(values);
                        }}
                        onReset={() => {
                            setFilter({
                                reg_no: '',
                                color: ''
                            });
                        }}
                    >
                        {({ handleSubmit, resetForm }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-auto">
                                        <Field name="reg_no" type="text" component={Textbox} placeholder="TYPE REG NO." />
                                    </div>
                                    <div className="col-auto">
                                        <Field name="color" type="text" component={Selectbox} placeholder="Choose Color" options={colors} />
                                    </div>
                                    <div className="col-auto">
                                        <button type="submit" className="btn btn-info">
                                            Search
                                        </button>
                                    </div>
                                    <div className="col-auto">
                                        <button type="button" onClick={resetForm} className="btn btn-secondary">
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>#</th>
                                <th>Car No.</th>
                                <th>Color</th>
                                <th>Slot No.</th>
                                <th>Date Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filterData.map((v, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{v[1].plate_no}</td>
                                        <td>{v[1].color}</td>
                                        <td>{v[0]}</td>
                                        <td>{v[1].datetime.toLocaleString()}</td>
                                        <td>
                                            <button className="btn btn-warning" onClick={() => onRemoveClick(v[0])}>Remove</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default List;