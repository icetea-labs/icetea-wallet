import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import GroupCalendar from "./GroupCalendar";
import PuDetailTx from "./../../elements/pu";
import { Table } from './../../elements';
import * as actions from './../../../store/actions/transaction';
// import TxHash from './TxHash';
import {
  Wrapper,
  Content,
  Title,
  WrapperHeader,
  WrapperTextFullHistory,
  ColorGray,
  StyledText,
  IconInOut,
  TypeTranfer,
  TypeOrder
} from './styled';

import {
  TxHash,
  FontDin,
  Icon,
} from './../../elements/utils';

const txType = {
  TRANSFER: "Transfer",
  VOTE: "Vote",
  DEPOSIT: "Deposit",
  DEPLOY: "Deploy",
  CALL: "Call",
}

class index extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      detail: null,
      txs: [],
      offset: 0,
      filterParams: {}
    }
  }

  _getHistory = async(e) => {
    // var t = n.props.dispatch
    //   , r = n.state.filterParams
    //   , a = sessionStorage.getItem("user");
    // if ((a = a && JSON.parse(a) || {}).address) {
    //   var o = Object(i.a)({
    //     address: a.address,
    //     offset: 0,
    //     limit: $
    //   }, r, e);
    //   t(Object(R.c)(o))
    // }
    // var myTxs = await tweb3.getPastEvents('Transferred', 'tea1al54h8fy75h078syz54z6hke6l9x232zyk25cx', 'tx.height > 0', op);
    // var transactions = this.fmtTxs(myTxs.txs);
    // transactions = await this.addTimeToTx(transactions);

  }
  
  _convertText = (e) => {
    switch (e) {
      case "TRANSFER":
        return {
          text: txType[e],
          color: "rgb(0, 192, 135)"
        };
      case "CALL":
        return {
          text: txType[e],
          color: "#848e9c"
        };
      case "DEPLOY":
      default:
        return {
          text: txType[e],
          color: "rgb(74, 144, 226)"
        }
    }
  }

  _buildColumns = () => {
    var { address } = this.props;
    return [{
      title: "TxHash",
      headerAlign: "left",
      sorter: true,
      dataIndex: "txHash",
      key: "TxHash",
      render: (e) => <TxHash hash={e.txHash} />
    }, {
      title: "Date",
      dataIndex: "date",
      headerAlign: "left",
      sorter: true,
      key: "Date",
      render: (e) => <ColorGray><FontDin value={e.date} /></ColorGray> //format("MM-DD h:mm:ss")
    }, {
      title: "exchange.pair",
      dataIndex: "pair",
      key: "Asset",
      render: (e) => <ColorGray>pair</ColorGray>
    }, {
      title: "Type",
      dataIndex: "type",
      key: "Type",
      render: (e) => {
        var typeTx = this._convertText(e.type)
          , type = e.fromAddr === address ? "OUT" : "IN";
        return (
          <StyledText style={{ minWidth: "100px" }}>
            <IconInOut color={typeTx.color} />
            <span>{typeTx.text}</span>
            {"TRANSFER" === e.type && <TypeTranfer type={type}>{type}</TypeTranfer>}
            {("CALL" === e.type || "DEPLOY" === e.type) && <TypeOrder type={e.side.toUpperCase()}>{e.side.toUpperCase()}</TypeOrder>}
          </StyledText>
        )
      }
    }, {
      title: "Value",
      dataIndex: "value",
      key: "Value",
      render: (e) => <StyledText><FontDin value={e.value} /></StyledText> // Object(z.d)(e.value, 4)

    }, {
      title: "TxFee",
      dataIndex: "txFee",
      key: "TxFee",
      render: (e) => <StyledText>{e.txFee}</StyledText>
    }, {
      title: "",
      dataIndex: "op",
      key: "",
      render: (e) => {
        return (
          <div onClick={() => this._showDetail(e)} >
            <Icon type="detail-D" color="#848E9C" hoverColor="#F0B90B" />
          </div>
        )
      }
    }]
  }
  _showDetail = (e) => {
    this.setState({
      detail: e
    })
  }
  _clearDetail = () => {
    this.setState({
      detail: null
    })
  }
  _buildDataSource = () => {
    return this.props.transactionHistory.map(e => {
      var t = e.data //&& JSON.parse(e.data) || {};
      return {
        date: e.timeStamp,
        pair: t.orderData ? t.orderData.symbol : e.txAsset,
        type: e.txType,
        side: t.orderData ? t.orderData.side : "-",
        value: (t.orderData ? t.orderData.quantity : e.value), //Object(z.g)
        txFee: (e.txFee),//Object(z.g)
        txHash: e.txHash,
        op: "",
        blockHeight: e.blockHeight,
        fromAddr: e.fromAddr,
        orderId: e.orderId,
        toAddr: e.toAddr,
        txAge: e.txAge
      }
    })
  }

  _filter = (e) => {
    var filterParams = {};
    var g = ""
    if (e.manualStartDate || e.manualEndDate) {
      e.manualStartDate && (filterParams.startTime = e.manualStartDate.getTime());
      e.manualEndDate && (filterParams.endTime = e.manualEndDate.getTime());
      filterParams.startTime === filterParams.endTime &&
        (filterParams.endTime = new Date("".concat(g()(e.manualEndDate).format("YYYY/MM/DD"), " 23:59:59")).getTime());
      this.setState({
        filterParams: filterParams
      }, () => {
        this._getHistory(filterParams)
      })
    } else {
      alert("exchange.pleaseSelectDate")
    }
  }

  _paging = (e) => {
    var t = (e - 1) * 30//$
      , r = { offset: t };
    this.setState({
      offset: t
    }, () => {
      this._getHistory(r)
    })
  }

  render() {
    var { total, address } = this.props;
    var { detail } = this.state;
    // console.log('a', this._buildColumns());
    // console.log('b', this._buildDataSource());
    return (
      <Wrapper>
        <Content>
          <Title>Transaction History</Title>
          <WrapperHeader>
            <GroupCalendar
              hasType={false}
              hasPair={false}
              onFilterChange={this._filter}
              defaultDate={new Date}
            />
            <WrapperTextFullHistory>
              Not every transaction is included below. For full history, please refer to
            <a href={"".concat("....", "/address/").concat(address)}
                target="_blank"
                rel="noopener noreferrer"
              >here</a>.
          </WrapperTextFullHistory>
          </WrapperHeader>
          <Table
            columns={this._buildColumns()}
            dataSource={this._buildDataSource()}
            paging={this._paging}
            total={total}
          />
          {
            detail && <PuDetailTx detail={detail} close={this._clearDetail} />
          }
        </Content>
      </Wrapper>
    );
  }
}

