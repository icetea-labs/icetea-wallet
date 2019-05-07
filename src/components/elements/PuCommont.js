import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import { PuLayout } from './PuLayout';
import { zIndex } from './../../constants';
import {
  PuContainer,
  PuHeader,
  PuContent,
  PuFooterBtn,
  PuBtnCancel,
  PuBtnNext,
  DivBtnClose
 } from './utils';

const Wrapper2 = styled.div`
  color:${ props => props.theme.fontColor || "black" };
  min-width:320px;
  padding:30px;
  box-sizing:border-box;
  background:${ props => props.theme.popupBg || "#fff" };
  box-shadow:${ props => props.theme.boxShadow};
  position:fixed;
  top:20%;
  left:50%;
  transform:translate(-50%,-50%);
`;


export class PuCommont extends PureComponent {
  render() {
    var { closeText, title, close, children, 
      closeAlign, next, cancelButton, hideButton, bgColor 
    } = this.props
    
    return (
      // <PuLayout>
        <PuContainer key={'1'} >
        <div>
          <Wrapper2 key={'1'} bgColor={ bgColor }  >
            <PuHeader>{title}</PuHeader>
            <PuContent>{children}</PuContent>
            {
              !hideButton && 
              <PuFooterBtn align ={closeAlign}>
                {
                  cancelButton && close && 
                  <PuBtnCancel onClick={() => close}><span>Cancel</span></PuBtnCancel>
                }
                {
                  (next || close) && 
                  <PuBtnNext onClick={()=> next || close} width={"100px"} ><span>{closeText}</span></PuBtnNext>
                }
              </PuFooterBtn>
            }
            { close ? <DivBtnClose onClick={close}/> : <DivBtnClose onClick={close}/> }
          </Wrapper2>
        </div>
        </PuContainer>
      // </PuLayout>
    );
  }
}

PuCommont.defaultProps = {
    closeText: 'Close',
    cancelButton: false,
    title: "",
    children: null,
    closeAlign: "flex-end",
    bgColor: "",
    close: null,
    next: null,
    hideButton: false
}