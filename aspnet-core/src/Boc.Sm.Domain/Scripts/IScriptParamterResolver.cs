using System.Collections.Generic;
using Volo.Abp.DependencyInjection;

namespace Boc.Sm.Scripts
{
    public interface IScriptParamterResolver : ITransientDependency
    {
        List<string> Resolve(string script, string pattern);
    }
}
