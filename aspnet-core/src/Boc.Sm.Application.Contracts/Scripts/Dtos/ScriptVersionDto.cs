using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace Boc.Sm.Scripts.Dtos
{
    public class ScriptVersionDto : AuditedEntityDto<Guid>
    {
        public Guid ScriptId { get; set; }
        public string Content { get; set; } = default!;
    }
}
