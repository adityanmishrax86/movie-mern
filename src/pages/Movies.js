import DeleteMovie from "./DeleteMovie";
import UpdateMovie from "./UpdateMovie";

function Movies({ movie }) {

    return (
        <>
            <td>{movie._id}</td>
            <td>{movie.name}</td>
            <td>{movie.rating}</td>
            <td><DeleteMovie id={movie._id} /></td>
            <td><UpdateMovie id={movie._id} /></td>
        </>
    )
}

export default Movies