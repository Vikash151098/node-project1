const mongoose=require('mongoose');
module.exports=function(){
const connStr='mongodb://project1:12345@cluster0-shard-00-00-lhvtt.azure.mongodb.net:27017,cluster0-shard-00-01-lhvtt.azure.mongodb.net:27017,cluster0-shard-00-02-lhvtt.azure.mongodb.net:27017/node-project1?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(connStr,{
    useNewUrlParser:true })
    .then(() => console.log('connecting to MongoDB...'))
    .catch(err => console.log('could not connect MongoDB..', err));
}