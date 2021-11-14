import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

export interface Props {
    Anime:string[]
}
const useStyles = makeStyles((theme) => ({
    root: {
        width: '300px',
        height: '520px',
        marginTop: '7px',
    },
    cardCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}))

const PopularAnime = (props:Props) => {
    const { Anime } = props
    const classes = useStyles()

    return (
        <React.Fragment>
            {Anime.map((e:any) => {
               // console.log(e)
                return (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={e.mal_id}
                        className={classes.cardCenter}
                    >
                        <Link
                            to={`/search/${e.mal_id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <Card className={classes.root}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        image={e.image_url}
                                        title={e.title}
                                        height="450px"
                                    />
                                    <CardContent
                                        style={{
                                            height: '80px',
                                        }}
                                    >
                                        <Typography
                                            gutterBottom
                                            variant="body1"
                                            component="h6"
                                            color="primary"
                                            
                                        >
                                            {e.title}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Grid>
                )
            })}
        </React.Fragment>
    )
}

export default PopularAnime
