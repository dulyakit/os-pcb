import React, { useState, useEffect } from 'react'
import { Card } from 'antd';
import { Table } from 'reactstrap';

const PCB = () => {
  const [clock, setClock] = useState(0)
  const [processList, setProcessList] = useState([])
  const [process, setProcess] = useState({})
  const [processCurrent, setProcessCurrent] = useState([])

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
        tmp = arrs[i].arrivalTime;
        if (tmp < lowest) lowest = tmp;
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
        tempList[i].statusProcess = tempList[i].arrivalTime === findNumber(processList)
          ? "Running"
          : tempList[i].statusProcess
        if (tempList[i].statusProcess === "Running") {
          setProcessCurrent(tempList[i].name)
          tempList[i].excute++
        } else if (tempList[i].statusProcess === "Ready") {
          tempList[i].wait++
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
                    {/* <button className='btn btn-danger btn-sm'>Terminate</button>
                    {' '} */}
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
                      if (items.id != undefined) {
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
                  <div>
                    Clock : {clock}
                  </div>
                  <div>
                    CPU process : {processCurrent}
                  </div>
                  <div>
                    I/O process :
                  </div>
                  <div>
                    AVG Waitting : 45.25
                  </div>
                  <div>
                    AVG Turnaround : 66.75
                  </div>
                </div>

              </Card>
              <Card
                className='mt-3'
                type="inner"
                title={
                  <div className='row'>
                    <span style={{ fontSize: '18px' }}>USB Device</span>
                    <div className="col-md-12" align="right">
                      <button className='btn btn-success btn-sm'>Add</button>
                      {' '}
                      <button className='btn btn-danger btn-sm' style={{ marginRight: '5px' }}>Close</button>
                    </div>
                  </div>
                }
                style={{ height: '270px', overflow: 'scroll', overflowX: 'hidden' }}>
                <Table align="left" hover>
                  <thead>
                    <tr>
                      <th>
                        Process Name
                      </th>
                      <th>
                        Running Time
                      </th>
                      <th>
                        Respond Time
                      </th>
                      <th>
                        Status Process
                      </th>
                    </tr>
                  </thead>
                  <tbody align="left">
                    <tr>
                      <td scope="row">Process2</td>
                      <td>10</td>
                      <td>0</td>
                      <td style={{ backgroundColor: 'green' }}>Running</td>
                    </tr>
                    <tr>
                      <td scope="row">Process3</td>
                      <td>0</td>
                      <td>15</td>
                      <td style={{ backgroundColor: 'orange' }}>Waitting</td>
                    </tr>
                    <tr>
                      <td scope="row">Process4</td>
                      <td>0</td>
                      <td>20</td>
                      <td style={{ backgroundColor: 'orange' }}>Waitting</td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default PCB