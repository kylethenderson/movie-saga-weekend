const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route that will get all the movies from the db
router.get('/movies', (req, res) => {
    pool.query('SELECT * FROM "movies" ORDER BY "id";')
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log(error);
        })
})

// PUT route that will update the specific movie in the db
router.put('/movies', (req, res) => {
    pool.query(`UPDATE "movies" 
	SET "title" = $1, "description" = $2
    WHERE "id" = $3;`, [req.body.title, req.body.description, req.body.id])
        .then(response => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log(error)
        })
})

// GET route to get all the genres that are tagged on a specific movie
router.get('/genres', (req, res) => {
    console.log(req.query);
    pool.query(`SELECT "movies"."id", "movies"."title", "genres"."name" FROM
                "movies" JOIN "movies_genres"
                    ON "movies"."id" = "movies_genres"."movie_id"
                JOIN "genres"
                    ON "movies_genres"."genre_id" = "genres"."id"
                    WHERE "movies"."id" = $1;`, [req.query.id])
        .then(response => {
            console.log(response.rows)
            res.send(response.rows);
        })
        .catch(error => {
            res.sendStatus(500);
        })
})

// GET route to get the id of the row holding the specific
// genre for the specific movie so it can be deleted
router.get('/genres/delete', (req, res) => {
    pool.query(`SELECT "movies_genres"."id" FROM
                "movies" JOIN "movies_genres"
                    ON "movies"."id" = "movies_genres"."movie_id"
                JOIN "genres"
                    ON "movies_genres"."genre_id" = "genres"."id"
                    WHERE "genres"."name" = $1 AND "movies"."id" = $2;`, [req.query.genre, req.query.id])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            res.sendStatus(500);
        })


})

// DELETE route to delete the item from the db that was fetched above
router.delete('/genres/:id', (req, res) => {
    console.log(req.params.id);
    pool.query(`DELETE FROM "movies_genres" WHERE "id"=$1;`, [req.params.id])
        .then( response => {
            res.sendStatus(200);
        })
        .catch( error => {
            console.log(error);
        })
})


// export the router
module.exports = router;