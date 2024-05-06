using System.Linq;

namespace Boc.Sm.Scripts;

public static class ScriptEfCoreQueryableExtensions
{
    public static IQueryable<Script> IncludeDetails(this IQueryable<Script> queryable, bool include = true)
    {
        if (!include)
        {
            return queryable;
        }

        return queryable
            // .Include(x => x.xxx) // TODO: AbpHelper generated
            ;
    }
}
