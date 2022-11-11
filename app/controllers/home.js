const { readCenters } = require("../models/home");

//Home
module.exports.home = async (server, req, res) => {
    res.render("centers/index");
}

//Centers
module.exports.centers = async (server, req, res) => {
    let docs = await readCenters();
    let centers = {};

    docs.forEach((doc) => {
        centers[doc._id] = {};
        centers[doc._id].name = doc.name;
        centers[doc._id].location = doc.location;
        centers[doc._id].photo = doc.photo;
        centers[doc._id].donation = doc.donation;
    });

    res.send(centers);
}