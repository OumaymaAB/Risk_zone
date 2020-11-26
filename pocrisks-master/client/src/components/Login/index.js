import React, { useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Card } from "@material-ui/core";
import Input from "react-input-ui/collection/nao";
import LoginApi from "../../util/LoginApi";

import "./style.scss";
import { Context, saveState } from "../../util/useAuth";
import { hist } from "../../App";
import { clearStorage } from "mapbox-gl";

export default function LoginForm(props) {
  const { context, setContext } = useContext(Context);

  useEffect(() => {
    if (context.isLogged) {
      if (context.user.admin) hist.push("/admin/map");
      else hist.push("/client/map");
    }
  }, []);
  //////////////////////////////////////////////////
  console.log("Conext login ", context);
  const { control, handleSubmit } = useForm();

  const onSubmit = (values) =>
    LoginApi.LoginApi(values)
      .then((res) => {
        if (res.data !== "") {
          const state = {
            context: {
              isLogged: true,
              user: {
                username: res.data.username,
                admin: res.data.status === 200,
              },
            },
            setContext,
          };

          setContext(state);
          saveState(state);
          res.data.status === 200
            ? hist.push("/admin/map")
            : hist.push("/client/map");
        } else {
          console.log("error ", values);
        }
      })
      .catch((error) => console.log("error ", values));

  //////////////////////////////////////////////////////
  return (
    <>
      {!context.isLogged && (
        <Card className="card-login">
          <div className="container">
            <div className="login-container">
              <div className="login-container-img">
                <h1>LookUp Project</h1>
              </div>
              <div className="login-container-content">
                <form
                  action=""
                  className="login-form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <h1>Login</h1>
                  <p className="field">
                    {/*//// email or identifier input :::*/}
                    <Controller
                      as={
                        <Input
                          label={"Username"}
                          placeholder="Username..."
                          type="text"
                        />
                      }
                      name="username"
                      control={control}
                      defaultValue=""
                    />
                  </p>
                  <p className="field">
                    {/*/// password input : */}
                    <Controller
                      as={
                        <Input
                          label={"Password"}
                          placeholder="Password..."
                          type="password"
                        />
                      }
                      name="password"
                      control={control}
                      defaultValue=""
                    />
                  </p>
                  <button type="submit" className="submitBtn">
                    Sign in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
