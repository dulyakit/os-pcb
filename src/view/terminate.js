import React, { useState, useEffect } from 'react'
import { Card } from 'antd';
import { Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux'
import Que from './que';

const Terminate = () => {
  const processList = useSelector((state) => state.processList)
  return (
    <div >
      <div className="col-md-12">
        <Card>
          <div className="row">
            <div className="col-md-9">
              <Card type="inner" title={
                <div className='row'>
                  <span style={{ fontSize: '18px' }}>Terminate</span>
                </div>
              }
                style={{ height: '300px', overflow: 'scroll', overflowX: 'hidden' }}>
                <Table hover>
                  <thead align="left">
                    <tr>
                      <th style={{ width: '15%' }}>Process Name</th>
                      <th style={{ width: '10%' }}>Arrival Time</th>
                      <th style={{ width: '10%' }}>Priority</th>
                      <th style={{ width: '10%' }}>Burst Time</th>
                      <th style={{ width: '10%' }}>Execute Time</th>
                      <th style={{ width: '10%' }}>Waitting Time</th>
                      <th style={{ width: '13%' }}>Turn around Time</th>
                      <th style={{ width: '13%' }}>Status Process</th>
                    </tr>
                  </thead>
                  <tbody align="left">
                    <tr>
                      <td>Process1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>6</td>
                      <td>10</td>
                      <td>0</td>
                      <td>10</td>
                      <td style={{backgroundColor: 'pink'}}>Terminate</td>
                    </tr>
                    <tr>
                      <td>Process2</td>
                      <td>2</td>
                      <td>2</td>
                      <td>4</td>
                      <td>10</td>
                      <td>10</td>
                      <td>20</td>
                      <td style={{backgroundColor: 'pink'}}>Terminate</td>
                    </tr>
                  </tbody>
                </Table>
              </Card>

            </div>
            <div className="col-md-3">
              
              {/* Usb Component  */}
              <Que/>
              {/* Usb Component  */}

            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Terminate