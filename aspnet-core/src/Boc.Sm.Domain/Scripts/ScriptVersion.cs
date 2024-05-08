using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace Boc.Sm.Scripts
{
    public class ScriptVersion : AuditedEntity<Guid>
    {
        public Guid ScriptId { get; set; }
        public string Content { get; set; } = default!;
    }
}
