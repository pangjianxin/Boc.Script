using System.Collections.Generic;
using Volo.Abp.DependencyInjection;

namespace Boc.Sm.Scripts
{
    public interface IScriptParamterResolver : ITransientDependency
    {
        List<string> ResoleveParameter(string script, string pattern = @"\{(.*?)\}");
        string Resolve(string script, Dictionary<string, string>? parameters, string pattern = "\\{(.*?)\\}");
    }
}
