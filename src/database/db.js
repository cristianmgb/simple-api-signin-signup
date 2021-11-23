// import { join, dirname } from "path";
// import { Low, JSONFile } from "lowdb";
// import { fileURLToPath } from "url";

// const __dirname = dirname(fileURLToPath(import.meta.url));

// // Use JSON file for storage
// const file = join(__dirname, "db.json");
// const adapter = new JSONFile(file);
// const db = new Low(adapter);

// // Read data from JSON file, this will set db.data content
// await db.read();

// // If file.json doesn't exist, db.data will be null
// // Set default data
// db.data = {};
// if (!db.data.hasOwnProperty("auths")) {
//   db.data = { auths: [] };
// }

// export default db;

import { LocalStorage } from "node-localstorage";

const sotre = new LocalStorage("./scratch");

const storeData = (data) => {
  try {
    sotre.setItem("auth", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

const getData = () => {
  try {
    const data = sotre.getItem("auth");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

export { storeData, getData };
