import api from '../api'

import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

function MoviesUpdate(props) {
    const [name, setname] = useState('')
    const [rating, setrating] = useState('')
    const [time, settime] = useState('')
    const [id, setId] = useState(props.match.params.id)
    const history = useHistory();

    function handleInputNameChange(e) {
        setname(e.target.value)
    }
    function handleInputTimeChange(e) {
        settime(e.target.value)
    }
    function handleInputRatingChange(e) {
        const mrating = e.target.validity.valid ? e.target.value : rating
        setrating(mrating);
    }

    useEffect(() => {
        async function populateFields() {
            const movie = await api.getMovieById(id);

            setname(movie.data.data.name)
            setrating(movie.data.data.rating)
            settime(movie.data.data.time.join("/"))
        }

        populateFields()

    }, [])

    async function handleUpdateMovie() {
        const arrayTime = time.split("/");
        const payload = { name, rating, time: arrayTime }
        console.log(payload)
        await api.updateMovieById(id, payload)
            .then(() => {
                window.alert('Updated Successfully')
                setname("")
                setrating("")
                settime("")
            })
            .catch(err => console.log(err))
        history.push("/movies/list")
    }

    return (
        <Wrapper>
            <Title>Create Movie</Title>

            <Label>Name: </Label>
            <InputText
                type="text"
                value={name}
                onChange={handleInputNameChange}
            />

            <Label>Rating: </Label>
            <InputText
                type="number"
                step="0.1"
                lang="en-US"
                min="0"
                max="10"
                pattern="[0-9]+([,\.][0-9]+)?"
                value={rating}
                onChange={handleInputRatingChange}
            />

            <Label>Time: </Label>
            <InputText
                type="text"
                value={time}
                onChange={handleInputTimeChange}
            />

            <Button onClick={handleUpdateMovie}>Update Movie</Button>
            <CancelButton href={'/movies/list'}>Cancel</CancelButton>
        </Wrapper>
    )
}

export default MoviesUpdate;