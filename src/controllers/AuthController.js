import { v4 as uuidv4 } from "uuid";
import { storeData, getData } from "../database/db.js";

async function signup(req, res) {
  const auths = getData();
  const { email, password, name, cellphone } = req.body;
  if (auths) {
    const result = auths.find((auth) => auth.email === email);
    if (result) {
      res
        .status(400)
        .send({ status: "ERROR", message: "Email already exists" });
    } else {
      const id = uuidv4();
      const newAuth = [...auths];
      newAuth.push({ id, email, password, name, cellphone });

      storeData(newAuth);

      res.status(200).send({
        data: { id, email, name, cellphone },
        message: "User created successfully",
        status: "OK",
      });
    }
  } else {
    const id = uuidv4();
    const newAuth = [];
    newAuth.push({ id, email, password, name, cellphone });

    storeData(newAuth);

    res.status(200).send({
      data: { id, email, name, cellphone },
      message: "User created successfully",
      status: "OK",
    });
  }
}

async function signin(req, res) {
  const auths = getData();

  if (auths) {
    const result = auths.find(
      (auth) =>
        auth.email === req.body.email && auth.password === req.body.password
    );
    if (result) {
      res.status(200).send({
        data: {
          id: result.id,
          email: result.email,
          name: result.name,
          cellphone: result.cellphone,
        },
        message: "User logged successfully",
        status: "OK",
      });
    } else {
      res
        .status(400)
        .send({ status: "ERROR", message: "Invalid email or password" });
    }
  } else {
    res
      .status(400)
      .send({ status: "ERROR", message: "Invalid email or password." });
  }
}

export { signup, signin };
