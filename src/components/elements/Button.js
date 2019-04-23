// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components'

export const Button = styled.button`
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    color: rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    text-align: center;
    position: relative;
    box-sizing: border-box;
    box-shadow: none;
    border-radius: 3px;
    overflow: hidden;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
    outline: none;
    width: ${props => props.width || "10px" };
    background: ${props => props.height ? 'linear-gradient(90deg, rgb(239, 184, 11) 0%, rgb(251, 218, 60) 100%)': 'rgb(132, 142, 156)' };
    &.active {
      background: linear-gradient(90deg, rgb(239, 184, 11) 0%, rgb(251, 218, 60) 100%)
    }
    :hover div {
    transform: scale(0.9);
    }
    & div {
    transition: transform 0.2s ease 0s;
    }
    @media (max-width: 768px) {
      width: 100%;
    }
`;
// export const Button = styled(Btn)`
// `;
