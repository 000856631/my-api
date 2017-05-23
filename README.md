## 项目说明
这是一个基于express的node后端API服务，当时只是想抓取字幕组网站的下载资源，以备以后通过nas的方式去自动下载关注的美剧。
字幕组网站资源抓取原理：
    - 首先发送登录请求到目标登录地址，登录成功后会获取到cookies
    - 携带cookies访问收藏页面，通过cheerio抓取相应的关注信息
    - 使用 es6 的 async 函数 并发执行抓取每一个关注的信息（如果当关注条目很多的时候，并行效率可能会比较低，之后考虑限制并行数量）
豆瓣电影API
    - 只是做了一个简单的转发，并对返回的数据做了一个过滤，可以自定义过滤掉低于某个分数的电影
系统状态API
    - 引入了node的 os 模块，获取一些基础的系统状态数据

使用了es6 的 async 函数 处理异步数据
## 遇到的问题
关于请求库 axios 在以form-data的形式发送post请求登录的的时候，遇到了问题，就是登录不上“字幕组”网站。（类似的问题 在cnode的兄弟也遇到了，不过我就没人家厉害了[关于axios在node中的post使用](https://cnodejs.org/topic/57e17beac4ae8ff239776de5)）后来直接使用了 [superagent](http://visionmedia.github.io/superagent/)感觉用起来很舒畅

-----

以后增加的特性

* [] 添加mongo数据库支持，通过对比检测当前更新了哪一集，并将更新的加入数据库
* [] 添加其他资源抓取
* [] 限制查询资源时的并发数量
* [] 提供前端页面展示
* [] 集成到docker中，通过Nginx处理端口转发


为了隐去配置文件中的账号信息，使用default文件代替

## API说明
字幕组API
#### GET /api/v1/zmz/hot24  获取24小时下载热门数据
返回值示例
```
{
  "success": true,
  "dsc": "热门列表",
  "data": [
    {
      "title": "双峰",
      "type": "美剧",
      "url": "http://www.zimuzu.tv/resource/26514"
    },
    {
      "title": "绝命律师",
      "type": "美剧",
      "url": "http://www.zimuzu.tv/resource/33190"
    },
    ...
  ]
}
```
#### GET /api/v1/zmz/fav  获取关注列表
返回值示例
```
{
  "success": true,
  "dsc": "关注list",
  "data": [
    {
      "title": "【美剧】《绝命律师》",
      "url": "http://www.zimuzu.tv/resource/33190",
      "id": "33190"
    },
    ...
  ]
}
```
#### GET /api/v1/zmz/fav/detail  获取关注列表下载资源
返回值示例
```
{
  "success": true,
  "dsc": "关注资源下载列表",
  "data": [
    {
      "success": true
      "dsc": "美剧《绝命律师》第3季连载中资源下载列表",
      "data":[
        {
          "source_type": "HR-HDTV",
          "source_urls": [
            "season": "1",
            "episode": "1",
            "title": "绝命律师.Better.Call.Saul.S01E01.中英字幕.BD-HR.AAC.1024x576.x264.mp4",
            "load_arr": [
              ...
            ]
          ]
        }
      ]
    },
    ...
  ]
}
```
豆瓣电影-正在上映API
#### GET /api/v1/movie/cur  获取正在上映的电影
参数：
    - star 所需过滤的分数一下的电影（总分10分，默认为8分）
返回值示例
[同豆瓣API](https://developers.douban.com/wiki/?title=movie_v2)

系统状态API
#### GET /api/v1/sys  获取当前系统状态
返回值示例
```
{
  "success": true,
  "dsc": "系统状态",
  "data": {
    "arch": "x64",
    "cpu": [
      ...
    ],
    "totalmem": 8589934592,  # 内存总量
    "freemem": 741810176,    # 剩余内存
    "free_rate": "8.64",     # 内存剩余百分百
    "uptime": 47792          # 正常运行时间（单位s）
  }
}
```
