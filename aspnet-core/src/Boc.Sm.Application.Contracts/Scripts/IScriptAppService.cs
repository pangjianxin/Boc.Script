using Boc.Sm.Scripts.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Content;

namespace Boc.Sm.Scripts
{
    public interface IScriptAppService : ICrudAppService<ScriptDto, Guid, ScriptGetListInput, CreateScriptDto, UpdateScriptDto>
    {
        Task<IRemoteStreamContent> Download(Guid id, DownloadScriptDto input);
        Task<List<string>> ResolveParametersAsync(Guid id);
        Task<ScriptDto> UpdateCategoryAsync(Guid id, UpdateCategoryDto input);
    }
}
