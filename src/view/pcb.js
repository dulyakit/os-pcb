/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import { Card } from 'antd';
import { Table } from 'reactstrap';
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import Usb from './usb';

const PCB = () => {
  const dispatch = useDispatch()
  const clock = useSelector((state) => state.clock)
  const processList = useSelector((state) => state.processList)
  const process = useSelector((state) => state.process)
  const processCurrent = useSelector((state) => state.processCurrent)
  const usbCurrent = useSelector((state) => state.usbCurrent)
  const processTerminateList = useSelector((state) => state.processTerminateList)

  const setProcess = ((any) => dispatch({ type: 'set', process: any, }))
  const setClock = ((any) => dispatch({ type: 'set', clock: any, }))
  const setProcessList = ((any) => dispatch({ type: 'set', processList: any, }))
  const setProcessTerminateList = ((any) => dispatch({ type: 'set', processTerminateList: any, }))
  const setProcessCurrent = ((any) => dispatch({ type: 'set', processCurrent: any, }))
  const setUsbCurrent = ((any) => dispatch({ type: 'set', usbCurrent: any, }))

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const addProcess = () => {
    setProcess({
      id: processList.length,
      name: `Process${processList.length}`,
      arrivalTime: clock,
      priority: getRandomInt(0, 9),
      burstTime: getRandomInt(0, 9),
      usb: {
        status: false,
        statusUsb: 'Running',
        arrivalTime: 0,
        runningTime: 0,
        responseTime: 0,
      },
      excute: 0,
      wait: 0,
      statusProcess: 'New'
    })
  }

  const terminateProcess = () => {
    // ค้นหา Object ที่มีสถานะเป็น Running และเปลี่ยนสถานะเป็น Terminate
    let terminateProcesss = processList.filter((item) => {
      return item.statusProcess === "Running" && { ...item, statusProcess: "Terminate" }
    });

    // กรอง Object ที่มีสถานะ Running ออกจาก processList
    let filterArr = processList.filter((item) => {
      return item.statusProcess !== "Running" && item
    });
    setProcessList(filterArr);

    // นำตัวแปรที่เก็บค่าที่ค้นหามาเปลี่ยน statusProcess เป็น Terminate
    terminateProcesss[0].statusProcess = "Terminate";
    terminateProcesss[0].turnAroundTime = terminateProcesss[0].excute + terminateProcesss[0].wait;
    // console.log("terminateProcesss", terminateProcesss);

    setProcessCurrent(null)
    setProcessTerminateList([...processTerminateList, ...terminateProcesss]);
  };

  useEffect(() => {
    let innervalId = 0;
    setInterval(() => {
      innervalId++;
      setClock(innervalId);
    }, 1000);
  }, []);

  // ค้นหาค่า Arrival Time ที่น้อยที่สุด
  const findNumber = (arr, priority) => {
    let arrs = arr || [];
    let lowest = Number.POSITIVE_INFINITY;
    let highest = Number.NEGATIVE_INFINITY;
    let tmp;
    if (arrs.length > 1) {
      for (let i = arrs.length - 1; i >= 0; i--) {
        if (arrs[i].priority === priority) {
          tmp = arrs[i].arrivalTime;
          if (tmp < lowest && arrs[i].usb.status === false) lowest = tmp;
          if (tmp > highest) highest = tmp;
        }
      }
    }
    return lowest;
  };

  // ค้นหาค่า Priority ที่น้อยที่สุด
  const findNumberByPriority = (arr) => {
    let arrs = arr || [];
    let lowest = Number.POSITIVE_INFINITY;
    let highest = Number.NEGATIVE_INFINITY;
    let tmp;
    if (arrs.length > 1) {
      for (let i = arrs.length - 1; i >= 0; i--) {
        tmp = arrs[i].priority;
        if (tmp < lowest && arrs[i].usb.status === false) lowest = tmp;
        if (tmp > highest) highest = tmp;
      }
    }
    return lowest;
  };

  // ค้นหาค่า Arrival Time จาก USB ที่น้อยที่สุด
  const findNumberByUsb = (arr) => {
    let arrs = arr || [];
    let lowest = Number.POSITIVE_INFINITY;
    let highest = Number.NEGATIVE_INFINITY;
    let tmp;
    if (arrs.length > 1) {
      for (let i = arrs.length - 1; i >= 0; i--) {
        if (arrs[i].usb?.status === true) {
          tmp = arrs[i].usb.arrivalTime;
          if (tmp < lowest) lowest = tmp;
          if (tmp > highest) highest = tmp;
        }
      }
    }
    return lowest;
  };


  const setStatusRunning = (data) => {
    if (data.priority === findNumberByPriority(processList)) {
      let temp = []

      processList.forEach(element => {
        temp.push(element.priority)
      })

      // หาตัวเลขที่มีค่าซ้ำกัน
      let result = new Set(temp.filter((v, i, a) => a.indexOf(v) !== i))

      if (Array.from(result).length > 0) {
        if (data.arrivalTime === findNumber(processList, data.priority)) {
          data.statusProcess = "Running"
        }

      } else {
        data.statusProcess = "Running"
      }

    } else {
      data.statusProcess = "Ready"
    }
  }

  const setStatusUsb = (data) => {
    if (data.usb.arrivalTime === findNumberByUsb(processList)) {
      setUsbCurrent(data.name)
      data.usb.statusUsb = "Running"

    } else {
      data.usb.statusUsb = "Waiting"
    }
  }

  const setStatusProcess = async () => {
    let tempList = processList
    for (let i = 0; i < processList.length; i++) {
      if (processList[i].id) {
        tempList[i].statusProcess = tempList[i].arrivalTime > 0 ? "Ready" : "New"

        if (processList[i].id === processCurrent) {
          tempList[i].statusProcess = 'Running'
        } else {
          tempList[i].statusProcess = "Ready"
        }

        if (processCurrent === null) {
          setStatusRunning(tempList[i])
        }

        if (tempList[i].usb.status === true) {
          tempList[i].statusProcess = "Waiting"
        }

        if (tempList[i].statusProcess === "Running") {
          setProcessCurrent(tempList[i].id)
          tempList[i].excute++

        } else if (tempList[i].statusProcess === "Ready") {
          tempList[i].wait++

        } else if (tempList[i].usb.status === true) {
          tempList[i].excute = tempList[i].excute
          tempList[i].wait++

          setStatusUsb(tempList[i])

          if (tempList[i].usb.statusUsb === "Running") {
            tempList[i].usb.runningTime++
          }

          if (tempList[i].usb.statusUsb === "Waiting") {
            tempList[i].usb.responseTime++
          }

        }
      }
    }
    setProcessList(tempList)
  }

  useEffect(() => {
    setStatusProcess()
  }, [clock])

  useEffect(() => {
    setProcessList([...processList, process])
  }, [process])

  return (
    <div >
      <div className="col-md-12">
        <Card>
          <div className="row">
            <div className="col-md-8">
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
                style={{ height: '600px', overflow: 'scroll', overflowX: 'hidden' }}>
                <Table hover>
                  <thead align="left">
                    <tr>
                      <th style={{ width: '15%' }}>Process Name</th>
                      <th style={{ width: '13%' }}>Arrival Time</th>
                      <th style={{ width: '13%' }}>Priority</th>
                      <th style={{ width: '13%' }}>Burst Time</th>
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
                          <td>{items.burstTime}</td>
                          <td>{items.excute}</td>
                          <td>{items.wait}</td>
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
              <Card
                type="inner"
                title={<span style={{ fontSize: '18px' }}>Controller</span>}
              >
                <div align="left">
                  <div>Clock : {clock}</div>
                  <div>CPU process : {processList.map((e) => (e.id === processCurrent ? e.name : ''))}</div>
                  <div>I/O process : {usbCurrent}</div>
                  <div>AVG Waitting : 45.25</div>
                  <div>AVG Turnaround : 66.75</div>
                </div>
              </Card>

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