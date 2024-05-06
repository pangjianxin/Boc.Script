using AutoFilterer.Attributes;
using AutoFilterer.Enums;
using AutoFilterer.Types;
using System;
using Volo.Abp.Application.Dtos;

namespace Boc.Sm.Categories.Dtos;

[Serializable]
public class CategoryGetListInput : FilterBase, IPagedAndSortedResultRequest
{
    [CompareTo(nameof(CategoryDto.Title))]
    [StringFilterOptions(StringFilterOption.Contains)]
    public string? Filter { get; set; }
    public int SkipCount { get; set; }
    public int MaxResultCount { get; set; }
    public string? Sorting { get; set; }
}