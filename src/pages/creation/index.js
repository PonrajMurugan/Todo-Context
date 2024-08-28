import React, { useContext, useEffect, useState } from "react";
import { TodoContext } from "../../feature/context";
import { lbl } from "../../utils/label";
import Modal from "../../utils/popup";
import ErrorPopup from "../../utils/errorPopup";

const ToDoCreation = () => {
  const [state, setState] = useState({
    clientName: "",
    sportsName: "",
    filter: "",
    isEdit: false,
    id: 0,
    isError:false,
    isSuccess:false,
    message:"",
    data:[]
  });
  const [error, setError] = useState({});
  const { clientName, sportsName, filter, isEdit, id ,isError,isSuccess,message,data} = state;
  const reduxData = useContext(TodoContext).state.data;

  useEffect(()=>{
    
    setState(prev=>({...prev,data:reduxData}))
  },[])
  const { dispatch } = useContext(TodoContext);

  const handleAddList = () => {
    if (clientName && sportsName) {
        setError(prev => ({
            ...prev,
            clientName : "",
            sportsName :""
        }))
       
      if (isEdit) {
        setState(prev=>({
          ...prev,
          isSuccess:true,
          message:"Successfully Updated"
        }))
        handleEdit(id);
      } else {
        setState(prev=>({
          ...prev,
          isSuccess:true,
          message:"Successfully Submited"
        }))
        handleAdd();
      }
    } else {
      setState(prev=>({...prev,isError:true}))
      if (clientName == "") {
        setError(prev => ({
            ...prev,
            clientName : lbl.clientErr
        }))
        
      } else {
        setError(prev => ({
            ...prev,
            clientName : ""
        }))
        
      }
      if (sportsName == "") {
        setError(prev => ({
            ...prev,
            sportsName : lbl.sportErr
        }))
      } else {
        setError(prev => ({
            ...prev,
            sportsName : ""
        }))
      }
    }
  };
  const handleAdd = () => {

    const innerData = data;
    const obj = {
      id: data.length + 1,
      clientName,
      sportsName,
      isComplete: "Pending",
      check:false,
      icon:true
    };
    innerData.push(obj);
    dispatch({ type: "data", payload: innerData });
    setState(prev => ({
      ...prev,
      clientName : "",
      sportsName :""
  }))
  };
  const handleEdit = (id) => {
    const findIndex = data.findIndex((item) => item.id == id);
    data[findIndex].clientName = clientName;
    data[findIndex].sportsName = sportsName;
    dispatch({ type: "data", payload: data });
    setState(prev=>({...prev,isEdit:false}))
  };

  console.log(error); 

  const handleChange = (event) => {
    const {name,value} = event.target;
    setState(prev=>({
      ...prev,
        [name]:value
    }))
  }
  
  const handlePopup = () => {
    setState(prev => ({
      ...prev,
      isError:false,
      isSuccess:false
    }))
  }

  const handleCheck = (item,index) =>{
    if(item.icon){
      if(data[index].check == true){
        data[index].icon = false
        data[index].isComplete = "Completed" 
        setState((prev=>({...prev,isSuccess:true,message:"Successfully Completed"})))
      }else{

      }

    }
    
  
  }

  const handleCheckBox = (item,index,event) => {
    data[index].check = event.target.checked;
  }

  const deleteData = (item) => {
    const filterData = reduxData.filter(it => it.id != item.id);
    setState(prev =>({...prev,data:filterData}))
    dispatch({ type: "data", payload: filterData });
  }
  const handleEditState = (item) => {
    if(item.icon){
      setState(prev=>({
        ...prev,
        isEdit:true,
        clientName:item.clientName,
        sportsName:item.sportsName,
        id:item.id
      }))
    }
  }


  const filterData = (value) => {
    if(value != "1"){
      const filter = reduxData.filter(item => item.isComplete == value);
      setState(prev=>({...prev,data:filter}))
    }else{
      setState(prev=>({...prev,data:reduxData}))
    }
   
  }
  return (
    <>
     <ErrorPopup isError={isError} handlePopup={handlePopup} error={error}/>
     <Modal isSuccess={isSuccess} handlePopup={handlePopup} message={message}/>
      <div className="row d-flex justify-content-center">
        <div className="col-sm-10 col-xl-8" style={{ marginTop: "100px" }}>
          <div className="card-hover-shadow-2x mb-3 card">
            <div className="card-header-tab card-header">
              <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                <i className="fa fa-tasks"></i>&nbsp;Task Lists
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    @
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  name="clientName"
                  value={clientName}
                  placeholder="name"
                  aria-label="Client Name"
                  aria-describedby="basic-addon1"
                  onChange={handleChange}
                />
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    @
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  name="sportsName"
                  value={sportsName}
                  placeholder="Sports Name"
                  aria-label="Sports Name"
                  aria-describedby="basic-addon1"
                  onChange={handleChange}
                />
              </div>

              <select class="form-select" onChange={(e)=>filterData(e.target.value)}>
                <option selected value="1">Select</option>
                <option value="1">All</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div className="scroll-area-sm">
              <div style={{ position: "static" }} className="ps ps--active-y">
                <div className="ps-content">
                  <ul className=" list-group list-group-flush">
                    {data?.map((item,index) => (
                      <li className="list-group-item" style={{background:index%2==0?"#e1e1e1":""}}>
                        <div className="todo-indicator bg-warning"></div>
                        <div className="widget-content p-0">
                          <div className="widget-content-wrapper">
                            <div className="widget-content-left mr-2">
                              <div className="custom-checkbox custom-control">
                                {
                                  item.icon ? <input
                                  className="custom-control-input"
                                  id="exampleCustomCheckbox12"
                                  type="checkbox"
                                  onChange={(event)=>handleCheckBox(item,index,event)}
                                /> : <input
                                className="custom-control-input"
                                id="exampleCustomCheckbox12"
                                type="checkbox"
                                checked
                                disabled
                                onChange={(event)=>handleCheckBox(item,index,event)}
                              />
                                }
                                
                                <label
                                  className="custom-control-label"
                                  for="exampleCustomCheckbox12"
                                >
                                  &nbsp;
                                </label>
                              </div>
                            </div>
                            <div className="widget-content-left">
                              <div className="widget-heading">
                                {item?.sportsName}{" "}
                                <div className="badge badge-danger ml-2">
                                  
                                </div>
                              </div>
                              <div className="widget-subheading">
                                <i>{item?.clientName}</i>
                              </div>
                            </div>
                            <div className="widget-content-right">
                              <button className={`border-0 btn-transition btn  ${item.icon?"btn-outline-warning":"btn-outline-success"}`}>
                                {item?.isComplete}
                              </button>
                              <button className={`border-0 btn-transition btn btn-outline-success ${item.icon?"":"disabled"}`} onClick={()=>handleCheck(item,index)}>
                                <i className="fa fa-check"></i>
                              </button>
                              <button className={`border-0 btn-transition btn`} onClick={()=>handleEditState(item,index)}>
                              <i class="fa fa-edit"></i>
                              </button>
                             
                              <button className="border-0 btn-transition btn btn-outline-danger" onClick={()=>deleteData(item)}>
                                <i className="fa fa-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="d-block text-right card-footer">
              <button className="mr-2 btn btn-link btn-sm">Cancel</button>
              <button className="btn btn-primary" onClick={handleAddList}>
                Add Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDoCreation;
