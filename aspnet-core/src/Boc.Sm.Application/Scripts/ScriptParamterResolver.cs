using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace Boc.Sm.Scripts
{
    public class ScriptParamterResolver : IScriptParamterResolver
    {
        public List<string> ResoleveParameter(string script, string pattern = @"\{(.*?)\}")
        {
            var matches = Regex.Matches(script, pattern);

            return matches.Select(it => it.Groups[1].Value).ToList();
        }

        public string Resolve(string script, Dictionary<string, string>? parameters, string pattern = @"\{(.*?)\}")
        {
            // 使用MatchEvaluator委托来处理每个匹配项
            var result = Regex.Replace(script, pattern, match =>
            {
                var paramName = match.Groups[1].Value; // 获取参数名称
                if (parameters?.TryGetValue(paramName, out var value) == true)
                {
                    return value; // 如果参数存在于字典中，则返回对应的值
                }
                return match.Value; // 如果参数不存在，返回原始匹配项（包括大括号）
            }, RegexOptions.IgnoreCase);

            return result;
        }
    }
}
