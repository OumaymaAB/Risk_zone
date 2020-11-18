import React, { useEffect, useRef, useState } from "react";
import { Modal , Button } from 'react-bootstrap'
import { useForm , Controller } from "react-hook-form";
import Input from 'react-input-ui/collection/nao';
import addRiskApi from '../../util/addRiskApi'

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CustomModal({launch , lg ,lt }) {
   // launch = true
  const [show, setShow] = useState(launch);

    const handleCloseModal = () => { 
        setShow(false)
        console.log("launch=",launch)
        window.location.reload()
    }
    const handleSubmitModal = () => setShow(false);

    const { control, handleSubmit} = useForm();

    const onSubmit = values => {
        console.log(values)
        addRiskApi.addRiskApi(values)
        console.log("launch=",launch)
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