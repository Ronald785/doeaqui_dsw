const { auth } = require("../../config/firebase");
const client = require("../../config/dbConnection");

function infoUser() {
    const user = auth.currentUser;
    const email =  user.email;
    const name =  user.displayName;
    const image =  user.photoURL;

    return { email, name, image };
}

async function searchCenters() {
    try {
        const result = await client.db("dsw").collection("centers").find({
            user_email: auth.currentUser.email
        }).toArray();
        const centers = [];
        result.forEach((doc) => {
            const center = {};
            center["id"] = doc._id;
            center["name"] = doc.name;
            centers.push(center);
        });
        return centers;
    } catch (err) {
        console.error("Erro lendo o centro: ", err);
    }
}

module.exports = {
    infoUser,
    searchCenters
}