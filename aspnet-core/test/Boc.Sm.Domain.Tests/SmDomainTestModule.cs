using Volo.Abp.Modularity;

namespace Boc.Sm;

[DependsOn(
    typeof(SmDomainModule),
    typeof(SmTestBaseModule)
)]
public class SmDomainTestModule : AbpModule
{

}
