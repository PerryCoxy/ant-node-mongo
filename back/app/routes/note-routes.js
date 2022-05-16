// note_routes.js
module.exports = function(app, db) {
  app.post('/notes', (req, res) => {
    const note = {
      cardNumber: req.body.values.cardNumber,
      expirationDate: req.body.values.expirationDate,
      cvv: req.body.values.cvv,
      amount: req.body.values.amount,
    };
    db.collection('notes').insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};