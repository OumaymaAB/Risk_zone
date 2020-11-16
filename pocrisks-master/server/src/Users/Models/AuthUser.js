  // get user creds from request body
  // find user based on username in request
  // check user's password against pw from request
  // if match, create and save session for user
  // send back json to client with user info

import { client } from "../../db/connect";

const findUser = (userReq) => {
  console.log("here find user")
  return client.query("SELECT * FROM users WHERE username = $1" , [userReq.username])
    .then((data) => {
      console.log("here is result ====>>>>>",data.rows[0])
      return data.rows[0]
    }).catch(e => console.error(e.stack))
}

const checkUserPermission = (User) => {
  return (User.admin)
}

const checkPassword = (reqPassword, foundUser) => {

  console.log("pass =" , foundUser.password)

  return new Promise((resolve, reject) => {

    let code = null;
    
    // if the user is an admin then 
    // status => 200
    // else status => 201

    (checkUserPermission(foundUser)? code = 200 : code = 201 )


        if (reqPassword == foundUser.password)
          resolve(
            {
              foundUser,
              status : code
            })
        else
          reject(
            {
               foundUser : null,
               status : 403
          })
    })
}

const signin = async (request, response) => {

  const userReq = request.body

  console.log("user request ::: ",userReq)

  let user = null

  return await findUser(userReq)
    .then(foundUser => {
      user = foundUser
     return checkPassword(userReq.password, foundUser)
          .then(resp => {
                  console.log("resp",resp)
                return {
                      status :resp.status,
                      username : resp.foundUser.username
                    }
                })
          .catch( e => 
                  console.log("err in check pass ",e)
                )
    })
    .catch(() => {
      console.log("err in find user status = 404")
    })
}

module.exports = {
  signin
}
