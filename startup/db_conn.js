const mongoose=require('mongoose');
module.exports=function(){
const connStr='mongodb://vidlyuser:12345@cluster0-shard-00-00-onnex.mongodb.net:27017,cluster0-shard-00-01-onnex.mongodb.net:27017,cluster0-shard-00-02-onnex.mongodb.net:27017/login?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(connStr)
    .then(() => console.log('connecting to MongoDB...'))
    .catch(err => console.log('could not connect MongoDB..', err));
}