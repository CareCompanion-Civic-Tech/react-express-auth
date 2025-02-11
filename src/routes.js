const express = require("express");
const userController = require("./controllers/user");
const reviewController = require("./controllers/review");
const pageController = require("./controllers/pages");
const bookmarkController = require("./controllers/bookmark");
const addModels = require("./middleware/add-models");
const checkAuthentication = require("./middleware/check-authentication");

const Router = express.Router();
Router.use(addModels);

Router.get("/users", userController.list);
Router.post("/users", userController.create);
Router.get("/users/:id", userController.show);
// We can use middleware slotted in between the route and the controller as well
Router.patch("/users/:id", checkAuthentication, userController.update);

Router.post("/login", userController.login);
Router.delete("/logout", userController.logout);
Router.get("/me", userController.showMe);

Router.get("/logged-in-secret", checkAuthentication, (req, res) => {
  res.send({ msg: "The secret is: there is no secret." });
});

// Reviews

Router.get("/reviews", reviewController.list);
Router.post("/reviews", reviewController.create);
Router.get("/reviews/:id", reviewController.show);
Router.get("reviews/:user_id", reviewController.show);
Router.delete("/reviews/:id", reviewController.destroy);
Router.patch("/reviews/:id", reviewController.update);

// Pages

Router.get("/pages", pageController.list);
Router.post("/pages", pageController.create);
Router.get("/pages/:id", pageController.show);
// Router.get("/pages/search", pageController.search);
Router.delete("/pages/:id", pageController.destroy);
Router.patch("/pages/:id", pageController.update);

// Bookmark

Router.get("/bookmark", bookmarkController.list);
Router.post("/bookmark", bookmarkController.create);
Router.get("/bookmark/:id", bookmarkController.show);
Router.delete("/bookmark/id", bookmarkController.destroy);

module.exports = Router;
