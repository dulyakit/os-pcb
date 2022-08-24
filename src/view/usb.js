import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { Card } from 'antd';
import { Table } from 'reactstrap';

import { useDispatch, useSelector } from 'react-redux'

const Usb = () => {
  // const dispatch = useDispatch()
  const clock = useSelector((state) => state.clock)
  const processList = useSelector((state) => state.processList)
  // const setProcessList = ((any) => dispatch({ type: 'set', processList: any, }))
  const [useQue, setUsbQue] = useState()

  const sortUsb = () => {
    let temp = []
    for (let i = 0; i < processList.length; i++) {
      if (processList[i].usb?.status === true) {
        temp.push({
          name: processList[i].name,
          ...processList[i].usb
        })
      }
    }

    setUsbQue(_.orderBy(temp, ['arrivalTime'], ['asc']))
  }

  const addUsb = () => {
    let tempList = processList
    for (let i = 0; i < processList.length; i++) {
      if (processList[i].id) {
        if (tempList[i].statusProcess === "Running") {
          tempList[i].usb.arrivalTime = clock
          tempList[i].usb.status = true
          tempList[i].usb.statusUsb = "Waiting"
        }
      }
    }
  }

  const ejectUsb = () => {
    let tempList = processList
    for (let i = 0; i < processList.length; i++) {
      if (processList[i].id) {
        if (tempList[i].usb?.statusUsb === "Running") {
          tempList[i].usb.status = false
        }
      }
    }
  }

  useEffect(() => {
    sortUsb()
  }, [clock])
  return (
    <Card
      className='mt-3'
      type="inner"
      title={
        <div className='row'>
          <span style={{ fontSize: '18px' }}>USB Device</span>
          <div className="col-md-12" align="right">
            <button className='btn btn-success btn-sm' onClick={() => addUsb()}>Add</button>
            {' '}
            <button className='btn btn-danger btn-sm' style={{ marginRight: '5px' }} onClick={() => ejectUsb()}>Close</button>
          </div>
        </div>
      }
      style={{ height: '370px', overflow: 'scroll', overflowX: 'hidden' }}>
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
          {useQue?.map((items, idx) => {
            return (<tr key={idx}>
              <td>{items.name}</td>
              <td>{items.runningTime}</td>
              <td>{items.responseTime}</td>
              {items.statusUsb === 'Waiting' && (<td style={{ backgroundColor: 'orange' }}>Waiting</td>)}
              {items.statusUsb === 'Running' && (<td style={{ backgroundColor: 'green' }}>Running</td>)}
            </tr>)
          })}
        </tbody>
      </Table>
    </Card>
  )
}

export default Usb