using System;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace Boc.Sm.Categories;

public interface ICategoryRepository : IRepository<Category, Guid>
{
    
}
