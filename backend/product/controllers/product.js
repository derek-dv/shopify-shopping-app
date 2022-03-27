import { body } from "express-validator";

export const validate = (method = "createProduct") => {
  switch (method) {
    case "createProduct": {
      return [
        body("name", `name doesn't exists`).exists(),
        body("category", "email doesn't exists").exists(),
        body("countInStock", `countInStock doesn't exists`).exists(),
        body("brand").optional().isIn(["enabled", "disabled"]),
        body("description", `description doesn't exists`).exists(),
        body("authorId", `authorId doesn't exists`).exists(),
      ];
    }
  }
};
