using Volo.Abp.Modularity;

namespace Boc.Sm;

[DependsOn(
    typeof(SmApplicationModule),
    typeof(SmDomainTestModule)
)]
public class SmApplicationTestModule : AbpModule
{

}
