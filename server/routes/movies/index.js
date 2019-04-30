const router = require('express').Router();
const User = require('mongoose').model('User');
const Movies = require('mongoose').model('Movies');
const axios = require('axios');
const fs = require('fs');
const isAuthenticated = require('../auth');
const config = require('../../config/config');

const fetchPopularMovies = async() => {
    const url = `${config.MOVIES_BASE_URL}/movie/popular?api_key=${config.MOVIES_API_KEY}&language=en-US&page=1`;
    const headers = {
        'Content-Type': 'application/json'
    };
    const response = await axios.get(url, {headers});
    return response.data.results;

};

router.get('/popular', async(req, res) => {
    const authenticated = isAuthenticated(req);
    const userId = authenticated._id;
    const result = await User.findById(userId);

    if(!result) {
        res.status(401).send({
            success: false,
            message: 'Not logged in'
        })
    }

    try {
        await Movies.deleteMany({});
        const fetchedMovies = await fetchPopularMovies();
        const formattedData = await fetchedMovies.map(({id, title, release_date, vote_average}) => ({
            id,
            title,
            release_date,
            vote_average
        })).sort((a, b) => b.vote_average - a.vote_average);
        const {token, ...user} = result.toAuthJSON();
        const finalMovies = await Movies.insertMany(formattedData);

        fs.writeFileSync('./db/temp-json/movies.json', JSON.stringify(formattedData, null, 2));

        return res.status(200).json({
            message: 'Movies retrieved successfully',
            data: finalMovies,
            user
        })

    } catch(err) {
        console.log(err);
    }

});

router.delete('/delete/:id', async(req, res) => {
    const authenticated = isAuthenticated(req);
    const userId = authenticated._id;
    const result = await User.findById(userId);
    const { params: { id } } = req;


    return Movies.remove({id}, async(error) => {
        const movies = await Movies.find({});

        if(!result) {
            res.status(401).send({
                success: false,
                message: 'Not logged in'
            })
        }

        if(error) throw error;

        fs.writeFileSync('./db/temp-json/after-delete.json', JSON.stringify(movies, null, 2));
        res.send({
            success: true,
            data: movies
        })
    });

});

module.exports = router;

