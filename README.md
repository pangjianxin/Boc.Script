# Boc.Script
数据库脚本管理系统
docker build -t wallee/boc/sm:latest -f src/Boc.Sm.HttpApi.Host/Dockerfile .

docker run -d -p 21442:80 --name sm -v $HOME/logs/sm:/app/Logs wallee/boc/sm:latest
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