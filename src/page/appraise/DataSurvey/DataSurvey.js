import React, { Component } from 'react';
import './DataSurvey.css'
import { Table,Form} from 'antd';
const columns = [
    {
      title: 'Full Name',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      // fixed: 'left',
    },
    {
      title: 'Age',
      width: 100,
      dataIndex: 'age',
      key: 'age',
      // fixed: 'left',
    },
    { title: 'Column 1', dataIndex: 'address', key: '1' },
    { title: 'Column 2', dataIndex: 'address', key: '2' },
    { title: 'Column 3', dataIndex: 'address', key: '3' },
    { title: 'Column 4', dataIndex: 'address', key: '4' },
    { title: 'Column 6', dataIndex: 'address', key: '5' },
    { title: 'Column 7', dataIndex: 'address', key: '6' },
    { title: 'Column 8', dataIndex: 'address', key: '7' },
  
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: () => <a className="DataSurvey-a">查看</a>,
    },
  ];
  
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 40,
      address: 'London Park',
    },
    {
      key: '3',
      name: 'Jim Green',
      age: 40,
      address: 'London Park',
    },
    {
      key: '4',
      name: 'Jim Green',
      age: 40,
      address: 'London Park',
    },
    {
      key: '5',
      name: 'Jim Green',
      age: 40,
      address: 'London Park',
    }
    
  ];
  
class DataSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <div>
            <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
            </div>
        );
    }
}
 
export default DataSurvey;