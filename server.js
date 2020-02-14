var https = require('http');
var fs=require('fs');
var path=require('path')
var indexPath=path.resolve('./index.html')
var pdkk=path.resolve('./pdkk.plist')
var options = {
  key: fs.readFileSync('./941302_www.fuligou.fun.key'),
  cert: fs.readFileSync('./941302_www.fuligou.fun.pem')
};

https.createServer(options,function(req, res){
	if(req.url=='/'){
		 fs.readFile(indexPath,function(err,data){
        if(err){
            res.writeHeader(404,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
            res.end();
        }else{
            res.writeHeader(200,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write(data);//将index.html显示在客户端
            res.end();

        }
    })

	}else{
			res.statusCode = 200;
			res.setHeader('Content-Type','text/javascript;charset=UTF-8');
			fs.createReadStream(pdkk).pipe(res);
	}
}).listen(9876,()=>{
		console.log('服务器开启成功');
});

