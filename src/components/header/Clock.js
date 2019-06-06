import React, { PureComponent } from 'react';
import styled from 'styled-components';
import dateFormat from 'dateformat';

const Time = styled.div`
  color: #848e9c;
  font-size: 12px;
  height: 18px;
  line-height: 18px;
  font-family: 'DIN';
  @media (max-width: 768px) {
    display: none;
  }
`;

class Clock extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      datetime: dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
    };
  }

  componentDidMount() {
    this.intervalHandler = setInterval(() => {
      this.setState({
        datetime: dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
      });
    }, 1e3);
  }

  componentWillUnmount() {
    clearInterval(this.intervalHandler);
  }

  render() {
    const { datetime } = this.state;
    return <Time>{datetime}</Time>;
  }
}

export default Clock;
