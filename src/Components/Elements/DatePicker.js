import React from "react";
import { Form } from 'react-bootstrap';

const DatePicker = ({ name, label, placeholder, handler, required = false, locale }) => {      


  return (
    <Form.Group controlId="dob">
    <div className=" mb-3">
    <label className="form-label py-1"> {label}  
    {required === true && (   <span className="req"> *</span> ) }
    </label> 
    <div className="input-group mb-3">     
       <Form.Control 
        type="date" 
        name={name} 
        onChange={(e) => handler(e.target.value)}
        placeholder={placeholder}
       // defaultValue={"2000-01-01"}
     />        
    </div>
    </div>
    </Form.Group>
  );
};

export default DatePicker;