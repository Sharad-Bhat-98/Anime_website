import React, { useState, useEffect, Suspense, lazy } from 'react'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core'
import background from '../assets/background.jpg'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

const Loading = (
    <div style={{ width: '100%', textAlign: 'center', color: 'white' }}>
        <h2>Loading.....</h2>
    </div>
)
const AsyncPopularAnime = lazy(() => import('./popularanime'))

const useStyles = makeStyles((theme) => ({
    font: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '35px',
        },
    },

    popularanime: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '25px',
        },
    },

    disp: { display: 'flex', justifyContent: 'space-between' },
}))

function App() {
    const [search, setSearch] = useState('')
    const [Anime, setAnime] = useState([])
    useEffect(() => {
        const TopAnime = () => {
            fetch('https://api.jikan.moe/v3/top/anime/1/tv', {
                method: 'GET',
            })
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                   // console.log(data)
                    setAnime(data.top.splice(0, 12))
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        TopAnime()
    }, [])

    const handleDisabled = () => {
        if (search) {
            return false
        } else {
            return true
        }
    }
    const classes = useStyles()
    return (
        <Grid container spacing={1}>
            <Grid
                item
                xs={12}
                style={{
                    backgroundImage: ` url(${background})`,
                    height: '100vh',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    textAlign: 'center',
                }}
            >
                <div>
                    <Typography
                        variant="h3"
                        color="primary"
                        style={{ paddingTop: '200px' }}
                        className={classes.font}
                    >
                        <b>Unleash The Weeb Within You </b>
                    </Typography>
                    <Typography variant="h6" color="primary">
                        <b> Get info of the Anime you like</b>
                    </Typography>
                    <form autoComplete="off" noValidate>
                        <TextField
                            variant="filled"
                            label="search anime"
                            style={{ marginTop: '30px', minWidth: '350px' }}
                            onChange={(e) => setSearch(e.target.value)}
                            focused
                        />
                        &nbsp;&nbsp;&nbsp;
                        <Link
                            to={`/searchresults/${search}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    marginTop: '30px',
                                    padding: '15px',
                                    borderRadius: '25px',
                                    marginBottom: '250px',
                                }}
                                size="large"
                                type="submit"
                                disabled={handleDisabled()}
                            >
                                <b> Search</b>
                            </Button>{' '}
                        </Link>
                    </form>
                </div>
            </Grid>
            <Grid item xs={12} className={classes.disp}>
                <Typography
                    variant="h4"
                    color="primary"
                    style={{ paddingLeft: '20px', marginTop: '30px' }}
                    className={classes.popularanime}
                >
                    Popular Anime
                </Typography>
                <Link
                    to="/top"
                    style={{
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    <Button
                        color="primary"
                        variant="outlined"
                        style={{
                            marginRight: '40px',
                            marginTop: '25px',
                        }}
                        size="large"
                    >
                        View More
                    </Button>
                </Link>
            </Grid>
            <Suspense fallback={Loading}>
                <AsyncPopularAnime Anime={Anime} />
            </Suspense>
        </Grid>
    )
}

export default App
