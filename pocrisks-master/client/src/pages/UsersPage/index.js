import CustomNavbar from "components/Actions/Navbar"
import UsersList from "components/Admin/users"
import React from "react"

const UsersPage = () => {
    return (
        <>
        <CustomNavbar />
        <UsersList />
        </>
    )
}

export default UsersPage;