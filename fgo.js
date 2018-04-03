/* 
  sample: 
    modify response data of http://httpbin.org/user-agent
  test:
    curl 'http://httpbin.org/user-agent' --proxy http://127.0.0.1:8001
  expected response:
    { "user-agent": "curl/7.43.0" } -- AnyProxy Hacked! --
	
	//modify
	修改FGO战斗数据
	劫持ac.php请求的响应数据
	在进入战斗时临时增加100000hp,技能全改为10级,宝具等级全为5级
	
	//todo
	修改master技能，修改礼装技能，魔改从者(risk)
*/

module.exports = { * beforeSendResponse(requestDetail, responseDetail) {
        // 带key=battlesetup，battleresume参数分别为新建战斗和战斗重开
        if ((requestDetail.url.indexOf('ac.php') != -1) && (requestDetail.requestData.indexOf('key=battlesetup') != -1 || requestDetail.requestData.indexOf('key=battleresume') != -1)) {
            const newResponse = responseDetail.response;
            var newbodyString = newResponse.body.toString();

            var dec = new Buffer(newbodyString.replace(/%3D/g, '='), 'base64').toString();
            var decJson = JSON.parse(dec);
            var svts = decJson['cache']['replaced']['battle'][0]['battleInfo']['userSvt'];
            //var count = 0;
            for (var i = 0; i < svts.length; i++) {
                if (svts[i]['status'] != undefined && svts[i]['userId'] != undefined && svts[i]['userId'] != '0' && svts[i]['userId'] != 0) {
                    // 原始数据中好友从者HP为string类型，需先转换为number
                    var ohp = Number(svts[i]['hp']);
                    hp = ohp + 100000;
                    if (typeof svts[i]['hp'] === 'number') {
                        svts[i]['hp'] = String(hp);
                    } else {
                        svts[i]['hp'] = hp;
                    }
                    svts[i]['skillLv1'] = '10';
                    svts[i]['skillLv2'] = '10';
                    svts[i]['skillLv3'] = '10';
                    svts[i]['treasureDeviceLv'] = '5';
                    //console.log('原始血量：'+ ohp + ' 新血量：' + svts[i]['hp']);
                    //count = i;
                }
            }
            decJson['cache']['replaced']['battle'][0]['battleInfo']['userSvt'] = svts;
            //console.log('改后JSON对象中血量：第'+ count +'个 ' + decJson['cache']['replaced']['battle'][0]['battleInfo']['userSvt'][count]['hp']);
            var encStr = JSON.stringify(decJson);

            /* 
		JSON.stringify(JSON.parse(?))组合拳会将内容进行两次转义
		以下操作将转义后的字符串还原回转义前，以防止客户端报错
	   */
            var preStr = '\\u';
            // 转换中文到unicode
            var cnReg = /[\u0391-\uFFE5]/gm;
            if (cnReg.test(encStr)) {
                var encStr = encStr.replace(cnReg,
                function(str) {
                    return preStr + str.charCodeAt(0).toString(16)
                });
            }
            // 转换转义字符
            encStr = encStr.replace(/\//g, '\\\/');
            // base64加密
            var enc = new Buffer(encStr).toString('base64');
            // 替换URI字符
            enc = enc.replace(/=/g, '%3D');
            // 重建buffer
            var b = new Buffer(enc);
            newResponse.body = b;
            return {
                response: newResponse
            };
        }
    },
};