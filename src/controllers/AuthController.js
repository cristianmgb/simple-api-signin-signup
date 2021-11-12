import { v4 as uuidv4 } from "uuid";
import db from "../database/db.js";

async function signup(req, res) {
  const { auths } = db.data;
  const { email, password, name, cellphone } = req.body;
  if (auths.length > 0) {
    auths.map(async (auth) => {
      if (auth.email === email) {
        res
          .status(400)
          .send({ status: "ERROR", message: "Email already exists" });
      } else {
        const id = uuidv4();
        auths.push({ id, email, password, name, cellphone });
        // Write db.data content to db.json
        await db.write();

        res.status(200).send({
          data: { id, email, name, cellphone },
          message: "User created successfully",
          status: "OK",
        });
      }
    });
  } else {
    const id = uuidv4();
    auths.push({ id, email, password, name, cellphone });

    // Write db.data content to db.json
    await db.write();

    res.status(200).send({
      data: { id, email, name, cellphone },
      message: "User created successfully",
      status: "OK",
    });
  }
}

async function signin(req, res) {
  const { auths } = db.data;
  if (auths.length > 0) {
    auths.map(async (auth) => {
      if (
        auth.email === req.body.email &&
        auth.password === req.body.password
      ) {
        res.status(200).send({
          data: {
            id: auth.id,
            email: auth.email,
            name: auth.name,
            cellphone: auth.cellphone,
          },
          message: "User logged successfully",
          status: "OK",
        });
      } else {
        res
          .status(400)
          .send({ status: "ERROR", message: "Invalid email or password" });
      }
    });
  } else {
    res
      .status(400)
      .send({ status: "ERROR", message: "Invalid email or password." });
  }
}

export { signup, signin };
