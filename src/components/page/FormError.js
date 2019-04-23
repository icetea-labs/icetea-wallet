import React, { Component } from 'react';

function FormError(props) {
    /* isHidden = true, return null*/
    if (props.isHidden) { return null;}

    return ( <div>{props.errorMessage}</div>)
}

export default FormError