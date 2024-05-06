namespace Boc.Sm.Scripts.Dtos
{
    public class UpdateScriptDto
    {
        public string Title { get; set; } = default!;
        public string? Description { get; set; }
        public string Content { get; set; } = default!;
    }
}
