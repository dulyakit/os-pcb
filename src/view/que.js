/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import { Card } from 'antd';
import { Table } from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux'

function Que(props) {
  const dispatch = useDispatch()

  const processList = props?.processList
  const clock = props?.clock
  const starvationTime = useSelector((state) => state.starvationTime)

  const setProcessList = ((any) => dispatch({ type: 'set', processList: any, }))

  const [queProcess, setQueProcess] = useState([])

  useEffect(() => {
    const time = starvationTime * 1000
    const i = setInterval(starvation, time);
    return () => clearInterval(i);
  }, [processList])

  const starvation = () => {
    let temp = processList
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].id && parseInt(temp[i].waittingTime) > starvationTime && parseInt(temp[i].executeTime) === 0 && parseInt(temp[i].priority) !== 0) {
        temp[i].priority = temp[i].priority - 1
      }
    }
    setProcessList(temp)
  }

  // หาก clock มีการเปลี่ยนแปลง จะนำ process ที่มีสถานะเป็น Ready มาจัดเรียงใหม่เพื่อนำไปแสดงผล
  useEffect(() => {
    let temp = []
    processList.map((items) => {
      if (items.statusProcess === 'Ready') {
        temp.push(items)
      }
    })

    setQueProcess(temp.sort(function (a, b) { return a.priority - b.priority }))  // เรียง Que ตาม priority
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