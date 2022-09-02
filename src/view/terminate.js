import React from 'react'
import { Card } from 'antd';
import { Table } from 'reactstrap';
import { useSelector } from 'react-redux'
import Que from './que';

const Terminate = () => {
  const terminateList = useSelector((state) => state.processTerminateList)
  return (
    <div >
      <div className="col-md-12">
        <Card>
          <div className="row">
            <div className="col-md-9 mb-3">
              <Card type="inner" title={
                <div className='row'>
                  <span style={{ fontSize: '18px' }}>Terminate</span>
                </div>
              }
                style={{ height: '300px', overflow: 'scroll', overflowX: 'scroll' }}>
                <Table hover>
                  <thead align="left">
                    <tr>
                      <th style={{ width: '15%' }}>Process Name</th>
                      <th style={{ width: '10%' }}>Arrival Time</th>
                      <th style={{ width: '10%' }}>Priority</th>
                      <th style={{ width: '10%' }}>Execute Time</th>
                      <th style={{ width: '10%' }}>Waitting Time</th>
                      <th style={{ width: '13%' }}>Turn around Time</th>
                      <th style={{ width: '13%' }}>Status Process</th>
                    </tr>
                  </thead>
                  <tbody align="left">
                    {terminateList.map((items, idx) => (
                      <tr key={idx}>
                        <td>{items.name}</td>
                        <td>{items.arrivalTime}</td>
                        <td>{items.priority}</td>
                        <td>{items.excute}</td>
                        <td>{items.wait}</td>
                        <td>{items.turnAroundTime}</td>
                        <td style={{ backgroundColor: 'pink' }}>Terminate</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </div>
            <div className="col-md-3">

              {/* Que Component  */}
              <Que />
              {/* Que Component  */}

            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Terminate