index.defaultProps = {
  transactionHistory: [
    {
      txType: "TRANSFER",
      timeStamp: '04-26 2:24:39',
      txHash: '79F28716A907D800077E150DDD01F6316F115C7983B8D4D11F67527695D39BEE',
      fromAddr: 'abcd',
      toAddr: 'dsfasdfasdfsdafasdfasdfasdfasdfsdafsadfafas',
      blockHeight: 1000,
      value: '100000',
      txFee: '0.002',
      data: {
        timeStamp: '04-26 2:24:39',
      }
    },
    {
      txType: "TRANSFER",
      timeStamp: '04-26 2:24:39',
      txHash: '79F28716A907D800077E150DDD01F6316F115C7983B8D4D11F67527695D39BEE',
      fromAddr: 'abcde',
      toAddr: 'dsfasdfasdfsdafasdfasdfasdfasdfsdafsadfafas',
      blockHeight: 1000,
      value: '100000',
      txFee: '0.002',
      data: {
        timeStamp: '04-26 2:24:39',
      }
    },
    {
      txType: "CALL",
      timeStamp: '04-26 2:24:39',
      txHash: '79F28716A907D800077E150DDD01F6316F115C7983B8D4D11F67527695D39BEE',
      fromAddr: 'abcde',
      toAddr: 'dsfasdfasdfsdafasdfasdfasdfasdfsdafsadfafas',
      blockHeight: 1000,
      value: '100000',
      txFee: '0.002',
      data: {
        timeStamp: '04-26 2:24:39',
      }
    },
    {
      txType: "DEPLOY",
      timeStamp: '04-26 2:24:39',
      txHash: '79F28716A907D800077E150DDD01F6316F115C7983B8D4D11F67527695D39BEE',
      fromAddr: 'abcde',
      toAddr: 'dsfasdfasdfsdafasdfasdfasdfasdfsdafsadfafas',
      blockHeight: 1000,
      value: '100000',
      txFee: '0.002',
      data: {
        timeStamp: '04-26 2:24:39',
      }
    }
  ],
  total: 0,
  address: "",
  dispatch: function () { },
};

const mapStateToProps = state => {
  var address = state.account.address
    , transactionHistory = state.transaction.transactionHistory;
  return {
    transactionHistory: transactionHistory.tx,
    total: transactionHistory.total,
    address: address
  }
}
export default connect(mapStateToProps, null)(withRouter(index));

// date: e.timeStamp,
// pair: t.orderData ? t.orderData.symbol : e.txAsset,
// type: e.txType,
// side: t.orderData ? t.orderData.side : "-",
// value: (t.orderData ? t.orderData.quantity : e.value), //Object(z.g)
// txFee: (e.txFee),//Object(z.g)
// txHash: e.txHash,
// op: "",
// blockHeight: e.blockHeight,
// fromAddr: e.fromAddr,
// orderId: e.orderId,
// toAddr: e.toAddr,
// txAge: e.txAge