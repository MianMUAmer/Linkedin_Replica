var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var dbConn = require('../db');

//======================================= GET Requests for all Components =================================//

// Retrieve User info
router.get('/user', function (req, res, next) {
  dbConn.query('SELECT * FROM profileInfo', function (error, results, fields) {
    if (error) throw error;
    res.send({ error: false, data: results, message: 'users list.' });
  });
});

// Retrieve user experience with id 
router.get('/exp/:id', function (req, res) {
  let user_id = req.params.id;
  if (!user_id) {
    return res.status(400).send({ error: true, message: 'Please provide user_id' });
  }
  dbConn.query('SELECT * FROM experiences where user_id=?', user_id, function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'users list.' });
  });
});

// Retrieve user education with id 
router.get('/edu/:id', function (req, res) {
  let user_id = req.params.id;
  if (!user_id) {
    return res.status(400).send({ error: true, message: 'Please provide user_id' });
  }
  dbConn.query('SELECT * FROM education where user_id=?', user_id, function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'users list.' });
  });
});

// Retrieve user skills with id 
router.get('/skills/:id', function (req, res) {
  let user_id = req.params.id;
  if (!user_id) {
    return res.status(400).send({ error: true, message: 'Please provide user_id' });
  }
  dbConn.query('SELECT * FROM skills where user_id=?', user_id, function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'users list.' });
  });
});

// Retrieve user accomplishments with id 
router.get('/acmp/:id', function (req, res) {
  let user_id = req.params.id;
  if (!user_id) {
    return res.status(400).send({ error: true, message: 'Please provide user_id' });
  }
  dbConn.query('SELECT * FROM accomplishments where user_id=?', user_id, function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'users list.' });
  });
});

// Retrieve user interests with id 
router.get('/interest/:id', function (req, res) {
  let user_id = req.params.id;
  if (!user_id) {
    return res.status(400).send({ error: true, message: 'Please provide user_id' });
  }
  dbConn.query('SELECT * FROM interests where user_id=?', user_id, function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'users list.' });
  });
});

//======================================= POST (Add) Requests for all Components =================================//

// Add a new experience  
router.post('/add_exp', function (req, res) {
  // let user = req.body.user;
  // console.log(req.headers)
  const { user_id, company_name, role, location, role_description, img } = req.body;
  console.log({ company_name })
  if (!user_id) {
    return res.status(400).send({ error: true, message: 'Please provide user' });
  }
  dbConn.query("INSERT INTO experiences (user_id, company_name, role, location, role_description, img) values (?, ?, ?, ?, ?, ?)", [user_id, company_name, role, location, role_description, img.substring(12)], function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
  });
});

// Add a new education  
router.post('/add_edu', function (req, res) {
  // let user = req.body.user;
  // console.log(req.headers)
  const { user_id, edu_name, degree_level, degree_name, gpa, description, img } = req.body;
  console.log({ edu_name })
  if (!user_id) {
    return res.status(400).send({ error: true, message: 'Please provide user' });
  }
  dbConn.query("INSERT INTO education (user_id, edu_name, degree_level, degree_name, gpa, description, img) values (?, ?, ?, ?, ?, ?, ?)", [user_id, edu_name, degree_level, degree_name, gpa, description, img.substring(12)], function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'New education has been created successfully.' });
  });
});

// Add a new skill
router.post('/add_skill', function (req, res) {
  const { user_id, skill_name } = req.body;
  if (!user_id) {
    return res.status(400).send({ error: true, message: 'Please provide user' });
  }
  dbConn.query("INSERT INTO skills (user_id, skill_name) values (?, ?)", [user_id, skill_name], function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'New skill has been created successfully.' });
  });
});

// Add a new accomplishment
router.post('/add_acmp', function (req, res) {
  const { user_id, detail } = req.body;
  if (!user_id) {
    return res.status(400).send({ error: true, message: 'Please provide user' });
  }
  dbConn.query("INSERT INTO accomplishments (user_id, detail) values (?, ?)", [user_id, detail], function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'New accomplisment has been created successfully.' });
  });
});


//======================================= POST (Update) Requests for all Components =================================//

// Update experience  
router.post('/update_exp', function (req, res) {
  // let user = req.body.user;
  // console.log(req.headers)
  const { user_id, company_Id, company_name, role, location, role_description} = req.body;
  // console.log({ edu_id, user_id , gpa})
  if (!user_id) {
    return res.status(400).send({ error: true, message: 'Please provide user' });
  }
  dbConn.query("UPDATE experiences set company_name = ?, role = ?, location = ?, role_description = ? where company_Id = ?", [company_name, role, location, role_description, company_Id], function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
  });
});

// Update education  
router.post('/update_edu', function (req, res) {
  // let user = req.body.user;
  // console.log(req.headers)
  const { user_id, edu_id, edu_name, degree_level, degree_name, gpa, description, img} = req.body;
  console.log({ edu_id, user_id , gpa})
  if (!user_id) {
    return res.status(400).send({ error: true, message: 'Please provide user' });
  }
  dbConn.query("UPDATE education set edu_name = ?, degree_level = ?, degree_name = ?, gpa = ?, description = ?, img = ? where edu_id = ?", [edu_name, degree_level, degree_name, gpa, description, img.substring(12), edu_id], function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
  });
});



module.exports = router;