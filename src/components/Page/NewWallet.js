import React from "react"
import { connect } from 'react-redux';
import * as actions from '../../actions'
import NewWallet01 from './NewWallet01'
import NewWallet02 from './NewWallet02'
import NewWallet03 from './NewWallet03'

class NewWallet extends React.Component {
  constructor (props) {
    super(props);
    this.props.onChangeForm('01');
    this.selectDisplayForm = this.selectDisplayForm.bind(this);
  }

  selectDisplayForm() {
    if(!this.props.formNo || this.props.formNo === '01') {
      return <NewWallet01/>;
    } else if(this.props.formNo === '02') {
      return <NewWallet02/>;
    } else if(this.props.formNo === '03') {
      return <NewWallet03/>;
    }
  }
  

  render() {
    var {formNo} = this.props;
    console.log(formNo); 
    return (
        <div className="wallet" >
          <div className="logo" >
            <img src="https://trada.tech/assets/img/logo.svg"/>  
          </div>
          <div className="box1" >
            { this.selectDisplayForm() }
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    formNo: state.formNo
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