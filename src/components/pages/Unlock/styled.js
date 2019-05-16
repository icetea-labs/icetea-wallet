import styled from 'styled-components'
import { zIndex } from '../../../constants/styles'

export const Wrapper = styled.div`
  position:relative;
  height:100%;
  display:flex;
  padding-bottom:50px;
  justify-content:center;
`
export const Logo = styled.div`
  color:#f0b90b;
  height:80px;
  cursor:pointer;
  position:absolute;
  left:50%;
  transform:translate(-50%,0);
  width:80px;
  top:10px;
  @media (min-width:1900px){
    top:80px;
  }
  img{width:80px;}
`
export const OutBox = styled.div`
  width:830px;
  min-width:750px;
  position:absolute;
  top:130px;
  left:50%;
  transform:translateX(-50%);
  @media (min-width:1900px){top:190px;}
  @media (max-width:768px){width:100%;min-width:auto;}
`
export const InBox = styled.div`
  background:#fff;
  box-shadow:0 0 10px #e4e4e4;
  padding:40px 60px;
  .ship-text{font-size:12px;margin-bottom:8px;text-align:center;}
  .ship-lock{margin:0 auto;display:flex;justify-content:center;margin-bottom:20px;img{height:30px;}}
  @media (min-width:320px) and (max-width:623px){box-shadow:none;padding:5px 20px;}
`
export const Title = styled.div`
  font-size:24px;
  font-weight:bold;
  margin-top:10px;
  margin-bottom:20px;
  text-align:center;color:#212833;
`
export const Content = styled.div`
  display:flex;
  flex-direction:row;
  @media (min-width:320px) and (max-width:623px){flex-direction:column;}
`
export const WrapperMenu = styled.div`
  margin-bottom:20px;
  margin-right:40px;
  color:#212833;
  @media (min-width:320px) and (max-width:623px){margin-right:0px;}
`
export const SubTitle = styled.div`
  font-size:16px;
  white-space:nowrap;
  font-weight:bold;
`
export const WrapperSelect = styled.div`
  margin-top:20px;
  display:none;
  @media (min-width:320px) and (max-width:623px){display:block;}
`
export const Menu = styled.div`
  display:flex;
  flex-direction:column;
  margin-top:28px;
  padding-right:40px;
  border-right:1px solid rgba(234,236,239);
  li{
    height:40px;
    line-height:40px;
    cursor:pointer;
    width:200px;
    padding-left:20px;
    margin-bottom:20px;
    display:flex;
    align-items:center;
    border-radius:3px;
    border-left:4px solid #fff;
    font-size:15px;
    position:relative;
    box-sizing:border-box;
    color:#263147;
    font-weight:400;
    &:hover{
      background:#fff;
      font-weight:600;
      box-shadow:0px 0px 15px 0px rgba(223,226,231,0.5);
      border-left:4px solid #f0b90b;
      border-top-left-radius:4px;
      border-bottom-left-radius:4px;
    }
    svg{
      width:30px;
      height:28px;
      margin-left:-2px;
    }
    .selected{
      width:12px;
      height:12px;
      display:block;
      border:1px solid rgba(132,142,156,1);
      opacity:0.5;
      border-radius:50%;
      position:absolute;
      background:#fff;
      right:10px;
      &:before{
        content:'';
        position:absolute;
        display:none;
        width:8px;
        height:8px;
        background:#f0b90b;
        border-radius:50%;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
      }
    }
  }
  .on{
    background:#fff;box-shadow:0px 0px 15px 0px rgba(223,226,231,0.5);
    border-left:4px solid #f0b90b;
    border-top-left-radius:4px;
    border-bottom-left-radius:4px;
    font-weight:600;
  }
  li.on .selected {
    display:block;
    border-color:#f0b90b;
    opacity:1;
    &:before{
      display:block;
      }
  }
  @media (min-width:320px) and (max-width:623px){display:none;}
`

export const UnlockRecommend = styled.img`
  width:14px;
  margin-left:6px;
`

// For unlock by Mnemonic
export const MnForm = styled.form`
  width:100%;
  color:#48515D;
  position:relative;
  padding-top:50px;
`
export const WarningText = styled.div`
  font-weight:bold;
  font-size:16px;
  line-height:16px;
  color:#48515D;
  display:flex;
  position:relative;
  span{color:#F23051;}
`
export const WarningTooltip = styled.div`
  margin-left:8px;
  cursor:pointer;
  color:#848E9C;
  img{width:20px;}
  .tips{
    position:absolute;
    left:0;
    width:100%;
    padding:10px;
    color:#848E9C;
    display:none;
    font-size:12px;
    background:#fbfbfb;
    border:1px solid rgba(234,236,239,0.5);
  }
  &:hover .tips{
    display:block;
  }
`
export const MnTitle = styled.div`
  font-size:18px;
  padding:10px 0;
  color:#48515D;
  padding-top:30px;
`
export const MnWrapperTextArea = styled.div`
  font-size:14px;
  margin-bottom:30px;
  p{text-align:left;white-space:nowrap;}
  input{outline:none;border:none;height:30px;width:100%;}
  .mneomnic-sep{color:#848E9C;}
`
export const MnTextArea = styled.textarea`
  height:80px;
  width:95%;
  border:1px solid #f0f0f0;
  outline:none;
  padding:10px;
  resize:none;
`
export const MnPasswordError = styled.div`
  color:#F23051;
  position:absolute;
  left:0;
  right:0;
  font-size:14px;
  display:flex;
  height:20px;
  img{width:15px;margin-right:5px;}
`
export const BaseBtnFoolter = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
  position:absolute;
  left:0;right:0;
  @media (min-width:320px) and (max-width:623px){
    flex-direction:column;margin:20px 0;padding-bottom:40px;
    .create-link{order:1;margin-top:10px;}
    .unlock{order:0;}
  }
`

export const MnBtnFoolter = styled(BaseBtnFoolter)`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
  margin-top:40px;
  position:relative;
`
export const MnLinkCreateNew = styled.div`
  font-size:14px;
  color:#f0b90b;
  cursor:pointer;
`
// For unlock by PrivateKey
export const DropWrapper = styled.div`
  position:relative;
  text-indent:10px;
  border-radius: ${props => props.theme.mode === 'DARK' ? '3px' : '0'};
  font-size:12px;
  color:#848E9C;
  height:22px;
  line-height:22px;
  display:inline-block;
  cursor:pointer;
  background: ${props => props.theme.dropdownBg};
  padding-bottom:5px;
  border-bottom:1px solid ${props => props.theme.borderColor};
  box-sizing:border-box;
  z-index: ${zIndex.dropdown};
  width: ${props => props.width ? props.width : 'inherit'};
`
export const DropItem = styled.i`
  position:absolute;
  right:5px;
  top:50%;
  transform:translate(0,-50%);
  width:0;
  height:0;
  border-left:5px solid transparent;
  border-right:5px solid transparent;
  border-top:5px solid #666;
`
export const DefaultItem = styled.i`
  z-index: ${zIndex.modal}!important;
  .rc-dropdown-menu-item{
    background: ${props => props.theme.dropdownBg};
    &:hover{
      background: ${props => props.theme.dropdownSelectBgColor};
    }
  };
  .rc-dropdown-menu-item-selected{
    background-color:${props => props.theme.dropdownSelectBgColor};
  };
`
