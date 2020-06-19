import React from 'react';

const Selectbox = ({ field: { name, ...field }, form: { touched, errors }, label, help, options, ...props }) => {
    const invalid = touched[name] && errors[name];

    return (
        <div className="form-group">
            { label && <label htmlFor={ name }>{ label }</label> }
            <select
                id={ name }
                name={ name }
                {...field}
                { ...props }
                className={ invalid ? 'form-control is-invalid' : 'form-control' }
            >
                <option value="">Select</option>
                {
                    options.map((v, i) => <option key={i} value={v}>{ v }</option>)
                }
            </select>
            { invalid && <div className="invalid-feedback">{ invalid }</div> }
            { help && <small className="form-text text-muted">{ help }</small> }
        </div>
    );
};

export default Selectbox;