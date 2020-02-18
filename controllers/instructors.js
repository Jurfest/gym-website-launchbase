const fs = require('fs');
const data = require("../data.json");
const utils = require("../utils");

// index
exports.index = function (req, res) {

  return res.render("instructors/index", { instructors: data.instructors });
}

// create
exports.create = function (req, res) {
  return res.render("instructors/create");
}

// post
exports.post = function (req, res) {

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

  birth = Date.parse(birth);
  const created_at = Date.now();
  const id = Number(data.instructors.length + 1);

  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at
  });


  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("write file error");
    return res.redirect("/instructors")
  });
}

// show
exports.show = function(req, res) {
  const { id } = req.params;

  // const foundInstructor = data.instructors.find(function(instructor) {
  //   return instructor.id == id;
  // });

  const foundInstructor = data.instructors.find(instructor => instructor.id == id);

  if (!foundInstructor) return res.send("Instructor not found.");

  const instructor = {
    ...foundInstructor, // spread operator
    age: utils.age(foundInstructor.birth),
    services: foundInstructor.services.split(','),
    created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at)
  }

  return res.render("instructors/show", { instructor });
}

// edit (apenas passa dados para a pagina para editar)
exports.edit = function (req, res) {
  const { id } = req.params;

  const foundInstructor = data.instructors.find(function (instructor) {
    return instructor.id == id;
  });

  if (!foundInstructor) return res.send("Instructor not found.");

  const instructor = {
    ...foundInstructor,
    birth: utils.date(foundInstructor.birth).iso
  }

  return res.render("instructors/edit", { instructor });
}

// put (salva no backend)
exports.put = function (req, res) {
  const { id } = req.body;

  let index = 0;
  const foundInstructor = data.instructors.find(function (instructor, foundIndex) {
    if (id == instructor.id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundInstructor) return res.send("Instructor not found.");

  const instructor = {
    ...foundInstructor,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  }

  data.instructors[index] = instructor;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("rewrite file error");
    
    return res.redirect(`/instructors/${id}`);
  });

}

// delete
exports.delete = function (req, res) {
  const { id } = req.body;

  const filteredInstructors = data.instructors.filter(function(instructor) {
    return instructor.id != id;
  });

  data.instructors = filteredInstructors;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("update file without instructor to be deleted error");

    return res.redirect(`/instructors`);
  });

}
