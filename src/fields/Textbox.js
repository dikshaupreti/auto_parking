import React from 'react';

const Textbox = ({ field: { name, ...field }, form: { touched, errors }, label, help, multiline, ...props }) => {
    const invalid = touched[name] && errors[name];
    let Component = multiline ? 'textarea' : 'input';

    return (
        <div className="form-group">
            { label && <label htmlFor={ name }>{ label }</label> }
            <Component
                className={ invalid ? 'form-control is-invalid' : 'form-control' } 
                { ...props } 
                id={ name }
                name={ name }
                {...field}
            />
            { invalid && <div className="invalid-feedback">{ invalid }</div> }
            { help && <small className="form-text text-muted">{ help }</small> }
        </div>
    );
};

export default Textbox;