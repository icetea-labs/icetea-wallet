import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  margin-top: 20px;
  position: relative;
  & .label {
    font-size: 16px;
    position: absolute;
    transform: translateY(0px);
    z-index: 100;
    color: rgb(132, 142, 156);
    transition: all 0.2s ease 0s;
  }
  & .label-value {
    transform: translateY(-20px);
    color: rgb(72, 81, 93);
    font-size: 12px;
  }
  & .inputWrap {
    position: relative;
    z-index: 300;
  }
  & input {
    width: 100%;
    height: 100%;
    font-size: 14px;
    caret-color: rgb(21, 181, 221);
    color: rgb(72, 81, 93);
    border-style: none none solid;
    outline: none;
    border-bottom: 1px solid rgba(234, 236, 239, 0.5);
    padding: 0px 0px 10px;
    background: inherit;
  }
  & input:focus {
    border-color: rgb(21, 181, 221);
  }
`;
const DivRulePassword = styled.div`
  margin-top: 5px;
  background: rgb(251, 251, 251);
  padding: 10px;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(234, 236, 239, 0.5);
  border-image: initial;
  & ul {
    color: rgb(38, 49, 71);
    display: flex;
    justify-content: flex-start;
    padding-left: 15px;
  }
  & ul li:first-child {
    margin-right: 60px;
  }
  & ul li {
    position: relative;
    font-size: 12px;
    white-space: nowrap;
  }
  & .invalid {
    color: rgb(242, 48, 81);
  }
  & ul li.invalid::before {
    background: rgb(242, 48, 81);
  }
  & ul li.pass::before {
    background: rgb(0, 192, 135);
  }
  & ul li::before {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    top: 5px;
    left: -15px;
    border-radius: 50%;
    background: rgb(132, 142, 156);
  }
  @media (max-width: 623px) and (min-width: 320px) {
    & ul {
      flex-direction: column;
    }
  }
`;

export class InputPassword extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      agree: false,
      password: '',
    };
    // props.onChange("", false);
  };
  
  static propTypes = {
    onChange: PropTypes.func,
    withRules: PropTypes.bool,
  };

  static defaultProps = {
    onChange: function() {},
    withRules: false,
  };

  _passwordChange = (e) => {
    var value = e.currentTarget.value.trim();
    var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#])"); //[!@#\$%\^&\*]
    var classRule1 = value ? value.length >= 8 ? 'pass' : 'invalid' : 'empty';
    var classRule2 = value ? regex.test(value) ? 'pass' : 'invalid' : 'empty';
    this.setState({
      password: value
    },() => this.props.onChange(value, "pass" === classRule1 && "pass" === classRule2));
  };

  render() {
    var { password } = this.state;
    var { withRules } = this.props;
    var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#])"); //[!@#\$%\^&\*]
    var classRule1 = password ? password.length >= 8 ? 'pass' : 'invalid' : 'empty';
    var classRule2 = password ? regex.test(password) ? 'pass' : 'invalid' : 'empty';

    return (
      <Container>
        <p className={password ? 'label label-value': 'label'}>Set a New Password</p>
        <div className="inputWrap">
          <input type="password" name="password" autoFocus={false} autoComplete="off" value={ password } onChange={this._passwordChange} />
        </div>
        {
          withRules &&
          <DivRulePassword>
            <div className="text">Your password must include the following properties: </div>
            <ul>
              <li className={ classRule1 }>8 or more characters</li>
              <li className={ classRule2 }>An upper-case letter, symbol and a number</li>
            </ul>
          </DivRulePassword>
        }
      </Container>
  );
  }
}