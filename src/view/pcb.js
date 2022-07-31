import React from 'react'
import { Card } from 'antd';

const PCB = () => {
  return (
    <div >
      <div className="col-md-12">
        <Card>
          <div className="row">

            <div className="col-md-8">
              <Card type="inner" title="PCB" >
              PCB
              </Card>

            </div>
            <div className="col-md-4">
              <Card
                type="inner"
                title="Controller"
              >
                Controller
              </Card>
            </div>
          </div>

        </Card>

      </div>
    </div>
  )
}

export default PCB