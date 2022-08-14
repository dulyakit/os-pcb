/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect } from 'react'
import { Card } from 'antd';
import { Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux'
import Usb from './usb';

const PCB = () => {
  const dispatch = useDispatch()

  const clock = useSelector((state) => state.clock)
  const processList = useSelector((state) => state.processList)
  const process = useSelector((state) => state.process)
  const processCurrent = useSelector((state) => state.processCurrent)

  const setProcess = ((any) => dispatch({ type: 'set', process: any, }))
  const setClock = ((any) => dispatch({ type: 'set', clock: any, }))
  const setProcessList = ((any) => dispatch({ type: 'set', processList: any, }))
  const setProcessCurrent = ((any) => dispatch({ type: 'set', processCurrent: any, }))

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
        runningTime: 0,
        responseTime: 0,
      },
      excute: 0,
      wait: 0,
      statusProcess: 'New'
    })
  }

  useEffect(() => {
    let innervalId = 0;
    setInterval(() => {
      innervalId++;
      setClock(innervalId);
    }, 1000);
  }, []);

  const findNumber = (arr) => {
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

  const setStatusProcess = () => {
    let tempList = processList
    for (let i = 0; i < processList.length; i++) {
      if (processList[i].id) {
        tempList[i].statusProcess = tempList[i].arrivalTime > 0 ? "Ready" : "New"
        if (tempList[i].priority === findNumber(processList)) {
          tempList[i].statusProcess = "Running"
        } else {
          tempList[i].statusProcess = "Ready"
        }
        // tempList[i].statusProcess = tempList[i].priority === findNumber(processList)
        //   ? "Running"
        //   : "Ready"
        if (tempList[i].usb.status === true) {
          tempList[i].statusProcess = "Waiting"
        }
        if (tempList[i].statusProcess === "Running") {
          setProcessCurrent(tempList[i].name)
          tempList[i].excute++
        } else if (tempList[i].statusProcess === "Ready") {
          tempList[i].wait++
        } else if (tempList[i].usb.status === true) {
          tempList[i].excute = tempList[i].excute
          tempList[i].wait++
          tempList[i].usb.runningTime++
          tempList[i].usb.responseTime = tempList[i].usb.responseTime
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
                    <button className='btn btn-danger btn-sm' onClick={()=> processList[2].usb.status = true}>test usb</button>
                    {' '}
                    <button className='btn btn-danger btn-sm' onClick={() => window.location.reload()} style={{ marginRight: '5px' }}>Reset</button>
                  </div>
                </div>
              }
                style={{ height: '500px', overflow: 'scroll', overflowX: 'hidden' }}>
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
                  <div>CPU process : {processCurrent}</div>
                  <div>I/O process :</div>
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