﻿using AutoFilterer.Extensions;
using Boc.Sm.Authorizations;
using Boc.Sm.Permissions;
using Boc.Sm.Scripts.Dtos;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;
using Volo.Abp.Content;

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

        public async Task<List<string>> ResolveParametersAsync(Guid id)
        {
            var entity = await Repository.GetAsync(id);
            var result = _paramsResolver.ResoleveParameter(entity.Content);

            return result;
        }

        public override async Task DeleteAsync(Guid id)
        {
            var entity = await Repository.GetAsync(id);

            await CheckPermissionAsync(entity, SmPermissions.Script.Delete);

            await Repository.DeleteAsync(entity);
        }

        public async Task<IRemoteStreamContent> Download(Guid id, DownloadScriptDto input)
        {
            var entity = await Repository.GetAsync(id);
            var resolved = _paramsResolver.Resolve(entity.Content, input.Parameters);
            var memory = new MemoryStream(resolved.GetBytes())
            {
                Position = 0
            };
            return new RemoteStreamContent(memory, $"{entity.Title}-{Clock.Now:yyMMdd}.txt", "application/octet-stream");
        }

        public override async Task<ScriptDto> UpdateAsync(Guid id, UpdateScriptDto input)
        {

            Script entity = await Repository.GetAsync(id);

            await CheckPermissionAsync(entity, SmPermissions.Script.Update);

            entity.Update(input.Title, input.Description, input.Content);

            await Repository.UpdateAsync(entity);

            return await MapToGetOutputDtoAsync(entity);
        }

        protected override async Task<IQueryable<Script>> CreateFilteredQueryAsync(ScriptGetListInput input)
        {
            return (await base.CreateFilteredQueryAsync(input)).ApplyFilter(input);
        }

        public async Task<ScriptDto> UpdateCategoryAsync(Guid id, UpdateCategoryDto input)
        {
            Script entity = await Repository.GetAsync(id);
            entity.Update(input.CategoryId);
            await Repository.UpdateAsync(entity);
            return await MapToGetOutputDtoAsync(entity);
        }

        protected async Task CheckPermissionAsync(Script? resource, params string[] optPermission)
        {
            await AuthorizationService.CheckAsync(new SmResource()
            {
                CreatorId = resource?.CreatorId

            }, new SmOperationAuthorizationRequirement
            {
                OperationPermissions = optPermission
            });
        }
    }
}
