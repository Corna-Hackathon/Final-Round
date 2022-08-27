const express = require('express');
const router = express.Router();
const Podcast = require('./api/schema/podcast');
let token = require('../onchain/token');

/* GET home page. */
router.get('/', async function(req, res) {
    token = await token;
    // console.log(Number(await token.balence()));
    if(req.isAuthenticated()) {
        res.render('index', { login: `${req.user._id}: ${await token.balanceOf(await token.textToPrincipal('cvbg5-4mj6t-sqhn2-aeku3-42nq7-2buw5-xhonw-nervo-ogphz-dujul-lae'))}` });
    } else {
        res.render('index', { login: 'Login'});
    }
});

router.get('/news', function(req, res) {
    res.render('news');
});

router.get('/podcast', async function(req, res) {
    // console.log(await Podcast.findByFileName())
    res.render('podcast',{podcasts: await Podcast.findByFileName()} );
});

router.get('/charity', function(req, res) {
    res.render('charity');
});

router.get('/leaderboard', function(req, res) {
    res.render('leaderboard');
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.get('/game', function (req, res){
    res.render('game');
})

router.get('/playing_pod/:id', async function(req, res) {
    if(req.isAuthenticated()){
        try {
            const data = await Podcast.findById(req.params.id).lean();
            res.render('playing_pod', {name: data.name, id: req.params.id});
        } catch {
            res.redirect('/podcast');
        }
    } else {
        res.redirect('/login');
    }
});

router.get('/afterpod/:id', async function(req, res) {
    if(req.isAuthenticated()){
        try{
            const data = await Podcast.findById(req.params.id).lean();
            res.render('afterpod', data);
        } catch (e) {
            res.redirect('/podcast');
        }
    } else {
        res.redirect('/login');
    }
});

router.get('/quizz/:id', async function(req, res) {
    if(req.isAuthenticated()){
        res.render('quizz');
    } else {
        res.redirect('/login');
    }
});

// Text to principalID

// router.post('/test/:id', async  function (req, res){
//     token = await token;
//     console.log(typeof await token.textToPrincipal(req.params.id));
//     res.send({})
// });

module.exports = router;
