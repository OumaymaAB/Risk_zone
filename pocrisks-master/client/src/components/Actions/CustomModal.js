import React, { useEffect, useRef, useState } from "react";
import { Modal, Button } from 'react-bootstrap'
import { useForm, Controller } from "react-hook-form";
import Input from 'react-input-ui/collection/nao';
import addRiskApi from '../../util/addRiskApi'

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import { getTypes } from "service/riskTypes.service";
import { InputLabel, MenuItem, Select } from "@material-ui/core";

export default function CustomModal({ launch, lg, lt }) {
  // launch = true
  const [show, setShow] = useState(launch);
  // risk types state
  const [riskTypes, setRiskTypes] = useState([]);

  useEffect(() => {
    // select types
    getTypes()
      .then((res) => {
       
        if (res.data.success)
          setRiskTypes(res.data.types)
        else
          console.error("error while fetching types");
      })
      .catch((err) => console.log("Types api ERR : ", err))
  }, [])
  const handleCloseModal = () => {
    setShow(false)
    //console.log("launch=", launch)
    window.location.reload()
  }
  const handleSubmitModal = () => setShow(false);

  const { control, handleSubmit } = useForm();

  const onSubmit = values => {
    //console.log(values)
    addRiskApi.addRiskApi(values).then((res) => {
      if(res.data.success){
        // added succesfully
      }
      else{
        // error while adding a new risk
      }
    } ).catch(() => {
      // error 404/ 500
      // unknown error 
      // something went wrong
    } )
    // console.log("launch=", aunch)
    window.location.reload()
  }


  return (
    <>

      <Modal
        show={show}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={true}
      >
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Add new Risk</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p class="field">

              {/*//// email or identifier input :::*/}
              <Controller
                as={
                  <Input
                    label={'Risk Description'}
                    placeholder={'Risk Description'}
                    type="text"
                  />
                }
                name="risk"
                control={control}
              />
            </p>
            <p class="field">

              {/*//// email or identifier input :::*/}
              <Controller
                as={
                  <Input
                    label={'Longitude'}
                    placeholder={'Longitude'}
                    type="number"
                  />
                }
                name="lg"
                control={control}
                defaultValue={lg}
              />
            </p>

            <p class="field">

              {/*/// password input : */}
           
              <Controller
                as={
                  <Input
                    label={'Latitude'}
                    placeholder={'Latitude'}
                    type="number"
                  />
                }
                name="lt"
                control={control}
                defaultValue={lt}
              />
            </p>

            <p class="field">
             <InputLabel id="risk-type">Type</InputLabel> 
              {/*/// types select : */}
              <Controller
                as={
                  <Select
                  labelId="risk-type"
                  
                    name="type"
                    
                  >
                    {
                      riskTypes.length > 0 && riskTypes.map((elem, index) => 
                      <MenuItem value={elem.id} key={index}>
                        {elem.description}
                      </MenuItem>)
                    }
                  </Select>
                }
                name="type"
                control={control}
                defaultValue={lt}
              />
            </p>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Exit
          </Button>
            <Button variant="primary" type="submit" >Add Risk</Button>
          </Modal.Footer>
        </form>
      </Modal>

    </>
  );
}