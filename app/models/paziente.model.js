module.exports = (sequelize, Sequelize) => {
	const paziente = sequelize.define("paziente", {
		cf: {
			type: Sequelize.STRING,
			//primaryKey: 1
		},
		nome: {
			type: Sequelize.STRING,
		},
		cognome: {
			type: Sequelize.STRING
		},
		indirizzo: {
			type: Sequelize.STRING
		},
		dataDiNascita: {
			type: Sequelize.STRING(12)
		},
		cittaDiNascita: {
			type: Sequelize.STRING(25)
		},
		email: {
			type: Sequelize.STRING
		},
		professione: {
			type: Sequelize.STRING
		},
		codiceFiscaleProfessionista: {
			type: Sequelize.STRING(17)
		},
		sesso: {
			type: Sequelize.STRING(1)
		},
		statoCivile: {
			type: Sequelize.STRING
		}

	});

	return paziente;
};