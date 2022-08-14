import React from 'react'
import { Card } from 'antd';
import { Table } from 'reactstrap';

function Usb() {
  return (
    <Card
      className='mt-3'
      type="inner"
      title={
        <div className='row'>
          <span style={{ fontSize: '18px' }}>USB Device</span>
          <div className="col-md-12" align="right">
            <button className='btn btn-success btn-sm'>Add</button>
            {' '}
            <button className='btn btn-danger btn-sm' style={{ marginRight: '5px' }}>Close</button>
          </div>
        </div>
      }
      style={{ height: '270px', overflow: 'scroll', overflowX: 'hidden' }}>
      <Table align="left" hover>
        <thead>
          <tr>
            <th>Process Name</th>
            <th>Running Time</th>
            <th>Respond Time</th>
            <th>Status Process</th>
          </tr>
        </thead>
        <tbody align="left">
          <tr>
            <td>Process2</td>
            <td>10</td>
            <td>0</td>
            <td style={{ backgroundColor: 'green' }}>Running</td>
          </tr>
          <tr>
            <td>Process3</td>
            <td>0</td>
            <td>15</td>
            <td style={{ backgroundColor: 'orange' }}>Waitting</td>
          </tr>
          <tr>
            <td>Process4</td>
            <td>0</td>
            <td>20</td>
            <td style={{ backgroundColor: 'orange' }}>Waitting</td>
          </tr>
        </tbody>
      </Table>
    </Card>
  )
}

export default Usb