var mongoose = require("mongoose");

//SCHEMA SETUP

var releases = new mongoose.Schema({
    title: String,
    albums: [String], //Album _id's
    length: Number
});

var soloist = new mongoose.Schema({
   soloistname: String,
   timeonset: String,
   timeoffset: String,
   timetotal: String,
   checked: Boolean
   
});

var tracks = new mongoose.Schema({
    tracknumber: Number,
    side: String,
    tracktitle: String,
    composer: [String],
    compositiontype: String,
    key: String,
    soloists: [soloist],
    annotations: String,
    starred: Boolean,
    youtubeurl: String
});

var albumSchema = new mongoose.Schema({
    //release: {
    //    id: String,
    //    status: String,
    //artists: [
    //    {
    //        id: String,
    //        name: String,
    //        anv: String,
    //        join: String,
    //        role: String,
    //        tracks: String
    //    }],
    //title: String,
    //labels: [
    //    {
    //        catno: String,
    //        id: String,
    //        name: String
    //    }

    //],
    //extraartists: [
    //    {
    //        id: String,
    //        name: String,
    //        anv: String,
    //        join: String,
    //        role: String,
    //        tracks: String
    //    }
    //],



    //},
    //genres: {
    //    genre: [String]
    //},
    //styles: {
    //    style: [String]
    //},
    //country: String,
    //released: String,
    //master_id: {
    //    is_main_release: String,
    //    text: String
    //}
},
    {collection: 'releases'});

module.exports = mongoose.model("Album", albumSchema);