using Boc.Sm.Identity.Options.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Identity;

namespace Boc.Sm.Identity.Options
{
    [Route("api/identity/options")]
    [RemoteService(Name = IdentityRemoteServiceConsts.RemoteServiceName)]
    [Authorize]
    public class IdentityOptionsSettingController : SmController, IIdentityOptionsSettingAppService
    {
        private readonly IIdentityOptionsSettingAppService _identityOptionsSettingAppService;

        public IdentityOptionsSettingController(IIdentityOptionsSettingAppService identityOptionsSettingAppService)
        {
            _identityOptionsSettingAppService = identityOptionsSettingAppService;
        }
        [HttpGet]
        [Route("password")]
        public async Task<IdentityPasswordOptionsSettingDto> GetPasswordOptionsAsync()
        {
            return await _identityOptionsSettingAppService.GetPasswordOptionsAsync();
        }

        [HttpPut]
        [Route("password")]
        public async Task UpdatePasswordOptionsAsync(IdentityPasswordOptionsSettingDto input)
        {
            await _identityOptionsSettingAppService.UpdatePasswordOptionsAsync(input);
        }
    }
}
