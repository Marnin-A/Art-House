const { createUser } = require("../models/usermodel");

async function createNewAdmin(req, res, next) {
  try {
    if (req.body === "") {
      res.status(401).send("Empty request");
    }
    const { name, email, password, role } = req.body;

    const result = await createUser(name, email, password, role);

    return res
      .status(201)
      .json({ message: "User Successfully Created", user: result.rows[0] });
  } catch (error) {
    console.error("Error Creating User:", error);
    res.status(500).send({ message: "Internal Server Error", error: error });
  }
}
module.exports = { createNewAdmin };
