import React, { Component } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { Link, Redirect } from 'react-router-dom'
import './Details.css'

class DetailsView extends Component {
    render() {
        if (this.props.isSelected === false) {
            return <Redirect to='/' />
        } else {
            return (
                <>
                    <Grid container id="detailsContainer">
                        <Grid item xs={5} id="imageWrapper">
                            <img alt={this.props.movies[this.props.movieId-1].title} src={this.props.movies[this.props.movieId-1].poster} />
                        </Grid>
                        <Grid item xs={7}>
                            <h2>{this.props.movies[this.props.movieId-1].title}</h2>
                            <p>{this.props.movies[this.props.movieId-1].description}</p>
                            <div id="buttonWrapper">
                                <Link to="/">
                                    <Button variant="contained" color="primary">Back to List</Button>
                                </Link>
                                <Link to="/edit">
                                    <Button variant="contained" color="primary">Edit</Button>
                                </Link>
                            </div>
                        </Grid>
                    </Grid>
                    {/* <pre>
                        {JSON.stringify(this.props.selectedMovie.movie, null, 2)}
                    </pre> */}
                </>
            )
        }
    }
}

const mapReduxStateToProps = (reduxState) => ({
    movies: reduxState.movies,
    isSelected: reduxState.selectedMovie.isSelected,
    movieId: reduxState.selectedMovie.movieId,
})

export default connect(mapReduxStateToProps)(DetailsView)