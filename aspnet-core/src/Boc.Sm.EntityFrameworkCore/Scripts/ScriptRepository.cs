using Boc.Sm.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace Boc.Sm.Scripts
{
    public class ScriptRepository : EfCoreRepository<SmDbContext, Script, Guid>, IScriptRepository
    {
        public ScriptRepository(IDbContextProvider<SmDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }
        public override async Task<IQueryable<Script>> WithDetailsAsync()
        {
            return (await GetQueryableAsync()).IncludeDetails();
        }
    }
}
