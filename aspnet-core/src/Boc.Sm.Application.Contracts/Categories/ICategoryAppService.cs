using System;
using System.Threading.Tasks;
using Boc.Sm.Categories.Dtos;
using Volo.Abp.Application.Services;

namespace Boc.Sm.Categories;


public interface ICategoryAppService :
    ICrudAppService<
        CategoryDto,
        Guid,
        CategoryGetListInput,
        CreateCategoryDto,
        UpdateCategoryDto>
{
    Task<CategoryDto?> FindAsync(Guid id);
}