/* eslint-disable no-self-assign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Card } from 'antd';
import { Table } from 'reactstrap';

import Usb from './usb';
import Que from './que';

import { getRandomInt, findNumber } from '../plugin'

const PCB = () => {
  const dispatch = useDispatch()
  const clock = useSelector((state) => state.clock)
  const processList = useSelector((state) => state.processList)
  const processLast = useSelector((state) => state.processLast)
  const process = useSelector((state) => state.process)
  const processRunning = useSelector((state) => state.processRunning)
  const processTerminateList = useSelector((state) => state.processTerminateList)

  const setProcess = ((any) => dispatch({ type: 'set', process: any, }))
  const setClock = ((any) => dispatch({ type: 'set', clock: any, }))
  const setProcessList = ((any) => dispatch({ type: 'set', processList: any, }))
  const setProcessLast = ((any) => dispatch({ type: 'set', processLast: any, }))
  const setProcessTerminateList = ((any) => dispatch({ type: 'set', processTerminateList: any, }))
  const setProcessRunning = ((any) => dispatch({ type: 'set', processRunning: any, }))
  const setUsbCurrent = ((any) => dispatch({ type: 'set', usbRunning: any, }))
  const setAverageWaitting = ((any) => dispatch({ type: 'set', averageWaitting: any, }))
  const setAverageTurnaround = ((any) => dispatch({ type: 'set', averageTurnaround: any, }))

  const addProcess = () => {
    setProcess({
      id: processLast,
      name: `Process${processLast}`,
      arrivalTime: clock,
      priority: getRandomInt(0, 9),
      usb: {
        active: false,
        statusUsb: 'Running',
        arrivalTime: 0,
        runningTime: 0,
        responseTime: 0,
      },
      excuteTime: 0,
      waittingTime: 0,
      statusProcess: 'New'
    })

    setProcessLast(processLast + 1) // กำหนด process หมายเลขสุดท้าย + 1
  }

  const terminateProcess = () => {

    // ค้นหา Object ที่มีสถานะเป็น Running และเปลี่ยนสถานะเป็น Terminate แล้วนำมาใส่ใน terminateProcesss
    let terminateProcesss = processList.filter((item) => {
      return item.statusProcess === "Running" && { ...item, statusProcess: "Terminate" }
    });

    // กรอง Object ที่มีสถานะ Running ออกจาก processList
    let filterArr = processList.filter((item) => {
      return item.statusProcess !== "Running" && item
    });
    setProcessList(filterArr);

    // กำหนด turnAroundTime เป็นผลรวมของ excuteTime + waittingTime
    terminateProcesss[0].turnAroundTime = terminateProcesss[0].excuteTime + terminateProcesss[0].waittingTime;

    setProcessRunning(null) // กำหนดให้  process ปัจจุบันเป็น null

    setProcessTerminateList([...processTerminateList, ...terminateProcesss]); // เพิ่ม processTerminate

  };

  useEffect(() => {
    let innervalId = 0;
    setInterval(() => {
      innervalId++;
      setClock(innervalId); // เพิ่มเวลาทีละ 1 ทุกๆ 1 วินาที
    }, 1000);
  }, []);

  const setStatusRunning = (data) => {

    /**
      * ถ้า priority ของ process ตัวปัจจุบันน้อยที่สุด จะเข้าเงื่อนไขนี้ 
      * แต่ถ้าไม่ใช่ จะกำหนดให้ status ของ process ตัวนั้นๆเป็น ready
    */
    if (data.priority === findNumber('P', processList)) {
      let temp = []

      // นำค่า priority ทั้งหมดมาใส่ใน array temp
      processList.forEach(element => {
        temp.push(element.priority)
      })

      // หาตัวเลขที่มีค่าซ้ำกันโดยใช้ Set
      let result = new Set(temp.filter((v, i, a) => a.indexOf(v) !== i))

      /**
       * ถ้าขนาดของ Array.from(result) มากกว่า 0 แสดงว่ามีตัวเลขที่ซ้ำกัน ดังนั้นจึงเข้าเงื่อนไขแรก คือการไปหา arrivalTime ที่น้อยที่สุดของ priority ตัวนั้นๆ
       * ถ้าไม่มีค่าซ้ำกัน ก็จะกำหนดให้ priority ตัวนั้นๆเป็น Running ทันที
       * และในทั้งสองเงื่อนไขจะกำหนด ProcessRunning ให้เป็น id ของ process ตัวนั้นๆ เพื่อนำไปตรวจสอบ non-preemptive และนำไปแสดงผล
      */
      if (Array.from(result).length > 0) {
        if (data.arrivalTime === findNumber('PA', processList, data.priority)) {
          data.statusProcess = "Running"
          setProcessRunning(data.id)
        }
      } else {
        data.statusProcess = "Running"
        setProcessRunning(data.id)
      }

    } else {
      data.statusProcess = "Ready"
    }
  }

  const setStatusUsb = (data) => {

    /** 
     * ถ้า arrivalTime ของ usb ตัวปัจจุบันน้อยที่สุดจะกำหนด statusUsb ของ process นั้นๆให้เป็น Running 
     * ถ้าไม่ จะกำหนด statusUsb ของ process นั้นๆให้เป็น Waiting
    */
    if (data.usb.arrivalTime === findNumber('UA', processList)) {
      setUsbCurrent(data.name) // กำหนดให้ usb ตัวปัจจุบันเป็นชื่อของ process ใช้เพื่อแสดงผลเท่านั้น
      data.usb.statusUsb = "Running"

    } else {
      data.usb.statusUsb = "Waiting"
    }
  }

  const updateDataProcess = async () => {
    let tempList = processList
    for (let i = 0; i < processList.length; i++) {
      if (processList[i].id) {

        if (processList[i].id === processRunning) { // กำหนดสถานะของ process ที่ใช้งานอยู่ให้เป็น Running
          tempList[i].statusProcess = 'Running'
        } else {
          tempList[i].statusProcess = "Ready"
        }

        if (processRunning === null) {  // หากไม่มี process ที่ใช้งานอยู่จะเรียกใช้ฟังก์ชั่น setStatusRunning เพื่อหา process มาใช้งาน
          setStatusRunning(tempList[i])
        }

        if (tempList[i].usb.active === true) {  // กำหนดสถานะเป็น Waiting หาก process ถูก usb ดึงไปใช้งาน
          tempList[i].statusProcess = "Waiting"
        }

        if (tempList[i].statusProcess === "Running") {  // หากสถานะของ process นั้นๆเป็น Running จะนับ excuteTime เพิ่มทีละ 1 ตาม clock
          tempList[i].excuteTime++

        } else if (tempList[i].statusProcess === "Ready") {  // หากสถานะของ process นั้นๆเป็น Ready จะนับ waittingTime เพิ่มทีละ 1 ตาม clock
          tempList[i].waittingTime++

        } else if (tempList[i].usb.active === true) { // หากสถานะของ process ถูก usb ดึงไปใช้งาน จะนับ waittingTime เพิ่มทีละ 1 ตาม clock
          tempList[i].excuteTime = tempList[i].excuteTime
          tempList[i].waittingTime++

          setStatusUsb(tempList[i])

          if (tempList[i].usb.statusUsb === "Running") {
            tempList[i].usb.runningTime++

          } else if (tempList[i].usb.statusUsb === "Waiting") {
            tempList[i].usb.responseTime++
          }

        }
      }
    }

    setProcessList(tempList)  // กำหนดให้ processList เป็บ tempList ที่ถูกปรับปรุงใหม่ในแต่ละรอบ
  }

  useEffect(() => {   // หาก clock มีการเปลี่ยนแปลง จะเรียกใช้ updateDataProcess เพื่อปรับปรุง process
    updateDataProcess()
  }, [clock])

  useEffect(() => {   // หาก process มีการเปลี่ยนแปลง จะทำการเพิ่ม process ใหม่เข้าไปใน processList
    setProcessList([...processList, process])
  }, [process])

  useEffect(() => {   // หาก processTerminateList มีการเปลี่ยนแปลง จะทำการหาค่าเฉลี่ยของ Waitting Time และ Turnaround Time
    let sumWaitting = 0
    let sumTurnaround = 0
    processTerminateList.forEach(element => {
      sumWaitting += element.waittingTime
      sumTurnaround += element.turnAroundTime
    });

    /** หาค่าเฉลี่ยโดยนำผลรวมในแต่ละอันมาหารขนาดของ processTerminateList */
    setAverageWaitting(sumWaitting / processTerminateList.length)
    setAverageTurnaround(sumTurnaround / processTerminateList.length)
  }, [processTerminateList])

  return (
    <div >
      <div className="col-md-12">
        <Card>
          <div className="row">
            <div className="col-md-8 mb-3">
              <Card type="inner" title={
                <div className='row'>
                  <span style={{ fontSize: '18px' }}>PCB</span>
                  <div className="col-md-12" align="right">
                    <button className='btn btn-success btn-sm' onClick={() => addProcess()}>Add Process</button>
                    {' '}
                    <button className='btn btn-danger btn-sm' onClick={() => terminateProcess()}>Terminate</button>
                    {' '}
                    <button className='btn btn-info btn-sm' onClick={() => window.location.reload()} style={{ marginRight: '5px' }}>Reset</button>
                  </div>
                </div>
              }
                style={{ height: '650px', overflow: 'scroll', overflowX: 'scroll' }}>
                <Table hover className='text-nowrap'>
                  <thead align="left">
                    <tr>
                      <th style={{ width: '15%' }}>Process Name</th>
                      <th style={{ width: '13%' }}>Arrival Time</th>
                      <th style={{ width: '13%' }}>Priority</th>
                      <th style={{ width: '13%' }}>Execute Time</th>
                      <th style={{ width: '13%' }}>Waitting Time</th>
                      <th style={{ width: '15%' }}>Status Process</th>
                    </tr>
                  </thead>
                  <tbody align="left">
                    {processList?.map((items, idx) => {
                      if (items.id !== undefined) {
                        return (<tr key={idx}>
                          <td>{items.name}</td>
                          <td>{items.arrivalTime}</td>
                          <td>{items.priority}</td>
                          <td>{items.excuteTime}</td>
                          <td>{items.waittingTime}</td>
                          {items.statusProcess === 'New' && (<td>New</td>)}
                          {items.statusProcess === 'Ready' && (<td style={{ backgroundColor: 'yellow' }}>Ready</td>)}
                          {items.statusProcess === 'Running' && (<td style={{ backgroundColor: 'green' }}>Running</td>)}
                          {items.statusProcess === 'Waiting' && (<td style={{ backgroundColor: 'orange' }}>Waiting</td>)}
                        </tr>)
                      }
                    })}
                  </tbody>
                </Table>
              </Card>

            </div>
            <div className="col-md-4">

              {/* Que Component  */}
              <Que />
              {/* Que Component  */}


              {/* Usb Component  */}
              <Usb />
              {/* Usb Component  */}

            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default PCB