using System;
using Volo.Abp.Domain.Repositories;

namespace Boc.Sm.Scripts
{
    public interface IScriptRepository : IRepository<Script, Guid>
    {
    }
}
