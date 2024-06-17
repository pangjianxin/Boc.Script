using AutoFilterer.Extensions;
using Boc.Sm.Categories.Dtos;
using Boc.Sm.Scripts;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Boc.Sm.Categories;


public class CategoryAppService : CrudAppService<Category, CategoryDto, Guid, CategoryGetListInput, CreateCategoryDto, UpdateCategoryDto>,
    ICategoryAppService
{
    private readonly IScriptRepository _scriptRepository;
    private readonly ILogger<CategoryAppService> _logger;

    public CategoryAppService(
        ICategoryRepository repository,
        IScriptRepository scriptRepository,
        ILogger<CategoryAppService> logger) : base(repository)
    {
        _scriptRepository = scriptRepository;
        _logger = logger;
    }
    public async Task<CategoryDto?> FindAsync(Guid id)
    {
        var entity = await Repository.FindAsync(it => it.Id == id);
        if (entity == null)
        {
            return null;
        }
        return await MapToGetOutputDtoAsync(entity);
    }
    public override async Task<CategoryDto> CreateAsync(CreateCategoryDto input)
    {
        if (await Repository.AnyAsync(it => it.Title == input.Title))
        {
            throw new UserFriendlyException("已存在该名称的类别");
        }

        if (input.ParentId.HasValue)
        {
            var parent = await Repository.GetAsync(input.ParentId.Value);

            if (parent.Title == "回收站")
            {
                throw new UserFriendlyException("回收站类别不允许添加子类别");
            }
        }

        var entity = new Category(GuidGenerator.Create(), input.ParentId, input.Title);

        await Repository.InsertAsync(entity);

        return await MapToGetOutputDtoAsync(entity);
    }

    public override async Task DeleteAsync(Guid id)
    {
        var entity = await Repository.GetAsync(id);

        Logger.LogInformation("准备删除{title}的类别", entity.Title);

        //回收站不能删
        if (entity.Title == "回收站")
        {
            throw new UserFriendlyException("该类别不能删除");
        }

        //有子类别的不能删
        if (await Repository.AnyAsync(it => it.ParentId == id))
        {
            throw new UserFriendlyException("请先删除子类别");
        }

        //找出所有该类别关联的脚本，放入回收站
        var scripts = await _scriptRepository.GetListAsync(it => it.CategoryId == id);

        if (scripts != null && scripts.Count > 0)
        {
            var recycleBin = await Repository.FindAsync(it => it.Title == "回收站");

            if (recycleBin == null)
            {
                throw new UserFriendlyException("请先创建回收站的类别");
            }

            foreach (var script in scripts)
            {
                script.Update(recycleBin.Id);
            }

            await _scriptRepository.UpdateManyAsync(scripts);
        }

        await Repository.DeleteAsync(id);
    }

    public override async Task<CategoryDto> UpdateAsync(Guid id, UpdateCategoryDto input)
    {
        Category entity = await Repository.GetAsync(id);

        if (entity.Title == "回收站" && input.Title != entity.Title)
        {
            throw new UserFriendlyException("回收站类别不允许修改");
        }

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
