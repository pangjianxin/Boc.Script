## 数据库脚本管理系统
该系统的主要功能是管理日常工作所需的脚本，脚本制作人可以通过上传脚本，其他人员输入参数-->生成脚本-->下载脚本-->使用脚本

### 数据库部署
系统采用SQLSERVER

```bash

```
```bash
docker build -t wallee/boc/sm:latest -f src/Boc.Sm.HttpApi.Host/Dockerfile .
```
docker build -t wallee/boc/sm:latest -f src/Boc.Sm.HttpApi.Host/Dockerfile .

docker run -d -p 21442:8080 --name sm -v $HOME/logs/sm:/app/Logs wallee/boc/sm:latest

`
using ConsoleApp4;
using System.Text.RegularExpressions;

var script = "select * from a where b={你好} and c={你不好}";


// 正则表达式匹配大括号内的内容
var pattern = @"\{(.*?)\}";
var matches = Regex.Matches(script, pattern);
var dic = new Dictionary<string, string>();
foreach (Match match in matches)
{
    dic.Add(match.Groups[1].Value, "123");
}

var result = ScriptParameterReplacer.ReplaceParameters(script, dic);

Console.WriteLine(result);
`
