using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace Boc.Sm.Data;

/* This is used if database provider does't define
 * ISmDbSchemaMigrator implementation.
 */
public class NullSmDbSchemaMigrator : ISmDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
