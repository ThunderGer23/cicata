const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', (req, res) => {
    res.render('auth/login');
})

router.post('/validator', async(req, res) => {
    const { success } = req.body;
    const { userName, password } = req.body;
    const Login = {
        userName,
        password
    };

    if (success) {
        if (Login.userName !== '' && Login.password !== '') {
            const yes = await pool.query('select * from logdata where userName = ? and password = ?', [Login.userName, Login.password], (err, data) => {
                if (err) throw err;
            });
            res.redirect('/');

        }else{
            res.redirect('/reg/reg');
        }

    }


})

module.exports = router;