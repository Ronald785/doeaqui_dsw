const client = require("../../config/dbConnection");
const ObjectId = require('mongodb').ObjectId;

const readCenter = async (idCenter) => {
    try {
        const center = await client.db("dsw").collection("centers").findOne({
            _id: new ObjectId(idCenter)
        });
        return center;
    } catch (err) {
        console.error("Erro lendo o centro: ", err);
    }
}

const readCenterInventory = async (idCenter) => {
    try {
        const inventory = await client.db("dsw").collection("inventory").findOne({idCenter});
        console.log("Centro Criado");
        return inventory;
    } catch (err) {
        console.error("Erro lendo o centro: ", err);
    }
}

const createCenter = async (dataCenter) => {
    try {
        const center = await client.db("dsw").collection("centers").insertOne(dataCenter);
        return center.insertedId;
    } catch (err) {
        console.error("Erro salvando o centro: ", err);
    }
}

const updateCenter = async (dataCenter, idCenter) => {
    try {
        const center = await client.db("dsw").collection("centers").updateOne(
            { _id: new ObjectId(idCenter) },
            {$set: {
                name: dataCenter.name, 
                about: dataCenter.about, 
                email: dataCenter.email,
                site: dataCenter.site,
                whatsapp: dataCenter.whatsapp,
                location: dataCenter.location,
                photo: dataCenter.photo,
                open_hours: dataCenter.open_hours,
                open_weekends: dataCenter.open_weekends,
                instructions: dataCenter.instructions,
                donation: dataCenter.donation,
                user_email: dataCenter.user_email
                }
            }
        );
        console.log("Centro atualizado");
        return;
    } catch (err) {
        console.error(`Erro atualizando o centro: ${idCenter}`, err);
    }
}

const updateCenterInventory = async (data, idCenter) => {
    try {
        const inventory = await client.db("dsw").collection("inventory").updateOne(
            { idCenter: idCenter },
            {$set: {
                idCenter: idCenter, 
                data: data, 
                }
            }
        );
        console.log("Inventário atualizado");
        return;
    } catch (err) {
        console.error(`Erro atualizando o inventário do centro: ${idCenter}`, err);
    }
}

const createCenterInventory = async (data) => {
    try {
        const inventory = await client.db("dsw").collection("inventory").insertOne(data);
        console.log("Inventário craido");
        return inventory.insertedId;
    } catch (err) {
        console.error("Erro salvando o inventário: ", err);
    }
}

const deleteCenter = async (idCenter) => {
    try {
        const center = await client.db("dsw").collection("centers").deleteOne({
            _id: new ObjectId(idCenter) 
        });
        console.log(`Centro deletado: ${idCenter}`);
        return;
    } catch (err) {
        console.error(`Erro deletando o centro: ${idCenter}`, err);
    }
}

const deleteCenterInventory = async (idCenter) => {
    try {
        const inventory = await client.db("dsw").collection("inventory").deleteOne({
            idCenter: idCenter
        });
        console.log(`Inventory deletado: ${idCenter}`);
        return;
    } catch (err) {
        console.error(`Erro deletando o centro: ${idCenter}`, err);
    }
}

module.exports = {
    readCenter,
    createCenter,
    createCenterInventory,
    readCenterInventory,
    updateCenter,
    updateCenterInventory,
    deleteCenter
};