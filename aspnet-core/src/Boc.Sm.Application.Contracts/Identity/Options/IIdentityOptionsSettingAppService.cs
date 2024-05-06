using Boc.Sm.Identity.Options.Dtos;
using System.Threading.Tasks;
using Volo.Abp.Application.Services;

namespace Boc.Sm.Identity.Options
{
    public interface IIdentityOptionsSettingAppService : IApplicationService
    {
        Task<IdentityPasswordOptionsSettingDto> GetPasswordOptionsAsync();
        Task UpdatePasswordOptionsAsync(IdentityPasswordOptionsSettingDto input);
    }
}
