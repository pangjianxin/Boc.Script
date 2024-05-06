using System;
using Boc.Sm.Categories.Dtos;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Volo.Abp;
using Volo.Abp.Application.Dtos;

namespace Boc.Sm.Categories;

[RemoteService(Name = "Default")]
[Route("/api/app/category")]
public class CategoryController : SmController, ICategoryAppService
{
    private readonly ICategoryAppService _service;

    public CategoryController(ICategoryAppService service)
    {
        _service = service;
    }

    [HttpPost]
    [Route("")]
    public virtual Task<CategoryDto> CreateAsync(CreateUpdateCategoryDto input)
    {
        return _service.CreateAsync(input);
    }

    [HttpPut]
    [Route("{id}")]
    public virtual Task<CategoryDto> UpdateAsync(Guid id, CreateUpdateCategoryDto input)
    {
        return _service.UpdateAsync(id, input);
    }

    [HttpDelete]
    [Route("{id}")]
    public virtual Task DeleteAsync(Guid id)
    {
        return _service.DeleteAsync(id);
    }

    [HttpGet]
    [Route("{id}")]
    public virtual Task<CategoryDto> GetAsync(Guid id)
    {
        return _service.GetAsync(id);
    }

    [HttpGet]
    [Route("")]
    public virtual Task<PagedResultDto<CategoryDto>> GetListAsync(CategoryGetListInput input)
    {
        return _service.GetListAsync(input);
    }
}