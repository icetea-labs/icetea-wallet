import React, { PureComponent, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from './../../elements/utils';
import { DivSelectWordBase } from './../../elements/utils';
import {
  WrapperCalender,
  OutBoxCalender,
  WrapperBtn,
  ToggleCalendar,
  WrapperIcon
} from './styled';

const BtnFoolter = styled(DivSelectWordBase)`padding:.5em; background:${({theme}) => theme.bg1}; box-shadow:${({theme}) => theme.boxShadow};`;

const CalendarSuper = React.lazy(() => import('./../Unlock/ByJson.js'));

var C = "2017-07-14";
class GroupCalendar extends PureComponent {
  // static propTyps = {
  //   locale: PropTypes.string,
  //   defaultValue: PropTypes.date,
  //   minDateStr: PropTypes.string,
  //   maxDateStr: PropTypes.string,
  //   callbackFn: PropTypes.func,
  // };

  static defaultProps = {
    locale: "en",
    minDateStr: "",
    defaultValue: "",
    maxDateStr: "",
    callbackFn: function () { }
  };

  constructor(props) {
    super(props);
    this._node = React.createRef();
    this.state = {
      date: new Date(props.defaultValue),
      calendarOpen: !1,
      formatted: ""//g()(a).format("YYYY-MM-DD")
    }
  }
  _setDate = function (e) {
    // var t = e.getFullYear()
    //   , r = Object(y.e)(e.getMonth() + 1)
    //   , a = Object(y.e)(e.getDate())
    //   , o = n.props.callbackFn;
    // n.setState({
    //     date: e,
    //     formatted: "".concat(t, "-").concat(r, "-").concat(a)
    // }, function() {
    //     o(e)
    // })
  }
  _clear = () => {
    this.setState({
      date: new Date,
      calendarOpen: !1,
      formatted: ""
    })
  }
  _confirm = () => {
    this._setDate(this.state.date);
    this.setState({
      calendarOpen: !1
    })
  }
  _toggleCalendar = () => {
    this.setState({
      calendarOpen: !this.state.calendarOpen
    })
  }
  _onClickedOutside = (e) => {
    this.state.calendarOpen && this._node && (this._node.current && this._node.current.contains(e.target) || this.setState({
      calendarOpen: !1
    }))
  }
  _handleMinDate = () => {
    var e = this.props.minDateStr;
    return e && "" !== e ? new Date(e) : new Date(C)
  }

  _handleMaxDate = () => {
    var e = this.props.maxDateStr;
    return e && "" !== e && new Date(e) <= new Date ? new Date(e) : new Date
  }

  componentDidMount() {
    window.addEventListener("mousedown", this._onClickedOutside);
    window.addEventListener("touchstart", this._onClickedOutside);
  }
  componentDidUpdate(e) {
    if (e.defaultValue !== this.props.defaultValue) {
      var defaultValue = this.props.defaultValue;
      if (!defaultValue)
        return void this.setState({
          date: new Date,
          calendarOpen: false,
          formatted: ""
        });
      // var n = defaultValue.getFullYear()
      //   , r = Object(y.e)(defaultValue.getMonth() + 1)
      //   , a = Object(y.e)(defaultValue.getDate());
      // this.setState({
      //   date: defaultValue,
      //   formatted: "".concat(n, "-").concat(r, "-").concat(a)
      // })
    }
  }
  componentWillUnmount() {
    window.removeEventListener("mousedown", this._onClickedOutside);
    window.removeEventListener("touchstart", this._onClickedOutside);
  }
  componentDidUpdate() {
    //   if (e.defaultValue !== this.props.defaultValue) {
    //     var t = this.props.defaultValue;
    //     if (!t)
    //         return void this.setState({
    //             date: new Date,
    //             calendarOpen: !1,
    //             formatted: ""
    //         });
    //     var n = t.getFullYear()
    //       , r = Object(y.e)(t.getMonth() + 1)
    //       , a = Object(y.e)(t.getDate());
    //     this.setState({
    //         date: t,
    //         formatted: "".concat(n, "-").concat(r, "-").concat(a)
    //     })
    // }
  }
  componentWillUnmount() {
    window.removeEventListener("mousedown", this._onClickedOutside);
    window.removeEventListener("touchstart", this._onClickedOutside);
  }ß
  _resetDateInput = () => {
    this.setState({
      formatted: ""
    })
  }

  render() {
    var {date, calendarOpen, formatted } = this.state;
    return (
      <WrapperCalender ref={this._node}>
        <OutBoxCalender
          calendarOpen={calendarOpen}
          className="calendarOuter"
        >
          <Suspense fallback="">
            <CalendarSuper
               onChange={this._setDate}
               value={date}
               locale="en"
               onClickDay={this._confirm}
               minDate={this._handleMinDate()}
               maxDate={this._handleMaxDate()}
            >
            </CalendarSuper>
          </Suspense>
          <BtnFoolter
            basis="100%"
            justify="flex-end"
          >
            <WrapperBtn onClick={this._clear}>Clear</WrapperBtn>
            <WrapperBtn onClick={() => this._setDate(new Date)}>Today</WrapperBtn>
            <WrapperBtn onClick={this._confirm}>Ok</WrapperBtn>
          </BtnFoolter>
          <ToggleCalendar
            onFocus={this._toggleCalendar}
            type="text"
          // value={formatted}
          />
          <WrapperIcon>
            <Icon type="calendar" color="#5A667C" />
          </WrapperIcon>
        </OutBoxCalender>
      </WrapperCalender>
    );
  }
}

export default GroupCalendar;