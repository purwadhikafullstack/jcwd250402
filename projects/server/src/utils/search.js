const Sequelize = require("sequelize");

const { Property, Category } = require("../models");

function buildWhereClause({ gestCount, search, filterBy }) {
  const where = {};

  if (gestCount) {
    where.maxGuestCount = { [Sequelize.Op.gte]: gestCount };
  }

  if (search) {
    where[Sequelize.Op.or] = [
      { propertyName: { [Sequelize.Op.like]: `${search}` } },
      { description: { [Sequelize.Op.like]: `%${search}%` } },
    ];
  }

  if (filterBy) {
    Object.assign(where, filterBy);
  }

  return where;
}

function parseSort(sort) {
  if (sort) {
    const [field, direction] = sort.split(":");
    return [[field, direction]];
  }
  return [];
}

async function getPropertyIdsByType(propertyType) {
  const properties = await Property.findAll({
    include: [
      {
        model: Category,
        as: "Categories",
        where: { propertyType },
        attributes: [],
      },
    ],
    attributes: ["id"],
  });

  return properties.map((property) => property.id);
}

async function getPropertyIdsByCountry(country) {
  const properties = await Property.findAll({
    include: [
      {
        model: Category,
        as: "Categories",
        where: { country },
        attributes: [],
      },
    ],
    attributes: ["id"],
  });

  return properties.map((property) => property.id);
}

module.exports = {
  buildWhereClause,
  parseSort,
  getPropertyIdsByType,
  getPropertyIdsByCountry,
};
