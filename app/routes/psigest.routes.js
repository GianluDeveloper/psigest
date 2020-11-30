module.exports = app => {
    const paziente = require("../controllers/crud.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", paziente.create);
  
    router.get("/", paziente.findAll);
  
    router.get("/published", paziente.findAllPublished);
  
    router.get("/:cf", paziente.findOne);
  
    router.put("/:cf", paziente.update);
  
    router.delete("/:cf", paziente.delete);
  
    router.delete("/", paziente.deleteAll);
    app.use('/api/paziente', router);
  };