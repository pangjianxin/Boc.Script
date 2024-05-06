using Volo.Abp.Modularity;

namespace Boc.Sm;

/* Inherit from this class for your domain layer tests. */
public abstract class SmDomainTestBase<TStartupModule> : SmTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
