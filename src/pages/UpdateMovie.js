import styled from "styled-components";

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

function UpdateMovie({ id }) {
    function updateUser(e) {
        e.preventDefault();
        window.location.href = `/movies/update/${id}`
    }

    return (
        <Update onClick={updateUser}>Update</Update>
    )
}

export default UpdateMovie;