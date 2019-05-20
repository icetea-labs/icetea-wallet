import React, { PureComponent, PropTypes } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from 'rc-select';
import PaginationPro from './PaginationPro';
import { Icon } from './utils';

const TableBase = styled.table`
  border-collapse: collapse;
  width: 100%;
  tr {
    padding: 10px 0px;
    border: 1px solid #f0f0f0;
  }
`;
const TheadStyled = styled.thead`background:#f7f7f7;background-size:auto 100%;tr{font-size:14px;color:#666;border:1px solid #f0f0f0;:first-child{border:1px solid #f0f0f0;border-bottom:4px solid #f0f0f0;}}th{background-color:#f7f7f7;padding:0px 0px 0px 10px;height:56px;text-align:center;word-break:break-all;color:#333;font-size:13px;font-weight:600;cursor:pointer;border:none;position:sticky;top:-1px;&:hover{color:#f0b90b;}&:first-child{border-right:1px solid #f0f0f0;padding:0;&:hover{color:#333;}}:last-child{padding-right:10px;}}.showSortMark{i{display:none;}}.sortHd{i{display:inline-block;}}}`;
const TableHead = styled.thead`
  background: #fdfdfd;
  background-size: auto 100%;
  tr {
    font-size: 13px;
    color: #48515d;
    border: none;
    box-shadow: none;
    &:hover {
      box-shadow: none;
    }
  }
  th {
    background-color: #fdfdfd;
    word-break: break-all;
    cursor: pointer;
    color: #848e9c;
    height: 40px;
    text-align: left;
    line-height: 40px;
  }
  th:first-child {
    text-indent: 10px;
  }
  .showSortMark {
    i {
      display: none;
    }
  }
  .sortHd {
    i {
      display: inline-block;
    }
  }
`;
const TbodyStyled = styled.tbody`tr{&:hover{background-color:#fffbf3;}}td{padding:6px 0px 6px 10px;position:relative;text-align:center;word-break:break-all;cursor:pointer;font-size:14px;color:#333;min-height:60px;:first-child{border-right:1px solid #f0f0f0;color:#999;padding:0;width:34px;font-size:12px;}:last-child{padding-right:10px;}}}`;
const TableBody = styled.tbody`
  tr {
    border: 1px solid #fff;
    box-shadow: 0px 1px 20px rgba(90, 102, 124, 0.08);
    border-radius: 3px;
    transition: all 0.2s ease-in;
    td {
      position: relative;
      background-color: #fff;
      word-break: break-all;
      cursor: pointer;
      font-size: 12px;
      color: #212833;
      text-align: left;
      line-height: 40px;
      border: none;
    }
    td:first-child {
      border-left: 1px solid #fff;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      text-indent: 10px;
    }
    td:last-child {
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }
    &:hover {
      box-shadow: 0px 1px 20px rgba(90, 102, 124, 0.2);
    }
  }
`;
const TableTag = styled(TableBase)`
  border-collapse: separate;
  border-color: #fdfdfd;
  border-spacing: 0 5px;
`;
const WrapperPagin = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  .rc-pagination-item-active {
    background-color: #f0b90b;
    border-color: #f0b90b;
  }
  .rc-pagination-item:hover {
    border-color: #f0b90b;
  }
  .rc-pagination-options:hover {
    border-color: #f0b90b;
  }

  .rc-pagination-item:hover a {
    color: #f0b90b;
  }
  .rc-pagination-options-quick-jumper input:hover {
    border-color: #f0b90b;
  }
  .rc-select-enabled .rc-select-selection:hover {
    border-color: #f0b90b;
    box-shadow: 0 0 2px #f0b90b;
  }
  .rc-select-enabled .rc-select-selection:active {
    border-color: #f0b90b;
  }
  .rc-select-focused .rc-select-selection {
    border-color: #f0b90b;
    box-shadow: 0 0 2px #f0b90b;
  }
  .rc-pagination-item-active:hover a {
    color: rgb(255, 255, 255);
  }
  .rc-pagination-item {
    width: 32px;
    height: 32px;
    line-height: 32px;
    font-size: 13px;
    border-width: 1px;
    border-style: solid;
    /* border-color: rgb(132, 142, 156); */
    border-image: initial;
    outline: none;
  }
`;

const WrapperPaginInt = styled.div`
  display: flex;
  font-family: 'DIN';
  .rc-pagination-item {
    width: 32px;
    height: 32px;
    line-height: 32px;
    border: 1px solid #848e9c;
    font-size: 13px;
    outline: none;
  }
  .rc-pagination-prev,
  .rc-pagination-next,
  .rc-pagination-jump-prev,
  .rc-pagination-jump-next {
    cursor: pointer;
    color: #212833;
    font-size: 10px;
    border-radius: 6px;
    list-style: none;
    width: 32px;
    height: 32px;
    line-height: 32px;
    float: left;
    text-align: center;
    outline: none;
  }
  .rc-pagination-item:hover {
    border-color: #f0b90b;
  }
  .rc-pagination-item:hover a {
    color: #f0b90b;
  }
  .rc-pagination-item-active {
    background-color: #f0b90b;
    border-color: #f0b90b;
    &:hover a {
      color: #fff;
    }
  }
  .rc-pagination-jump-prev:hover:after,
  .rc-pagination-jump-next:hover:after {
    color: #f0b90b;
  }
  /* Add */
  .rc-pagination-options-quick-jumper {
    height: 32px;
    line-height: 32px;
  }
  .rc-pagination-options-quick-jumper input {
    height: 32px;
  }
  .rc-pagination-options-quick-jumper input:hover {
    border-color: #f0b90b;
  }
  .rc-pagination-options-quick-jumper button:active,
  .rc-pagination-options-quick-jumper button:focus,
  .rc-pagination-options-quick-jumper button:hover {
    color: #f0b90b;
    background-color: #fff;
    border-color: #f0b90b;
  }
  /* select */
  .rc-select-selection--single .rc-select-selection__rendered {
    height: 32px;
    line-height: 32px;
  }
  .rc-select-selection--multiple
    .rc-select-selection__rendered
    .rc-select-selection__choice {
    margin-top: 4px;
    line-height: 20px;
  }
  .rc-select-selection--single {
    height: 32px;
    line-height: 32px;
  }
