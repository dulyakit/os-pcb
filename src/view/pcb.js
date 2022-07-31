import React, { useState, useEffect } from 'react'
import { Card } from 'antd';
import { Table } from 'reactstrap';

const PCB = () => {
  const [clock, setClock] = useState(0)
  const [processList, setProcessList] = useState([])
  const [process, setProcess] = useState({})
  const [processCurrent, setProcessCurrent] = useState([])

  const addProcess = () => {
    setProcess({
      id: processList.length,
      name: `P ${processList.length}`,
      arrivalTime: clock,
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
                    <button className='btn btn-danger btn-sm' style={{ marginRight: '5px' }}>Terminate</button>
                  </div>
                </div>
              }
                style={{ height: '500px', overflow: 'scroll', overflowX: 'hidden' }}>
                <Table hover>
                  <thead align="left">
                    <tr>
                      <th>Process Name</th>
                      <th>Arrival Time</th>
                      <th>Execute Time</th>
                      <th>Waitting Time</th>
                      <th>Status Process</th>
                    </tr>
                  </thead>
                  <tbody align="left">
                    {processList?.map((items, idx) => {
                      if (items.id != undefined) {
                        return (<tr key={idx}>
                          <td>{items.name}</td>
                          <td>{items.arrivalTime}</td>
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
                      <th scope="row">
                        1
                      </th>
                      <td>
                        Mark
                      </td>
                      <td>
                        Otto
                      </td>
                      <td>
                        @mdo
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        2
                      </th>
                      <td>
                        Jacob
                      </td>
                      <td>
                        Thornton
                      </td>
                      <td>
                        @fat
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        3
                      </th>
                      <td>
                        Larry
                      </td>
                      <td>
                        the Bird
                      </td>
                      <td>
                        @twitter
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        3
                      </th>
                      <td>
                        Larry
                      </td>
                      <td>
                        the Bird
                      </td>
                      <td>
                        @twitter
                      </td>
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