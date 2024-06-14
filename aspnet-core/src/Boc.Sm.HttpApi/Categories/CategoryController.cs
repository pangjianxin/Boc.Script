using System;
using Boc.Sm.Categories.Dtos;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Microsoft.AspNetCore.Authorization;
using Boc.Sm.Permissions;

namespace Boc.Sm.Categories;

[RemoteService(Name = "Default")]
[Route("/api/app/category")]
[Authorize]
public class CategoryController : SmController, ICategoryAppService
{
    private readonly ICategoryAppService _service;

    public CategoryController(ICategoryAppService service)
    {
        _service = service;
    }

    [HttpPost]
    [Route("")]
    [Authorize(SmPermissions.Category.Create)]
    public virtual Task<CategoryDto> CreateAsync(CreateCategoryDto input)
    {
        return _service.CreateAsync(input);
    }

    [HttpPut]
    [Route("{id}")]
    [Authorize(SmPermissions.Category.Update)]
    public virtual Task<CategoryDto> UpdateAsync(Guid id, UpdateCategoryDto input)
    {
        return _service.UpdateAsync(id, input);
    }

    [HttpDelete]
    [Route("{id}")]
    [Authorize(SmPermissions.Category.Delete)]
    public virtual Task DeleteAsync(Guid id)
    {
        return _service.DeleteAsync(id);
    }

    [HttpGet]
    [Route("{id}")]
    [Authorize(SmPermissions.Category.Default)]
    public virtual Task<CategoryDto> GetAsync(Guid id)
    {
        return _service.GetAsync(id);
    }

    [HttpGet]
    [Route("")]
    [Authorize(SmPermissions.Category.Default)]
    public virtual Task<PagedResultDto<CategoryDto>> GetListAsync(CategoryGetListInput input)
    {
        return _service.GetListAsync(input);
    }
}