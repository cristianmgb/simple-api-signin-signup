import express, { urlencoded, json } from "express";
import cors from "cors";
import compression from 'compression';
import api from "./src/routers/routes.js";
const app = express();

app.use(cors());
app.use(compression())
app.use(urlencoded({ extended: false }))
app.use(json({limit: "300mb"}))
app.use('/api', api)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000");
});