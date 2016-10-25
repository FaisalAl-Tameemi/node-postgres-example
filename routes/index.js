'use strict';

const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get('/', (req, res, next) => {
    db.query(`SELECT s.ticker, s.sector FROM symbols as s;`, (err, results) => {
      if(err){
        console.log(err.text);
        return res.status(500).send(err.text);
      }
      return res.json(results.rows);
    });
    return false;
  });

  router.get('/sectors', (req, res, next) => {
    db.query(`
      SELECT s.sector, COUNT(s.ticker) as count
      FROM symbols as s
      GROUP BY s.sector
      ORDER BY COUNT(s.ticker) DESC;
    `, (err, results) => {
      if(err){
        console.log(err.text);
        return res.status(500).send(err.text);
      }
      return res.json(results.rows);
    });
    return false;
  });

  router.get('/price-averages', (req, res, next) => {
    db.query(`
      SELECT s.ticker, s.name, s.sector, AVG(p.adj_close) as avg_price
      FROM symbols as s
      JOIN prices as p
      ON s.id = p.symbol_id
      GROUP BY s.ticker, s.name, s.sector
      ORDER BY avg_price DESC;
    `, (err, results) => {
      if(err){
        console.log(err.text);
        return res.status(500).send(err.text);
      }
      return res.json(results.rows);
    });
    return false;
  });

  return router;
};
