const { ordenarAscendente, ordenarDescendente } = require('../operaciones/operaciones.js');

function ascendente(req, res) {
  const { numbers, checked } = req.body;
  const result = ordenarAscendente(numbers, checked);
  res.json({
    resultado: result
  });
}

function descendente(req, res) {
  const { numbers, checked } = req.body;
  const result = ordenarDescendente(numbers, checked);
  res.json({
    resultado: result
  });
}

module.exports = {
  ascendente,
  descendente
};
