using AutoFilterer.Extensions;
using Boc.Sm.Categories.Dtos;
using System;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace Boc.Sm.Categories;


public class CategoryAppService : CrudAppService<Category, CategoryDto, Guid, CategoryGetListInput, CreateCategoryDto, UpdateCategoryDto>,
    ICategoryAppService
{

    public CategoryAppService(ICategoryRepository repository) : base(repository)
    {
    }

    public override async Task<CategoryDto> CreateAsync(CreateCategoryDto input)
    {
        var entity = new Category(GuidGenerator.Create(), input.ParentId, input.Title);
        await Repository.InsertAsync(entity);
        return await MapToGetOutputDtoAsync(entity);
    }

    public override async Task<CategoryDto> UpdateAsync(Guid id, UpdateCategoryDto input)
    {
        Category entity = await Repository.GetAsync(id);

        entity.Update(title: input.Title);

        await Repository.UpdateAsync(entity);

        return await MapToGetOutputDtoAsync(entity);
    }

    protected override async Task<IQueryable<Category>> CreateFilteredQueryAsync(CategoryGetListInput input)
    {
        // TODO: AbpHelper generated
        return (await base.CreateFilteredQueryAsync(input)).ApplyFilter(input);
    }
}
