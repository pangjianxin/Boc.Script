using Volo.Abp.Modularity;

namespace Boc.Sm;

public abstract class SmApplicationTestBase<TStartupModule> : SmTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
