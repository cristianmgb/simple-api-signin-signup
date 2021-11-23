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
