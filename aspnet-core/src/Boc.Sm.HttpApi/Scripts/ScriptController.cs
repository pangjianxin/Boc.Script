﻿using Boc.Sm.Scripts.Dtos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Content;

namespace Boc.Sm.Scripts
{
    [RemoteService(Name = "Default")]
    [Route("/api/sm/script")]
    public class ScriptController(IScriptAppService service) : SmController, IScriptAppService
    {
        private readonly IScriptAppService _service = service;

        [HttpPost]
        public Task<ScriptDto> CreateAsync(CreateScriptDto input)
        {
            return _service.CreateAsync(input);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task DeleteAsync(Guid id)
        {
            await _service.DeleteAsync(id);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ScriptDto> GetAsync(Guid id)
        {
            return await _service.GetAsync(id);
        }

        [HttpGet]
        public async Task<PagedResultDto<ScriptDto>> GetListAsync(ScriptGetListInput input)
        {
            return await _service.GetListAsync(input);
        }

        [HttpPost]
        [Route("download/{id}")]
        public async Task<IRemoteStreamContent> Download(Guid id, DownloadScriptDto input)
        {
            return await _service.Download(id, input);
        }

        [HttpGet]
        [Route("resolve-parameter/{id}")]
        public Task<List<string>> ResolveParametersAsync(Guid id)
        {
            return _service.ResolveParametersAsync(id);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ScriptDto> UpdateAsync(Guid id, UpdateScriptDto input)
        {
            return await _service.UpdateAsync(id, input);
        }
    }
}
