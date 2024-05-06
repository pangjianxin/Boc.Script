using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace Boc.Sm.Scripts
{
    /// <summary>
    /// 脚本
    /// </summary>
    public class Script : AuditedAggregateRoot<Guid>
    {
        public Script(Guid id, string title, string? description, string content, Guid? categoryId) : base(id)
        {
            Title = title;
            Description = description;
            Content = content;
            CategoryId = categoryId;
        }

        public string Title { get; set; } = default!;
        public string? Description { get; set; }
        public string Content { get; set; } = default!;
        public Guid? CategoryId { get; set; }
    }
}
