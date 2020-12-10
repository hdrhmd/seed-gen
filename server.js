const express = require('express');

const app = express();

app.use(express.static('./dist/seed-gen'));

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/seed-gen' }
  );
});

app.listen(process.env.PORT || 80);

console.log(`Running on port ${process.env.PORT || 80}`)
