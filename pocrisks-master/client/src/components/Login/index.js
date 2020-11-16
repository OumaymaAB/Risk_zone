import React from "react";
import { useForm , Controller } from "react-hook-form";
import { Card } from "@material-ui/core";
import Input from 'react-input-ui/collection/nao';
import LoginApi from '../../util/LoginApi'

import './style.scss'

export default function LoginForm(props) {

  //////////////////////////////////////////////////
  const { control, handleSubmit} = useForm();

  const onSubmit = values => LoginApi.LoginApi(values)

//////////////////////////////////////////////////////
  return (
<Card class='card-login'>
  <div class="container">
		<div class="login-container">
			<div class="login-container-img">
				<h1>LookUp Project</h1>
			</div>
			<div class="login-container-content">
				<form action="" class="login-form" onSubmit={handleSubmit(onSubmit)}>
					<h1>Login</h1>
					<p class="field">
					
						{/*//// email or identifier input :::*/}
             <Controller
                  as={
                    <Input
                      label={'Username'}
                      placeholder='Username...'
                      type="text"
                      />
                  }
                  name="username"
                  control={control}
                  defaultValue=""
              />
					</p>
					<p class="field">
						
            {/*/// password input : */}
           <Controller
                        as={
                          <Input
                    label={'Password'}
                    placeholder='Password...'
                    type="password"
                  />
                        }
                        name="password"
                        control={control}
                        defaultValue=""
             />
					</p>
					<button type="submit" class="submitBtn">Sign in</button>
				</form>
			</div>
		</div>
	</div>
                </Card>
  );
}
