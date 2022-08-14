/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import { Card } from 'antd';
import { Table } from 'reactstrap';

import { useDispatch, useSelector } from 'react-redux'

function Que() {
  const processList = useSelector((state) => state.processList)
  const clock = useSelector((state) => state.clock)
  const [queProcess, setQueProcess] = useState([])

  useEffect(() => {
    let temp = []
    processList.map((items) => {
      if (items.statusProcess === 'Ready') {
        temp.push(items)
      }
    })

    setTimeout(() => {
      setQueProcess(temp)
    }, 1000);
  }, [clock])

  return (
    <Card
      type="inner"
      title={<span style={{ fontSize: '18px' }}>Ready Que</span>}
      style={{ height: '300px', overflow: 'scroll', overflowX: 'hidden' }}>
      <Table align="left" hover>
        <thead>
          <tr align='left'>
            <th >
              Process Name
            </th>
            <th>
              Arrival Time
            </th>
          </tr>
        </thead>
        <tbody align="left">
          {queProcess?.map((items, idx) => (
            <tr key={idx}>
              <td>
                {items.name}
              </td>
              <td>
                {items.arrivalTime}
              </td>
            </tr>
          ))
          }
        </tbody>
      </Table>
    </Card>
  )
}

export default Que