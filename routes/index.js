var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
try{
  let root = process.env['PLAY_DIR']??path.join(process.cwd(),'public')

  let myFiles = loopForFile(root)
  for(let i=0;i<myFiles.length;i++){
    console.log('-------------------11---------')
    console.log(myFiles[i].replace(root,""))
    console.log('-------------------22---------')
    myFiles[i] = myFiles[i].replace(root,"")
  }
  console.log('----------------------------')
  console.log(root)
  console.log(myFiles)
  res.render('index', { title: 'Home Theater',myFile:myFiles });
}catch(e){
  console.log(e)
  res.send("ok")
}
  
  
});
function loopForFile(root){
  var rootBase = root
  var myDirs = fs.readdirSync(rootBase)
  var myArr = []
  myDirs.forEach((fileName)=>{
    console.log(fileName)
    var childStat = fs.statSync(path.join(rootBase,fileName))
    if(childStat.isDirectory()){
      myArr=myArr.concat(loopForFile(path.join(rootBase,fileName)))
    }else{
      if(fileName.endsWith("mp4")){
        myArr.push(path.join(rootBase,fileName))
      }
    }
  })
  console.log(myArr)
  return myArr
}

module.exports = router;
