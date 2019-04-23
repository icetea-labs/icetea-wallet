import React from "react"
import { connect } from 'react-redux';
import styled from 'styled-components'
import * as actions from '../../actions'
import NewWallet01 from './NewWallet01'
import NewWallet02 from './NewWallet02'
import NewWallet03 from './NewWallet03'
import NewWallet04 from './NewWallet04'
// Popup
import Pu01 from './poup/Pu01'
import Pu02 from './poup/Pu02'
import Pu03 from './poup/Pu03'

// button
// import { Button } from './../elements'
const DivWallet = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  padding-bottom: 50px;
  justify-content: center;
`;
const DivLogo = styled.div`
  height: 80px;
  cursor: pointer;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0px);
  width: 80px;
  top: 10px;
`;
const DivBox1 = styled.div`
  position: absolute;
  top: 130px;
  left: 50%;
  transform: translateX(-50%);
  @media (max-width: 768px) {
    width: 100%;
  }
`;

class NewWallet extends React.Component {
  constructor(props) {
    super(props);
    this.props.onChangeForm('01');
  }

  selectDisplayForm = () => {
    if (!this.props.formNo || this.props.formNo === '01') {
      return <NewWallet01 />;
    } else if (this.props.formNo === '02') {
      return <NewWallet02 />;
    } else if (this.props.formNo === '03') {
      return <NewWallet03 />;
    } else if (this.props.formNo === '04') {
      return <NewWallet04 />;
    }
  }
  displayPoup = () => {
    if (this.props.puNo === '01') {
      return <Pu01 />;
    } else if (this.props.puNo === '02') {
      return <Pu02 />;
    } else if (this.props.puNo === '03') {
      return <Pu01 />;
    } else if (this.props.puNo === '04') {
      return <Pu01 />;
    } else {
      // return <Pu03 />;
    }
  }
  render() {
    return (
      <div>
        <div>
          <DivWallet>
            <DivLogo>
              <img src="https://trada.tech/assets/img/logo.svg" alt="log" />
            </DivLogo>
            <DivBox1>
              {this.selectDisplayForm()}
            </DivBox1>
          </DivWallet>
        </div>
        {this.displayPoup()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    formNo: state.formNo,
    puNo: state.puNo
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeForm: (formNo) => {
      dispatch(actions.changeForm(formNo))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewWallet);
// export default NewWallet; mapStateToProps