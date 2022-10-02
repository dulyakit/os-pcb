import React from 'react';
import { useSelector } from 'react-redux'
import { PageHeader } from 'antd';
import Swal from 'sweetalert2'

const Header = () => {
  const clock = useSelector((state) => state.clock)
  const starvationTime = useSelector((state) => state.starvationTime)

  const changeStarvationTime = () => {
    Swal.fire({
      title:'Please change "Starvation Time" in model',
      showConfirmButton: false,}) 
  }
  return (
    <PageHeader>
      <div className="col-md-12">
        <div className='row'>
          <div className="col-md-6" align='left'>
            <h4>Priority non-preemptive scheduling</h4>
          </div>
          <div className="col-md-6" align='right'>
            <h6><span className='Starvation' onClick={() => changeStarvationTime()}>Starvation : {starvationTime} second</span> <span style={{ marginLeft: '10px' }}>Clock : {clock}</span></h6>
          </div>
        </div>
      </div>
    </PageHeader>
  )
}

export default Header;