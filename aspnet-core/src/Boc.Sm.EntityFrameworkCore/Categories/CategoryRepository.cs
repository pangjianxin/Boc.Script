using System;
using System.Linq;
using System.Threading.Tasks;
using Boc.Sm.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace Boc.Sm.Categories;

public class CategoryRepository : EfCoreRepository<SmDbContext, Category, Guid>, ICategoryRepository
{
    public CategoryRepository(IDbContextProvider<SmDbContext> dbContextProvider) : base(dbContextProvider)
    {
    }

    public override async Task<IQueryable<Category>> WithDetailsAsync()
    {
        return (await GetQueryableAsync()).IncludeDetails();
    }
}