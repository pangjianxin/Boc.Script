using Boc.Sm.Scripts.Dtos;
using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace Boc.Sm.Scripts
{
    public class ScriptAppService : CrudAppService<Script, ScriptDto, Guid, ScriptGetListInput, CreateScriptDto, UpdateScriptDto>, IScriptAppService
    {
        private readonly IScriptParamterResolver _paramsResolver;

        public ScriptAppService(
            IScriptRepository repository,
            IScriptParamterResolver paramsResolver) : base(repository)
        {
            _paramsResolver = paramsResolver;
        }

        public override async Task<ScriptDto> CreateAsync(CreateScriptDto input)
        {
            var script = new Script(GuidGenerator.Create(), input.Title, input.Description, input.Content, input.CategoryId);

            await Repository.InsertAsync(script);

            return await MapToGetOutputDtoAsync(script);
        }
    }
}
