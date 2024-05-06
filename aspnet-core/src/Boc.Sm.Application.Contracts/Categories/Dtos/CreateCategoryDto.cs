using System;

namespace Boc.Sm.Categories.Dtos;

[Serializable]
public class CreateCategoryDto
{
    public Guid? ParentId { get; set; }

    public string Title { get; set; } = default!;
}