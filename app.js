require("dotenv").config();
require("./db");
const express = require("express");
const app = express();
require("./config")(app);



//////////////MAIN ROUTES///////////////

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const usersRoutes = require("./routes/users.routes");
app.use("/users", usersRoutes);

const productsRoutes = require("./routes/products.routes");
app.use("/products", productsRoutes);

const purchasesRoutes = require("./routes/purchases.routes");
app.use("/products/:productId/purchase", purchasesRoutes);


require("./error-handling")(app);

module.exports = app;
