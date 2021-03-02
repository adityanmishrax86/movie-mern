import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:4001/api'
})

const insertMovie = payload => api.post(`/movie`, payload);
const getAllMovies = () => api.get("/movie")
const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
const getMovieById = (id) => api.get(`/movie/${id}`)
const deleteMovieById = (id) => api.delete(`/movie/${id}`)

const apis = {
    insertMovie,
    getAllMovies,
    getMovieById,
    updateMovieById,
    deleteMovieById
}

export default apis