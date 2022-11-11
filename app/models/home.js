const { db } = require("../../config/firebase");
const client = require("../../config/dbConnection");

const { collection, getDocs, query, where } = require("firebase/firestore");

const readCenters = async () => {
    try {
        const centers = await client.db("dsw").collection("centers").find({}).toArray();
        return centers;
    } catch (err) {
        console.error("Erro lendo o centro: ", err);
    }
}

const searchCenters = async (firstParameter, secondParameter, condition) => {
    try {
        const match = query(collection(db, "centers"), where(firstParameter, condition, secondParameter));
        const centers = await getDocs(match);
        return centers;
    } catch (err) {
        console.error("Erro lendo o centro: ", err);
    }
}

module.exports = {
    readCenters,
    searchCenters
};