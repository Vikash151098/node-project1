const config=require('config');
module.exports=function()
{
if(!config.get('jwtPrivateKey'))
{
  console.error('FATAL ERROR: jwtPrivatekey is not defind.');
  process.exit(1);
}
}