using System;
using Volo.Abp.Application.Dtos;

namespace Boc.Sm.Scripts.Dtos
{
    public class ScriptDto : AuditedEntityDto<Guid>
    {
        public string Title { get; set; } = default!;
        public string? Description { get; set; }
        public string Content { get; set; } = default!;
        public Guid? CategoryId { get; set; }
    }
}
