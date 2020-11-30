const db = require("../models");
const PAZIENTE = db.pazientes;
const Op = db.Sequelize.Op;

// crea e salva un nuovo paziente
exports.create = (req, res) => {

  if (!req.body.cf) {
    res.status(400).send({
      message: "cf deve essere indicato!"
    });
    return;
  }

  const paziente = {
      cf: req.body.cf,
      nome: req.body.nome,
      cognome: req.body.cognome,
      indirizzo: req.body.indirizzo,
      dataDiNascita: req.body.dataDiNascita,
      cittaDiNascita: req.body.cittaDiNascita,
      email: req.body.email,
      professione: req.body.professione,
      codiceFiscaleProfessionista: ' ',
      sesso: req.body.sesso,
      statoCivile: req.body.statoCivile
  };
  PAZIENTE.create(paziente)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Errore inserendo il paziente nel database."
    });
  });
};

// recupera tutti i pazienti
exports.findAll = (req, res) => {
    const codiceFiscale = req.query.cf;
    var condition = codiceFiscale ? { codiceFiscale: { [Op.like]: `%${codiceFiscale}%` } } : null;
  
    PAZIENTE.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
};

// recupera uno specifico paziente
exports.findOne = (req, res) => {
    exports.findOne = (req, res) => {
        const cf = req.params.cf;
      
        PAZIENTE.findByPk(cf)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message: "Errore recuperando il paziente=" + cf
            });
          });
      };
  
};

// aggiorna il pazinete
exports.update = (req, res) => {
    const cf = req.params.cf;

    PAZIENTE.update(req.body, {
      where: { cf: cf }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: `Il paziente ${nome} ${cognome} è stato aggiornato.`
          });
        } else {
          res.send({
            message: `Il paziente ${nome} ${cognome} non è stato aggiornato. Il corpo del messaggio è vuoto oppure non è stato trovato il paziente`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Errore aggiornando il paziente " + cf
        });
      });
};

// cancella uno specifico paziente
exports.delete = (req, res) => {
    const cf = req.params.cf;

  PAZIENTE.destroy({
    where: { cf: cf }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Il paziente è stato eliminato con successo"
        });
      } else {
        res.send({
          message: `Non posso eliminare il paziente ${nome} ${cognome}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "C'è un problema col database" + cf
      });
    });
};

// cancella tutti i pazienti
exports.deleteAll = (req, res) => {
    PAZIENTE.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} pazienti sono stati eliminati con successo!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Errore eliminando il paziente"
          });
        });
};

// trova tutti i pazienti pubblicati in base a una condizione
exports.findAllPublished = (req, res) => {
    PAZIENTE.findAll({ where: { published: 1 } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Errore nel recuperare i pazienti dal database."
      });
    });
};