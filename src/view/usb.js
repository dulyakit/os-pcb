/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { Card } from 'antd';
import { Table } from 'reactstrap';

import { useDispatch, useSelector } from 'react-redux'

const Usb = () => {
  const dispatch = useDispatch()

  const clock = useSelector((state) => state.clock)
  const processList = useSelector((state) => state.processList)

  const setProcessRunning = ((any) => dispatch({ type: 'set', processRunning: any, }))

  const [usbQue, setUsbQue] = useState()

  const addUsb = () => {
    let tempList = processList
    for (let i = 0; i < processList.length; i++) {
      if (processList[i].id) {

        // นำ process ที่ใช้งานอยู่ในปัจจุบันมาใช้งาน usb 
        if (tempList[i].statusProcess === "Running") {
          tempList[i].usb.arrivalTime = clock
          tempList[i].usb.active = true
          tempList[i].usb.statusUsb = "Waiting"
          setProcessRunning(null) // กำหนดให้ ProcessRunning เป็น null เพื่อให้ PCB ไปหา process running ใหม่
        }
      }
    }
  }

  const ejectUsb = () => {
    let tempList = processList
    for (let i = 0; i < processList.length; i++) {
      if (processList[i].id) {

        // กำหนดให้ statusUsb ที่เป็น running ถูกถอดออก โดยให้ usb.active เป็น false
        if (tempList[i].usb?.statusUsb === "Running") {
          tempList[i].usb.active = false
        }
      }
    }
  }

  const sortUsb = () => {
    let temp = []

    // นำ process ที่ถูก usb ดึงไปใช้งานมาจัดอยู่ใน array ใหม่
    for (let i = 0; i < processList.length; i++) {
      if (processList[i].usb?.active === true) {
        temp.push({
          name: processList[i].name,
          ...processList[i].usb
        })
      }
    }

    // นำ array ที่ได้มาจัดเรียงตาม arrivalTime(usb.arrivalTime) จากน้อยไปมาก
    setUsbQue(temp.sort(function(a, b){return a.arrivalTime - b.arrivalTime}))
  }

  // หาก clock มีการเปลี่ยนแปลง จะเรียกใช้ sortUsb เพื่อจัดเรียงคิวตาม arrivalTime ของ usb
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
      style={{ height: '335px', overflow: 'scroll', overflowX: 'scroll' }}>
      <Table align="left" hover >
        <thead align="left">
          <tr>
            <th>Process Name</th>
            <th>Running Time</th>
            <th>Respond Time</th>
            <th>Status Process</th>
          </tr>
        </thead>
        <tbody align="left">
          {usbQue?.map((items, idx) => {
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