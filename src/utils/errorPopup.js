import React from 'react'

const ErrorPopup = (props) => {
  const {handlePopup,isError,error} = props;
  const data = Object.keys(error)
  return (
    <>
         <div className="shadow" style={{display:isError?"block":"none"}}></div>
     <div className={` ${isError?"cutom-modal":"cutom-modal-up"}`}>
    <div className='mod-head'>
      Error
    </div>
    {
      data?.map(item=>  <span className='span'>{error[item]}</span>)
    }
  

    <div>
    <button className="btn btn-primary" onClick={handlePopup}>
               Ok
    </button>
    </div>
  </div>
    </>
  
  )
}

export default ErrorPopup