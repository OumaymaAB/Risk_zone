import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function AddEditForm(props) {
  const[form, setValues] = useState({
    id: 0,
    username: '',
    email: '',
    password: '',
    admin: false
    
  });
  const [checked, setChecked] = useState(false);

  

  const onChange = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  


  const submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:8088/crud', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: form.username,
        password: form.password,
        email: form.email,
        admin: form.admin
        
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          props.addItemToState(item[0])
          props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  const submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:8088/crud', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: form.id,
        username: form.username,
        password: form.password,
        email: form.email,
        admin: form.admin
      
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          // console.log(item[0])
          props.updateState(item[0])
          props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if(props.item){
      const { id, username,  email, password, admin } = props.item
      setValues({ id,  username, email, password, admin })
    }
  }, [])

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
      <FormGroup>
        <Label for="username">Username</Label>
        <Input type="text" name="username" id="username" onChange={onChange} value={form.username === null ? '' : form.username} />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input type="text" name="email" id="email" onChange={onChange} value={form.email === null ? '' : form.email} />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input type="password" name="password" id="password" onChange={onChange} value={form.password === null ? '' : form.password}  />
      </FormGroup>
      {/* <FormGroup>
        <Label for="admin">Authorised</Label>
        <Input type="bolean" name="admin" id="admin" onChange={onChange} value={form.admin === null ? '' : form.admin}  />
      </FormGroup> */}
      <FormGroup>
        {/* <Label for="admin">Authorised : </Label>
        <Input type="checkbox" name="admin" id="admin" checked={isAdmin} 
        onChange={() => setValues(prev=> ({...prev, admin: !prev.admin}))}/>
        onChange={(e) =>{setIsAdmin(e.target.checked)}} /> */}

        <label>
          <input type="checkbox" checked={checked} onChange={() => {setChecked(!checked)
          setValues(prev=> ({...prev, admin: !prev.admin}))
          }
          }/>
          Authorised 
        </label>
      </FormGroup>

      <Button>Submit</Button>
    </Form>
  )
}

export default AddEditForm
