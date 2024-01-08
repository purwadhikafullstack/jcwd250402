function sortParse(sort) {
  switch (sort) {
    case "price_asc":
      return [["price", "ASC"]];
    case "price_desc":
      return [["price", "DESC"]];
    case "date_created_asc":
      return [["createdAt", "ASC"]];
    case "date_created_desc":
      return [["createdAt", "DESC"]];
    case "rating_asc":
      // Add logic for sorting by rating if you have a rating field
      return [["rating", "ASC"]];
    case "rating_desc":
      // Add logic for sorting by rating if you have a rating field
      return [["rating", "DESC"]];
    default:
      return [["createdAt", "DESC"]]; // Default to sorting by date created
  }
}
