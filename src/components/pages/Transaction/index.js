import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import GroupCalendar from './GroupCalendar'
import PuDetailTx from './../../elements/pu'
import { Table } from './../../elements'
import * as actions from './../../../store/actions/transaction'
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
  TypeOrder,
  ButtonSeach
} from './styled'

import {
  TxHash,
  FontDin,
  Icon
} from './../../elements/utils'

const txType = {
  TRANSFER: 'Transfer',
  VOTE: 'Vote',
  DEPOSIT: 'Deposit',
  DEPLOY: 'Deploy',
  CALL: 'Call'
}

class index extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      detail: null,
      txs: [],
      offset: 0,
      filterParams: {},
      current: 1,
      pageSize: 10
    }
  }

  componentDidMount() {
    this._getHistory()
  }
  componentDidUpdate() {
    // var { txProps } = this.props;
    // var { txState } = this.state.txs
    // 0 === txState.length && txProps.length > 0 && this.setState({
    //   txs: txState.concat(txProps)
    // })
  }
  _getHistory = (e) => {
    // var t = n.props.dispatch
    //   , r = n.state.filterParams
    //   , a = sessionStorage.getItem("user");
    // if ((a = a && JSON.parse(a) || {}).address) {
    //   var o = Object(i.a)({
    //     address: a.address,
    //     offset: 0,
    //     limit: $
    //   }, r, e);
    //   t(Object(R.c)(o)) account.name
    // }

    var params = {
      address: this.props.address,
      conditions: '',
      options: { prove: false, page: 1, per_page: 100 }
    }
    this.props.getTxHistory(params)
  }

  _convertText = (e) => {
    switch (e) {
      case 'TRANSFER':
        return {
          text: txType[e],
          color: 'rgb(0, 192, 135)'
        }
      case 'CALL':
        return {
          text: txType[e],
          color: '#848e9c'
        }
      case 'DEPLOY':
      default:
        return {
          text: txType[e],
          color: 'rgb(74, 144, 226)'
        }
    }
  }

  _buildColumns = () => {
    var { address } = this.props
    return [{
      title: 'TxHash',
      headerAlign: 'left',
      sorter: true,
      dataIndex: 'txHash',
      key: 'TxHash',
      render: (e) => <TxHash hash={e.txHash} />
    }, {
      title: 'Date',
      dataIndex: 'date',
      headerAlign: 'left',
      sorter: true,
      key: 'Date',
      render: (e) => <ColorGray><FontDin value={e.date} /></ColorGray> // format("MM-DD h:mm:ss")
    },
    // {
    //   title: 'exchange.pair',
    //   dataIndex: 'pair',
    //   key: 'Asset',
    //   render: (e) => <ColorGray>pair</ColorGray>
    // }, 
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'Type',
      render: (e) => {
        var typeTx = this._convertText(e.type)

        var type = e.fromAddr === address ? 'OUT' : 'IN'
        return (
          <StyledText style={{ minWidth: '100px' }}>
            <IconInOut color={typeTx.color} />
            <span>{typeTx.text}</span>
            {e.type === 'TRANSFER' && <TypeTranfer type={type}>{type}</TypeTranfer>}
            {(e.type === 'CALL' || e.type === 'DEPLOY') && <TypeOrder type={e.side.toUpperCase()}>{e.side.toUpperCase()}</TypeOrder>}
          </StyledText>
        )
      }
    }, {
      title: 'Value',
      dataIndex: 'value',
      key: 'Value',
      render: (e) => <StyledText><FontDin value={e.value} /></StyledText> // Object(z.d)(e.value, 4)

    }, {
      title: 'TxFee',
      dataIndex: 'txFee',
      key: 'TxFee',
      render: (e) => <StyledText>{e.txFee}</StyledText>
    }, {
      title: '',
      dataIndex: 'op',
      key: '',
      render: (e) => {
        return (
          <div onClick={() => this._showDetail(e)} >
            <Icon type='detail-D' color='#848E9C' hoverColor='#F0B90B' />
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
    var { current, pageSize } = this.state
    var from = (current - 1) * pageSize,
      to = from + pageSize;
    var total = this.props.transactionHistory.length
    var transactionHistory = []
    if (total > 0) {
      if (to > total) to = total
      // console.log('from: ', from,'-to',to)
      transactionHistory = this.props.transactionHistory.slice(from, to);
    }
    // console.log('_buildDataSource',transactionHistory)
    var dataSource = transactionHistory.map(e => {
      var t = e.data || {};//&& JSON.parse(e.data) || {};
      return {
        date: e.time,
        // pair: t.orderData ? t.orderData.symbol : e.txAsset,
        type: e.txType,
        side: t.orderData ? t.orderData.side : '-',
        value: e.value,//(t.orderData ? t.orderData.quantity : e.value), // Object(z.g)
        txFee: e.fee,//(e.fee), // Object(z.g)
        txHash: e.hash,
        op: "",
        blockHeight: e.blockHeight,
        fromAddr: e.from,
        toAddr: e.to || 'to',
      }
    })
    return dataSource;
  }

  _filter = (e) => {
    var filterParams = {}
    var g = ''
    if (e.manualStartDate || e.manualEndDate) {
      e.manualStartDate && (filterParams.startTime = e.manualStartDate.getTime())
      e.manualEndDate && (filterParams.endTime = e.manualEndDate.getTime())
      filterParams.startTime === filterParams.endTime &&
        (filterParams.endTime = new Date(''.concat(g()(e.manualEndDate).format('YYYY/MM/DD'), ' 23:59:59')).getTime())
      this.setState({
        filterParams: filterParams
      }, () => {
        this._getHistory(filterParams)
      })
    } else {
      alert('exchange.pleaseSelectDate')
    }
  }

  _paging = (current, pageSize) => {
    if (pageSize) {
      this.setState({
        current: current,
        pageSize: pageSize
      })
    } else {
      this.setState({
        current: current
      })
    }
  }
  _search = () => {
    this._getHistory()
  }
  render() {
    var { total, address, transactionHistory } = this.props
    var { detail, pageSize, current } = this.state
    // console.log('render props', this.props)
    // console.log('render state', this.state)
    console.log('render transactionHistory', transactionHistory)
    return (
      <Wrapper>
        <Content>
          <Title>Transaction History</Title>
          <WrapperHeader>
            <GroupCalendar
              hasType={false}
              hasPair={false}
              onFilterChange={this._filter}
              defaultDate={new Date()}
            />
            <WrapperTextFullHistory>
              Not every transaction is included below. For full history, please refer to
              <a href={''.concat('....', '/address/').concat(address)}
                target='_blank'
                rel='noopener noreferrer'
              >here</a>.
            </WrapperTextFullHistory>
          </WrapperHeader>
          {
            this.props.isFetching && <div>Loading</div>
          }
          <Table
            columns={this._buildColumns()}
            dataSource={this._buildDataSource()}
            paging={this._paging}
            total={total}
            current={current}
            pageSize={pageSize}
          />
          {
            detail && <PuDetailTx detail={detail} close={this._clearDetail} />
          }
          {/* <ButtonSeach onClick={this._search} ><span>Search</span></ButtonSeach>  */}
        </Content>
      </Wrapper>
    )
  }
}

index.defaultProps = {
  transactionHistory: [],
  total: 0,
  address: '',
  dispatch: function () { }
}

const mapStateToProps = state => {
  var address = state.account.address
  var transactionHistory = state.transaction.transactionHistory
  return {
    transactionHistory: transactionHistory.tx,
    total: transactionHistory.total,
    address: address,
    isFetching: state.transaction.isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTxHistory: (data) => {
      dispatch(actions.getTxHistory(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index))
