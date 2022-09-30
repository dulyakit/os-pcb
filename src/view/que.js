/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import { Card } from 'antd';
import { Table } from 'reactstrap';

import { useSelector } from 'react-redux'

function Que() {
  const processList = useSelector((state) => state.processList)
  const clock = useSelector((state) => state.clock)

  const [queProcess, setQueProcess] = useState([])

  // หาก clock มีการเปลี่ยนแปลง จะนำ process ที่มีสถานะเป็น Ready มาจัดเรียงใหม่เพื่อนำไปแสดงผล
  useEffect(() => {
    let temp = []
    processList.map((items) => {
      if (items.statusProcess === 'Ready') {
        temp.push(items)
      }
    })

    // หน่วงเวลา 1 วินาทีเพื่อรอการแสดงผลของ process
    setTimeout(() => {
      setQueProcess(temp.sort(function(a, b){return a.priority - b.priority}))  // เรียง Que ตาม priority
    }, 1000)
  }, [clock])

  return (
    <Card
      type="inner"
      title={<span style={{ fontSize: '18px' }}>Ready Que</span>}
      style={{ height: '300px', overflow: 'scroll', overflowX: 'auto' }}>
      <Table align="left" hover className='text-nowrap'>
        <thead>
          <tr align='left'>
            <th >
              Process Name
            </th>
            <th>
              Arrival Time
            </th>
            <th>
              Priority
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
              <td>
                {items.priority}
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