import React from 'react';
import styled from 'styled-components';
import { DivSelectWordBase } from '../../elements/utils';
import { zIndex } from '../../../constants/styles';
import { Button } from './../../elements';

export const Wrapper = styled.div`
  background: #fdfdfd;
  display: flex;
  justify-content: center;
`;
export const Title = styled.div`
  color: #212833;
  font-size: 20px;
  background: #fff;
  height: 40px;
  line-height: 40px;
`;
export const WrapperHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  box-shadow: 0px 1px 20px 0px rgba(90, 102, 124, 0.08);
  height: 40px;
  padding: 0 5px 0 15px;
`;
export const WrapperCalender = styled(DivSelectWordBase)`
  position: relative;
  .react-calendar {
    background: ${props => props.theme.dropdownBg};
    box-shadow: ${props => props.theme.boxShadow};
    border: none;
  }
  .react-calendar__tile {
    color: ${props => props.theme.calendarButtonEnable};
    &:hover {
      border-radius: 3px;
    }
  }
  .react-calendar__navigation {
    height: 3em;
    button {
      min-width: 14%;
      color: #848e9c;
    }
  }
  .react-calendar__navigation button[disabled],
  .react-calendar__month-view button.react-calendar__tile:disabled {
    background-color: ${props => props.theme.dropdownBg};
    color: ${props => props.theme.calendarButtonDisable};
  }
  .react-calendar__month-view__days__day--weekend {
    color: ${props => props.theme.tradingViewStyle.short};
  }
  .react-calendar__tile--active {
    background: ${props => props.theme.dropdownBg};
    border-radius: 3px;
    color: ${props => props.theme.highlight};
  }
  .react-calendar__navigation button:enabled:focus,
  .react-calendar__tile:enabled:focus {
    background-color: ${props => props.theme.dropdownBg};
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__navigation button:enabled:hover {
    background: rgba(240, 185, 11, 0.3);
    color: rgba(240, 185, 11);
  }
`;
export const OutBoxCalender = styled(DivSelectWordBase)`
  background-color: ${props => props.theme.boxaltheadbg};
  display: ${props => (props.calendarOpen ? 'flex' : 'none')};
  left: 0px;
  bottom: 2.2em;
  position: absolute;
  z-index: ${zIndex.calendar};
  width: 200%;
`;
export const Suspense = styled.div``;
export const CalendarSuper = styled.div``;
export const BtnFoolter = styled(DivSelectWordBase)`
  padding: 0.5em;
  background: ${props => props.theme.bg1};
  box-shadow: ${props => props.theme.boxShadow};
`;
export const WrapperBtn = styled.div`
  color: ${props => (props.selected ? '#F0B90B' : '#848E9C')};
  cursor: pointer;
  margin: ${props => props.margin || '0 2px'};
  outline: 0;
  height: 22px;
  line-height: 22px;
  font-size: 12px;
  background: ${props => props.theme.inputBgColor};
  padding: 0 5px;
  border-radius: 3px;
  &:hover {
    color: #f0b90b;
  }
`;
export const ToggleCalendar = styled.input`
  width: 9em;
  padding-left: 0.5em;
  height: 22px;
  background-color: ${props => props.theme.inputBgColor};
  border: none;
  margin: 0 0.5em;
  outline: none;
  color: ${props => props.theme.inputColor};
`;
export const WrapperIcon = styled.div`
  position: absolute;
  right: 5px;
  bottom: -3px;
  display: none;
  z-index: ${zIndex.zeroIndex};
  img {
    width: 20px;
  }
`;
export const WrapperTextFullHistory = styled.div`
  color: #212833;
  font-size: 12px;
  a {
    color: #f0b90b;
    margin-left: 3px;
  }
`;
export const Content = styled.div`
  width: 1200px;
  min-width: 960px;
  @media (min-width: 320px) and (max-width: 623px) {
    display: none;
  }
`;
export const ColorGray = styled.div`
  color: #848e9c;
`;
export const StyledText = styled.div`
  color: #212833;
  position: relative;
  display: flex;
  align-items: center;
`;
export const IconInOut = styled.i`
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  top: 17px;
  left: -10px;
  background: ${props => props.color};
`;
export const TypeTranfer = styled.div`
  color: ${props => (props.type === 'IN' ? '#00c087' : '#ea0070')};
  background: ${props =>
    props.type === 'IN' ? 'rgba(0, 192, 135, 0.1)' : 'rgba(234, 0, 112, 0.1)'};
  position: absolute;
  left: 85px;
  top: 8px;
  height: 24px;
  line-height: 25px;
  text-align: center;
  text-indent: 0;
  width: 40px;
`;
export const TypeOrder = styled.div`
  color: ${props => (props.type === 'BUY' ? '#00c087' : '#ea0070')};
  background: ${props =>
    props.type === 'BUY' ? 'rgba(0, 192, 135, 0.1)' : 'rgba(234, 0, 112, 0.1)'};
  height: 24px;
  line-height: 25px;
  text-align: center;
  text-indent: 0;
  width: 40px;
  position: absolute;
  left: 85px;
  top: 8px;
`;
export const ButtonSeach = styled(Button)`
  width: auto;
  background: #fff;
  color: #212833;
  padding: 0 10px;
  height: 24px;
  line-height: 23px;
  border: 1px solid #848e9c;
  box-sizing: border-box;
  font-size: 13px;
  margin-right: 10px;
  &:hover {
    border-color: #f0b90b;
    color: #f0b90b;
  }
`;
