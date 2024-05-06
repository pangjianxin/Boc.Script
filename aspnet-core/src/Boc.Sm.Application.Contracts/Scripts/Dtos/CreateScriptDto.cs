using System;

namespace Boc.Sm.Scripts.Dtos
{
    public class CreateScriptDto
    {
        public string Title { get; set; } = default!;
        public string? Description { get; set; }
        public string Content { get; set; } = default!;
        public Guid? CategoryId { get; set; }
    }
}
