using System.Threading.Tasks;

namespace Boc.Sm.Data;

public interface ISmDbSchemaMigrator
{
    Task MigrateAsync();
}
