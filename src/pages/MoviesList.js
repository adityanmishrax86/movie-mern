import styled from 'styled-components';

import api from '../api'
import { useEffect, useState, } from 'react';

import Movies from './Movies'

const Wrapper = styled.div`
padding: 0 40px 40px 40px;
`

function MoviesList() {
    const [movies, setMovies] = useState('')
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            await api.getAllMovies()
                .then(movies => {
                    setMovies(movies.data.data)
                    setLoading(false)
                })
        }
        fetchData();
    }, [])

    return (
        <>
            <Wrapper className="container">
                {movies && (
                    <table className="table table-condensed table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Rating</th>
                                <th></th>
                                <th></th>
                            </tr>

                        </thead>
                        <tbody>
                            {movies.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <Movies movie={item} />
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                )}
            </Wrapper>
        </>
    )
}

export default MoviesList;