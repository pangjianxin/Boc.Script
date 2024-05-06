using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace Boc.Sm.Scripts
{
    public class ScriptParamterResolver : IScriptParamterResolver
    {
        public List<string> Resolve(string script, string pattern = @"\{(.*?)\}")
        {
            var matches = Regex.Matches(script, pattern);

            return matches.Select(it => it.Groups[1].Value).ToList();
        }
    }
}
