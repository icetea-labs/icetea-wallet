import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from 'rc-select';
import PaginationPro from './PaginationPro';
// import { Icon } from './utils';

const TableBase = styled.table`
  border-collapse: collapse;
  width: 100%;
  tr {
    padding: 10px 0px;
    border: 1px solid #f0f0f0;
  }
`;
// const TheadStyled = styled.thead`background:#f7f7f7;background-size:auto 100%;tr{font-size:14px;color:#666;border:1px solid #f0f0f0;:first-child{border:1px solid #f0f0f0;border-bottom:4px solid #f0f0f0;}}th{background-color:#f7f7f7;padding:0px 0px 0px 10px;height:56px;text-align:center;word-break:break-all;color:#333;font-size:13px;font-weight:600;cursor:pointer;border:none;position:sticky;top:-1px;&:hover{color:#15b5dd;}&:first-child{border-right:1px solid #f0f0f0;padding:0;&:hover{color:#333;}}:last-child{padding-right:10px;}}.showSortMark{i{display:none;}}.sortHd{i{display:inline-block;}}}`;
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
// const TbodyStyled = styled.tbody`tr{&:hover{background-color:#fffbf3;}}td{padding:6px 0px 6px 10px;position:relative;text-align:center;word-break:break-all;cursor:pointer;font-size:14px;color:#333;min-height:60px;:first-child{border-right:1px solid #f0f0f0;color:#999;padding:0;width:34px;font-size:12px;}:last-child{padding-right:10px;}}}`;
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
const WrapperTable = styled.div`
  position: relative;
`;
// const O = styled.span`
//   i {
//     font-size: 12px;
//     margin-left: 4px;
//     transform: scale(0.6);
//   }
// `;
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

class TablePro extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // data: props.dataSource,
      columns: props.columns,
      sortType: 'sort_desc',
    };
  }

  componentWillReceiveProps() {
    const { columns } = this.props;
    this.setState({
      // data: dataSource,
      columns,
    });
  }

  renderTitle = item => {
    return item.type === 'string' ? <span>{item}</span> : item;
  };

  renderHeaderDetails = title => {
    return this.renderTitle(title); // [, <O><Icon type={t}/></O> ]
  };

  renderHeader = (item, title, sortType) => {
    if (item === 'left') {
      return <HeaderLeft>{this.renderHeaderDetails(title, sortType)}</HeaderLeft>;
    }

    if (item === 'center') {
      return <HeaderCenter>{this.renderHeaderDetails(title, sortType)}</HeaderCenter>;
    }

    return <HeaderRight>{this.renderHeaderDetails(title, sortType)}</HeaderRight>;
  };

  generateHead = () => {
    const { columns, sortType } = this.state;
    const header = columns.map(item => {
      if (item.sorter) {
        const className = item.isShowSortMark ? 'sortHd' : 'showSortMark';
        return (
          <th
            key={item.key}
            data-key={item.dataIndex}
            className={className}
            onClick={this.handleHeadClick}
            style={{ width: item.width }}
          >
            {this.renderHeader(item.headerAlign, item.title, sortType)}
          </th>
        );
      }
      return <th key={item.key}>{item.title}</th>;
    });
    return <tr>{header}</tr>;
  };

  isDataShow = item => {
    const { columns } = this.state;
    for (let i = 0; i < columns.length; i += 1) {
      if (columns[i].dataIndex === item) {
        return true;
      }
    }
    return false;
  };

  generateBody = () => {
    const { columns, dataSource } = this.props;
    // let { dataSource } = this.props;
    return (
      dataSource.map((column, index) => {
        const tmpRow = [];
        Object.keys(column).forEach(el => {
          this.isDataShow(el) && tmpRow.push(column[el]);
        });
        const row = tmpRow.map((value, i) => {
          const item = columns[i];
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

  handleHeadClick = item => {
    const dataKey = item.currentTarget.getAttribute('data-key');
    const { sortType } = this.state;
    const { sort } = this.props;
    if (sort) {
      sort(dataKey, sortType);
      this.setState({
        sortType: sortType === 'sort_asc' ? 'sort_desc' : 'sort_asc',
      });
    }
  };

  generateTable = () => {
    const headValue = this.generateHead();
    const bodyValue = this.generateBody();
    return (
      <TableTag>
        <TableHead>{headValue}</TableHead>
        <TableBody>{bodyValue}</TableBody>
      </TableTag>
    );
  };

  onShowSizeChange = (current, pageSize) => {
    const { paging } = this.props;
    paging(current, pageSize);
  };

  onChange = current => {
    const { paging } = this.props;
    paging(current);
  };

  render() {
    const { paging, total, dataSource, pageSize, current, showQuickJumper, showSizeChanger } = this.props;
    return (
      <div>
        <WrapperTable>{this.generateTable()}</WrapperTable>
        {paging && dataSource.length > 0 && (
          <PaginationPro
            selectComponentClass={Select}
            showQuickJumper={!!showQuickJumper}
            showSizeChanger={!!showSizeChanger}
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

TablePro.propTypes = {
  dataSource: PropTypes.array,
  columns: PropTypes.array,
  current: PropTypes.number,
  pageSize: PropTypes.number,
  paging: PropTypes.func,
  sort: PropTypes.func,
  total: PropTypes.number,
  showQuickJumper: PropTypes.bool,
  showSizeChanger: PropTypes.bool,
};

TablePro.defaultProps = {
  dataSource: [],
  columns: [],
  current: 1,
  pageSize: 10,
  paging: null,
  sort() {},
  total: 0,
  showQuickJumper: true,
  showSizeChanger: true,
};
export default TablePro;
