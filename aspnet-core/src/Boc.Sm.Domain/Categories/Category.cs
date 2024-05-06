using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace Boc.Sm.Categories
{
    public class Category : AuditedAggregateRoot<Guid>
    {
        public Guid? ParentId { get; set; }
        public string Title { get; set; } = default!;

        protected Category()
        {
        }

        public Category(
            Guid id,
            Guid? parentId,
            string title
        ) : base(id)
        {
            ParentId = parentId;
            Title = title;
        }

        public void Update(string title)
        {
            Title = title;
        }
    }
}
