using AutoFilterer.Attributes;
using AutoFilterer.Enums;
using AutoFilterer.Types;
using System;
using Volo.Abp.Application.Dtos;

namespace Boc.Sm.Scripts.Dtos
{
    public class ScriptGetListInput : FilterBase, IPagedAndSortedResultRequest
    {
        [CompareTo(nameof(ScriptDto.Title), nameof(ScriptDto.Description))]
        [StringFilterOptions(StringFilterOption.Contains)]
        public string? Filter { get; set; }

        [CompareTo(nameof(ScriptDto.CategoryId))]
        [OperatorComparison(OperatorType.Equal)]
        public Guid? CategoryId { get; set; }
        public int SkipCount { get; set; }
        public int MaxResultCount { get; set; }
        public string? Sorting { get; set; }
    }
}
