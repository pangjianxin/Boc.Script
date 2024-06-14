using System;
using System.Collections.Generic;
using Volo.Abp.Domain.Entities.Auditing;

namespace Boc.Sm.Scripts
{
    /// <summary>
    /// 脚本
    /// </summary>
    public class Script(Guid id, string title, string? description, string content, Guid? categoryId) : AuditedAggregateRoot<Guid>(id)
    {
        public string Title { get; set; } = title;
        public string? Description { get; set; } = description;
        public string Content { get; set; } = content;
        public Guid? CategoryId { get; set; } = categoryId;
        public ICollection<ScriptVersion>? Versions { get; set; }

        public void Update(string title, string? description, string content)
        {
            Title = title;
            Description = description;
            if (Content != content)
            {
                Versions ??= [];
                Versions.Add(new ScriptVersion { Content = Content });
                Content = content;
            }
        }

        public void Update(Guid categoryId)
        {
            CategoryId = categoryId;
        }
    }
}
