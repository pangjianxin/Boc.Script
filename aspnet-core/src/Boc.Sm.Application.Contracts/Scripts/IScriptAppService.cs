using Boc.Sm.Scripts.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace Boc.Sm.Scripts
{
    public interface IScriptAppService : ICrudAppService<ScriptDto, Guid, ScriptGetListInput, CreateScriptDto, UpdateScriptDto>
    {
    }
}