`;
const WrapperTable = styled.div`
  position: relative;
`;
const O = styled.span`
  i {
    font-size: 12px;
    margin-left: 4px;
    transform: scale(0.6);
  }
`;
const HeaderLeft = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const HeaderCenter = styled.div`
  display: flex;
  justify-content: center;
`;
const HeaderRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export class Table extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: props.dataSource,
      columns: props.columns,
      sortType: 'sort_desc',
    };
  }

  generateHead = () => {
    var { columns, sortType } = this.state;
    // console.log('generateHead', this.state);
    var header = columns.map((e, r) => {
      if (e.sorter) {
        var className = e.isShowSortMark ? 'sortHd' : 'showSortMark';
        // console.log('generateHead', this._renderHeader(e.headerAlign, e.title, sortType));
        return (
          <th
            key={r}
            data-key={e.dataIndex}
            className={className}
            onClick={this.handleHeadClick}
            style={{ width: e.width }}
          >
            {this._renderHeader(e.headerAlign, e.title, sortType)}
          </th>
        );
      }
      return <th key={r}>{e.title}</th>;
    });
    return <tr>{header}</tr>;
  };

  isDataShow = e => {
    for (var columns = this.state.columns, i = 0; i < columns.length; i++) {
      if (columns[i].dataIndex === e) {
        return true;
      }
    }
    return false;
  };
  generateBody = () => {
    var { columns } = this.state;
    var data = this.props.dataSource;
    return (
      data.map((column, index) => {
        var tmpRow = [];
        Object.keys(column).forEach(el => {
          this.isDataShow(el) && tmpRow.push(column[el]);
        });
        var row = tmpRow.map((value, i) => {
          var item = columns[i];
          return item && item.render ? (
            <td key={i} style={{ width: item.width }}>
              {item.render(column, index)}
            </td>
          ) : (
            <td key={i} style={{ width: item.width }}>
              {value}
            </td>
          );
        });
        return <tr key={index}>{row}</tr>;
      }) || []
    );
  };

  handleHeadClick = e => {
    var dataKey = e.currentTarget.getAttribute('data-key');
    var { sortType } = this.state;

    if (this.props.sort) {
      this.props.sort(dataKey, sortType);
      this.setState({
        sortType: sortType === 'sort_asc' ? 'sort_desc' : 'sort_asc',
      });
    }
  };

  generateTable = () => {
    var headValue = this.generateHead();
    var bodyValue = this.generateBody();
    return (
      <TableTag>
        <TableHead>{headValue}</TableHead>
        <TableBody>{bodyValue}</TableBody>
      </TableTag>
    );
  };
  onShowSizeChange = (current, pageSize) => {
    // console.log(current);
    // console.log(pageSize);
    // this.setState({
    //   pageSize: pageSize,
    //   current: current
    // })
    this.props.paging(current, pageSize);
  };
  onChange = current => {
    // console.log(page);
    // this.setState({
    //   current: page
    // })
    this.props.paging(current);
  };
  componentWillReceiveProps() {
    this.setState({
      data: this.props.dataSource,
      columns: this.props.columns,
    });
  }
  _renderTitle = e => {
    return e.type === 'string' ? <span>{e}</span> : e;
  };
  _renderHeaderDetails = (e, t) => {
    return this._renderTitle(e); // [, <O><Icon type={t}/></O> ]
  };
  _renderHeader = (e, t, n) => {
    return e === 'left' ? (
      <HeaderLeft>{this._renderHeaderDetails(t, n)}</HeaderLeft>
    ) : e === 'center' ? (
      <HeaderCenter>{this._renderHeaderDetails(t, n)}</HeaderCenter>
    ) : (
      <HeaderRight>{this._renderHeaderDetails(t, n)}</HeaderRight>
    );
  };
  render() {
    var { paging, total, dataSource, pageSize, current } = this.props;
    console.log(
      'current: ',
      current,
      ' - pageSize: ',
      pageSize,
      ' - total: ',
      total
    );
    return (
      <div>
        <WrapperTable>{this.generateTable()}</WrapperTable>
        {paging && dataSource.length > 0 && (
          <PaginationPro
            selectComponentClass={Select}
            showQuickJumper
            showSizeChanger
            defaultPageSize={pageSize}
            defaultCurrent={current}
            onShowSizeChange={this.onShowSizeChange}
            onChange={this.onChange}
            total={total}
          />
        )}
      </div>
    );
  }
}
// Table.propTypes = {
//   primaryKey: PropTypes.string,
// };
Table.defaultProps = {
  dataSource: [],
  current: 1,
  paging: null,
  sort: function() {},
  pageObj: {},
  total: 0,
  primaryKey: '',
};
