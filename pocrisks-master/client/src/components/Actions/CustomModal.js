import React, { useEffect, useRef, useState } from "react";
import { Modal } from 'react-bootstrap'
import { useForm, Controller } from "react-hook-form";
import Input from 'react-input-ui/collection/nao';
import addRiskApi from '../../util/addRiskApi'

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import { getTypes } from "service/riskTypes.service";
import { InputLabel, MenuItem, Select, Button } from "@material-ui/core";

export default function CustomModal({ launch, lg, lt }) {
  // handle images
  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    console.log("handleImageChange ", e.target.files[0])
    setImage(e.target.files[0])
  }
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
    // handle image before submit
    
    console.log("values ", values)
    const formData = new FormData();
    formData.append('image', image);
    Object.keys(values).forEach((key) =>{
    console.log("append ",key, values[key])
    key !== "file" && formData.append(key, values[key])}
    )

    //console.log(values)
    addRiskApi.addRiskApi(formData).then((res) => {
      if (res.data.success) {
        // added succesfully
      }
      else {
        // error while adding a new risk
      }
    }).catch(() => {
      // error 404/ 500
      // unknown error 
      // something went wrong
    })
    // console.log("launch=", aunch)
    // window.location.reload()
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
                          {elem.type}
                        </MenuItem>)
                    }
                  </Select>
                }
                name="type"
                control={control}
                defaultValue={lt}
              />
            </p>
            <p class="field">
              <InputLabel id="risk-image">Image</InputLabel>
              {/*/// types select : */}
              <Controller
                as={
                  <Button
                    variant="contained"
                    component="label"
                  >
                    Upload File
                     <input
                      type="file"
                      onChange={
                        handleImageChange
                      }
                      hidden
                    />
                  </Button>
                }
                name="file"
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