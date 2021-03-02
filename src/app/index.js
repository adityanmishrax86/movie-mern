import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Navbar } from '../components'
import { MoviesInsert, MoviesList, MoviesUpdate } from '../pages';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/movies/list" exact component={MoviesList} />
          <Route path="/movies/create" exact component={MoviesInsert} />
          <Route path="/movies/update/:id" exact component={MoviesUpdate} />

        </Switch>
      </Router>
    </>
  );
}

export default App;
