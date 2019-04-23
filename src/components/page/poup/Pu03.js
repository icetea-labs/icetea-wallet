import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

// render(
//   <React.Fragment>
//     <Thing>Hello world!</Thing>
//     <Thing>How ya doing?</Thing>
//     <Thing className="something">The sun is shining...</Thing>
//     <div>Pretty nice day today.</div>
//     <Thing>Don't you think?</Thing>
//     <div className="something-else">
//       <Thing>Splendid.</Thing>
//     </div>
//   </React.Fragment>
// )

const Button = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
`;

const ReversedButton = props => {
  return (
    <button {...props} children={props.children.split('').reverse()} />
  )
}
const ReversedButton2 = styled(Button)`
`;
const ReversedButton4 = props => {
  return (
    <button {...props} children={props.children.split('').reverse()} />
  )
}

class ReversedButton3 extends Component {

  static defaultProps = {
    // onClick: ()=>onClick()
  }

  static propTypes = {
    onClick: PropTypes.func,
    onChange: PropTypes.func
  }

  render() {
    return (
      // <button 
      // onClick={e => this.props.onClick(e)} 
      // {...this.props} children={this.props.children.split('').reverse()} 
      // />

      <input
        type='text'
        onChange={(e) => this.props.onChange(e)}
        value={this.props.value}
        placeholder={this.props.placeholder}
      />
    )
  }
}
// const Thing = styled.div.attrs({ tabIndex: 0 })`
//   color: blue;
//   &:hover {
//     color: red; // <Thing> when hovered
//   }
//   /* & ~ &{
//     background: tomato; // <Thing> as a sibling of <Thing>, but maybe not directly next to it
//   } */
//   & + div {
//     background: lime; // <Thing> next to <Thing>
//   }
//   /* &.something {
//     background: orange; // <Thing> tagged with an additional CSS class ".something"
//   }
//   .something-else & {
//     border: 1px solid; // <Thing> inside another element labeled ".something-else"
//   } */
// `

const Thing = styled.div`
  color: blue;

  .something {
    border: 1px solid; // an element labeled ".something" inside <Thing>
    display: block;
  }
  & + button {
    color: red;
  }
`

class Pu03 extends Component {
  render() {
    return (
      <Thing>
        <label htmlFor="foo-button" className="something">Mystery button</label>
        <button id="foo-button">What do I do?</button>
    </Thing>

      // <div>
      //   <React.Fragment>
      //     <Thing>Hello world!</Thing>
      //     <Thing>Hello world!</Thing>
      //     <Thing>How ya doing?</Thing>
      //     <Thing>How ya doing?</Thing>

      //     <label>Pretty nice day today.</label>
      //     <Thing>
      //       <div>Pretty nice day today.</div>
      //     </Thing>
      //     <div>Pretty nice day today.</div>
      //     <div>Pretty nice day today.</div>

        //  {/* <Thing className="something">The sun is shining...</Thing>

        //   <div>Pretty nice day today.</div>

        //   <Thing>Don't you think?</Thing>

        //   <Thing>Don't you think?</Thing>

        //   <div className="something-else">
        //     <Thing>Splendid.</Thing>
        //   </div> */}
        // </React.Fragment>
        //{/* <Button>Normal Button</Button>
      //   <Button as={ReversedButton} onClick={() => window.alert('2')}  >Custom Button with Normal Button styles1</Button>
      //   <ReversedButton2 onClick={() => window.alert('2')} >Custom Button with Normal Button styles2</ReversedButton2>
      //   <ReversedButton3> Custom Button with Normal Button styles3</ReversedButton3>
      //   <ReversedButton4> Custom Button with Normal Button styles3</ReversedButton4> */}
      // // </div>
    );
  }
}
export default Pu03;