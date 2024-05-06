using System;

namespace Boc.Sm.Categories.Dtos;

[Serializable]
public class CreateUpdateCategoryDto
{
    public Guid? ParentId { get; set; }

    public string Title { get; set; } = default!;
}