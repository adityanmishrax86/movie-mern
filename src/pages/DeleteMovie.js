import styled from "styled-components";
import api from "../api"

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

function DeleteMovie({ id }) {
    function deleteUser(e) {
        e.preventDefault();
        if (
            window.confirm(
                `Do tou want to delete the movie ${id} permanently?`,
            )
        ) {
            api.deleteMovieById(id)
            window.location.reload()
        }
    }

    return (
        <Delete onClick={deleteUser}>Delete</Delete>
    )
}

export default DeleteMovie;