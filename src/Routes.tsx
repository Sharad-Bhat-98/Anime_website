import { Route, BrowserRouter as Router } from 'react-router-dom'
import App from './components/App'
import NavBar from './components/Drawer'
import React, { Suspense, lazy } from 'react'

const Loading = (
    <div style={{ width: '100%', textAlign: 'center', color: 'white' }}>
        <h2>Loading.....</h2>
    </div>
)
const AsyncSearchResults = lazy(() => import('./components/searchResults'))
const AsyncAnimeDetails = lazy(() => import('./components/animedeatils'))
const AsyncSeasonalAnime = lazy(() => import('./components/SeasonalAnime'))
const AsyncTopAnime = lazy(() => import('./components/TopAnime'))
const AsyncUpcoming = lazy(() => import('./components/UpcomingAnime'))

const Routes = () => {
    return (
        <Router>
            <NavBar />
            <Suspense fallback={Loading}>
                <Route exact path="/search/:id" component={AsyncAnimeDetails} />

                <Route
                    exact
                    path="/searchresults/:name"
                    component={AsyncSearchResults}
                />

                <Route exact path="/seasonal" component={AsyncSeasonalAnime} />
                <Route exact path="/top" component={AsyncTopAnime} />
                <Route exact path="/upcoming" component={AsyncUpcoming} />
            </Suspense>

            <Route exact path="/" component={App} />
        </Router>
    )
}

export default Routes
