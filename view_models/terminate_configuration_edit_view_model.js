"use strict";

/*Powered By: Manaknightdigital Inc. https://manaknightdigital.com/ Year: 2021*/
/**
 * Users Add View Model
 *
 * @copyright 2021 Manaknightdigital Inc.
 * @link https://manaknightdigital.com
 * @license Proprietary Software licensing
 * @author Ryan Wong
 */

const db = require("../models");
let AuthService = require("../services/AuthService");

module.exports = function (
  entity,
  pageName = "",
  success,
  error,
  base_url = ""
) {
  this._entity = entity;
  this.session = null;

  this.success = success || null;
  this.error = error || null;

  this._base_url = base_url;

  this.get_page_name = () => pageName;

  this.endpoint = "/admin/terminate";

  this.heading = "Edit congifguration";

  this.action = "/admin/terminate-add";

  this.form_fields = { message: "", counter: "" };

  this.status_mapping = function () {
    return this._entity.status_mapping();
  };

  return this;
};
