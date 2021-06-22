const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/reg', (req, res) => {
    res.render('registros/add');
})

router.get('/dates',(req, res) => {
    res.render('registros/dates');
})

router.get('/info',(req, res) => {
    res.render('registros/info');
})

router.get('/academic',(req, res) => {
    res.render('registros/academic');
})

router.get('/academicmore',(req, res) => {
    res.render('registros/academicmore');
})

//peticiones post
router.post('/reg', async(req, res) => {
    const {retry} = req.body;
    const {success} = req.body;
    const {userName, email, password, curp} = req.body
    const newUser = {
        userName,
        email,
        password,
        curp
    }
    if (success){
        if (newUser.userName !== '' && newUser.email !== '' && newUser.password !== '' && newUser.curp !== ''){
            await pool.query('insert into logdata set ?', [newUser], (err, data) => {
                if (err) throw err;
            });
            res.redirect('dates');
        }
    }else if (retry){
        res.redirect('/');
    }
})

router.post('/dates',async (req, res) => {
    const {retry} = req.body;
    const {success} = req.body;
    const {name, lastName, birthDate} = req.body
    const addDates = {
        name,
        lastName,
        birthDate
    }
    if (success){
        if (addDates.name !== ''&& lastName !== '' && birthDate !== ''){
            await pool.query('insert into personaldatausers set ?', [addDates], (err, data) =>{
                if (err) throw err;
            })
            res.redirect('info');
        }
    }else if (retry){
        res.redirect('reg');
    }

})

router.post('/info',async(req, res) => {
    const {retry} = req.body;
    const {success} = req.body;
    const {birthPlace, address, numberPhone, maritalStatus, skypeAccount} = req.body
    const addInfo = {
        birthPlace,
        address,
        numberPhone,
        maritalStatus,
        skypeAccount
    }

    if (success){
        if (addInfo.birthPlace !== '' && addInfo.address !== '' && addInfo.numberPhone !== '' && addInfo.maritalStatus !== '' && addInfo.skypeAccount !== ''){
            await pool.query('insert into additionalinformation set ?', [addInfo], (err, data) =>{
                if (err) throw err;
            });
            res.redirect('academic');
        }

    }else if (retry){
        res.redirect('dates');
    }

})

router.post('/academic',async(req, res) => {
    const {retry} = req.body;
    const {success} = req.body;
    const {previousInstitution, countryOFInstitution, postgraduateCareer, title, professionalExperience, teachingExperience} = req.body
    const academicData = {
        previousInstitution,
        countryOFInstitution,
        postgraduateCareer,
        title,
        professionalExperience,
        teachingExperience
    }
    console.log(academicData)
    if (success){
        if (academicData.previousInstitution !== '' && academicData.countryOFInstitution && academicData.postgraduateCareer && academicData.title !== '' && academicData.professionalExperience !== '' && academicData.teachingExperience){
            await pool.query('insert into academicdata set ?', [academicData], (err, data) =>{
                if (err) throw err;
            });
            res.redirect('academicmore');
        }
    }else if (retry){
        res.redirect('info');
    }
})

router.post('/academicmore',async (req, res) => {
    const {retry} = req.body;
    const {success} = req.body;
    const {course, yearsAssisted, reason, kind, date, userIdMore} = req.body;

    const moreAcademic = {
        course,
        yearsAssisted,
        reason,
        kind,
        date,
        userIdMore
    };

    if (success){
        if (moreAcademic.course !== '' && moreAcademic.yearsAssisted !== '' && moreAcademic.reason !== '' && moreAcademic.kind !== '' && moreAcademic.date !== ''){
            await pool.query('insert into moreacademicdata set ?', [moreAcademic], (err, data) =>{
                if (err) throw err;
            });
            res.redirect('/');
        }
    }else if (retry){
        res.redirect('academic');
    }

})



module.exports = router;