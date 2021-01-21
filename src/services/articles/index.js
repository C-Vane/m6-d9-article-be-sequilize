const express = require("express");
const Articles = require("../../db").Articles;
const ArticleCategory = require("../../db").ArticleCategory;
const Authors = require("../../db").Authors;
const Category = require("../../db").Category;
const { Op } = require("sequelize");
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Articles.findAll({
        include: [
          {
            model: Authors,
            where: req.query.author
              ? {
                  name: { [Op.iLike]: "%" + req.query.author + "%" },
                }
              : {},
            attributes: { exclude: ["email", "password", "createdAt", "updatedAt"] },
          },
        ],
        where: req.query.search
          ? {
              [Op.or]: [
                { headline: { [Op.iLike]: "%" + req.query.search + "%" } },
                { subhead: { [Op.iLike]: "%" + req.query.search + "%" } },
                { content: { [Op.iLike]: "%" + req.query.search + "%" } },
              ],
            }
          : {},
        attributes: { exclude: ["authorId"] },
        offset: parseInt(req.query.offset) | 0,
        limit: parseInt(req.query.limit) | 10,
      });
      res.send(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newElement = await Articles.create(req.body);
      res.send(newElement);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const data = await Articles.findByPk(req.params.id);
      res.send(data);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      const updatedData = await Articles.update(req.body, {
        returning: true,
        plain: true,
        where: {
          _id: req.params.id,
        },
      });
      res.send(updatedData[1]);
    } catch (e) {
      console.log(e);
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      Articles.destroy({ where: { _id: req.params.id } }).then((rowsDeleted) => {
        if (rowsDeleted > 0) res.send("Deleted");
        else res.send("no match");
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  });

module.exports = router;
