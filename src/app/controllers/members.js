const utils = require("../../lib/utils");

module.exports = {
  index(req, res) {
    return res.render("members/index", {});
  },
  create(req, res) {
    return res.render("members/create");
  },
  post(req, res) {
    // data validation - ckeck if all fields are not null
    const keys = Object.keys(req.body); // contructor - função que cria objeto
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send(`Por favor, preencha todos os campos. O campo ${key} está vazio.`);
      }
    }
    return
  },
  show(req, res) {

    return
  },
  edit(req, res) {
    return
  },
  put(req, res) {
    // data validation - ckeck if all fields are not null
    const keys = Object.keys(req.body); // contructor - função que cria objeto
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send(`Por favor, preencha todos os campos. O campo ${key} está vazio.`);
      }
    }

    let {
      avatar_url,
      name,
      birth,
      gender,
      services
    } = req.body;

    return
  },
  delete(req, res) {
    return
  }
}
