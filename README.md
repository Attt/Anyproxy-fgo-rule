# Anyproxy-fgo-rule
用于劫持修改fgo战斗请求响应的规则文件，配合Anyproxy使用。

### 主要功能

​	在修改战斗响应数据增加100000hp

​	技能全改为10级

​	宝具等级全为5级

​	敌方从者血量1/3

​	敌方从者动作次数改为1

​	敌方从者充能6格



### 食用方法

##### 	安装*nodejs* 和 *anyproxy*

```shell
npm install -g anyproxy
```

##### 	生成根证书

```shell
anyproxy-ca
```

​	windows生成证书后，需打开crt证书文件安装

##### 	执行脚本

​	（默认脚本使用了8888和8889端口，如果被占用，请修改成空闲的端口）

- *windows下直接双击any-fgo.bat*


- *linux下执行*  

  ```shell
  bash any-fgo.sh
  ```

##### 下载证书

​	访问 http://${ip}:8889 , 扫码下载证书（如果修改了端口，请使用修改后的端口）

##### 设置代理


### 其他

​	**ext **中包含适用于fiddler的rule script，替换对应的function即可

---

Fuxk you CSDN 
1989年6月4日
