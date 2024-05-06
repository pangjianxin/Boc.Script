using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;

namespace Boc.Sm.Categories.Dtos;

[Serializable]
public class CategoryDto : AuditedEntityDto<Guid>
{
    public Guid? ParentId { get; set; }

    public string Title { get; set; } = default!;
}