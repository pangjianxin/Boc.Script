using Boc.Sm.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace Boc.Sm.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(SmEntityFrameworkCoreModule),
    typeof(SmApplicationContractsModule)
    )]
public class SmDbMigratorModule : AbpModule
{
}
