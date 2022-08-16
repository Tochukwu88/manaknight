const app = require("express").Router();
const db = require("../../models");
let SessionService = require("../../services/SessionService");
const role = 1;

app.get(
  "/admin/api/terminate",

  async function (req, res, next) {
    const config = await db.terminateconfig.findOne({});
    return res.status(201).json({ success: true, data: config.dataValues });
  }
);
app.get(
  "/admin/terminate",
  SessionService.verifySessionMiddleware(role, "admin"),
  async function (req, res, next) {
    if (req.session.csrf === undefined) {
      req.session.csrf = SessionService.randomString(100);
    }

    const terminateAdminAddViewModel = require("../../view_models/terminate_configuration_edit_view_model.js");

    const viewModel = new terminateAdminAddViewModel(
      db.terminateconfig,
      "Add config",
      "",
      "",
      "/admin/terminate"
    );

    res.render("admin/Add_terminate_config", viewModel);
  }
);
app.post(
  "/admin/terminate",
  SessionService.verifySessionMiddleware(role, "admin"),

  async function (req, res, next) {
    if (req.session.csrf === undefined) {
      req.session.csrf = SessionService.randomString(100);
    }

    let { counter, message } = req.body;
    console.log(counter, message);
    try {
      const config = await db.terminateconfig.findOne({});

      let data;
      if (!config) {
        data = await db.terminateconfig.create({ counter, message });
      } else {
        data = await db.terminateconfig.update(
          { counter, message },
          {
            where: {
              id: config.dataValues.id,
            },
          }
        );
      }
      console.log(data);
      if (!data) {
      }

      req.flash("success", "configuration added successfully ");

      return res.redirect("/admin/terminate");
    } catch (error) {
      console.error(error);
    }
  }
);
module.exports = app;
