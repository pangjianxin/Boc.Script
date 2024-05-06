using AutoFilterer.Extensions;
using Boc.Sm.Categories.Dtos;
using System;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace Boc.Sm.Categories;


public class CategoryAppService : CrudAppService<Category, CategoryDto, Guid, CategoryGetListInput, CreateUpdateCategoryDto, CreateUpdateCategoryDto>,
    ICategoryAppService
{

    private readonly ICategoryRepository _repository;

    public CategoryAppService(ICategoryRepository repository) : base(repository)
    {
        _repository = repository;
    }

    protected override async Task<IQueryable<Category>> CreateFilteredQueryAsync(CategoryGetListInput input)
    {
        // TODO: AbpHelper generated
        return (await base.CreateFilteredQueryAsync(input))
            .ApplyFilter(input)
            ;
    }
}
