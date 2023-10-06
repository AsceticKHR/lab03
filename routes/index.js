var express = require('express');
var router = express.Router();
const { connectToDB, ObjectId } = require('../utils/db');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Expresso' });
});

module.exports = router;
/* Handle the Form */
router.post('/bookings', async function (req, res) {
    const db = await connectToDB();
    try {
        req.body.numTickets = parseInt(req.body.numTickets);
        let result = await db.collection("bookings").insertOne(req.body);
        res.status(201).json({ id: result.insertedId });
    } catch (err) {
        res.status(400).json({ message: err.message });
    } finally {
        await db.client.close();
    }
});


/* Display all Bookings */
router.get('/bookings', async function (req, res) {
    const db = await connectToDB();
    try {
        let results = await db.collection("bookings").find().toArray();
        res.render('bookings', { bookings: results });
    } catch (err) {
        res.status(400).json({ message: err.message });
    } finally {
        await db.client.close();
    }
});

router.get('/bookings/paginate', async function (req, res) {
    const db = await connectToDB();
    try {
      let page = parseInt(req.query.page) || 1;
      let perPage = parseInt(req.query.perPage) || 10;
      let skip = (page - 1) * perPage;
  
      let result = await db.collection("bookings").find().skip(skip).limit(perPage).toArray();
      let total = await db.collection("bookings").countDocuments();
  
      res.render('bookings', { bookings: result, total: total, page: page, perPage: perPage });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
    finally {
      await db.client.close();
    }
  });



