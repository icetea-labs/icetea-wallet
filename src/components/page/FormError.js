import React, { Component } from 'react';
import errorIc from '../../assets/img/error-icon.png';
import './UnlockWallet.css';

function FormError(props) {
    /* isHidden = true, return null*/
    if (props.isHidden) { return null;}

    return ( <div className="ipCh">
        <img src={errorIc} alt="" />
        <span>{props.errorMessage}</span>
        </div>)
}

export default FormError