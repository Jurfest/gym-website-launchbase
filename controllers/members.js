const fs = require('fs');
const data = require("../data.json");
const utils = require("../utils");

exports.index = function (req, res) {

  return res.render("members/index", { members: data.members });
}

exports.create = function (req, res) {
  return res.render("members/create");
}

exports.post = function (req, res) {

  // data validation - ckeck if all fields are not null
  const keys = Object.keys(req.body); // contructor - função que cria objeto
  for (key of keys) {
    if (req.body[key] == "") {
      return res.send(`Por favor, preencha todos os campos. O campo ${key} está vazio.`);
    }
  }

  const birth = Date.parse(req.body.birth);

  let id = 1;
  const lastMember = data.members[data.members.length - 1];
  if(lastMember) {
    id = lastMember.id + 1;
  }

  data.members.push({
    id,
    ...req.body,
    birth
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("write file error");
    return res.redirect("/members")
  });
}

exports.show = function(req, res) {
  const { id } = req.params;

  // const foundmember = data.members.find(function(member) {
  //   return member.id == id;
  // });

  const foundmember = data.members.find(member => member.id == id);

  if (!foundmember) return res.send("member not found.");

  const member = {
    ...foundmember, // spread operator
    birth: utils.date(foundmember.birth).birthDay,
  }

  return res.render("members/show", { member });
}

// edit (apenas passa dados para a pagina para editar)
exports.edit = function (req, res) {
  const { id } = req.params;

  const foundmember = data.members.find(function (member) {
    return member.id == id;
  });

  if (!foundmember) return res.send("member not found.");

  const member = {
    ...foundmember,
    birth: utils.date(foundmember.birth).iso
  }

  return res.render("members/edit", { member });
}

// put (salva no backend)
exports.put = function (req, res) {
  const { id } = req.body;

  let index = 0;
  const foundmember = data.members.find(function (member, foundIndex) {
    if (id == member.id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundmember) return res.send("member not found.");

  const member = {
    id: Number(req.body.id),
    ...foundmember,
    ...req.body,
    birth: Date.parse(req.body.birth)
  }

  data.members[index] = member;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("rewrite file error");
    
    return res.redirect(`/members/${id}`);
  });

}

exports.delete = function (req, res) {
  const { id } = req.body;

  const filteredMembers = data.members.filter(function(member) {
    return member.id != id;
  });

  data.members = filteredMembers;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("update file without member to be deleted error");

    return res.redirect(`/members`);
  });

}
