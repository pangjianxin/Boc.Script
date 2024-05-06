using Boc.Sm.Identity.Options.Dtos;
using System.Threading.Tasks;
using Volo.Abp.Identity.Settings;
using Volo.Abp.SettingManagement;

namespace Boc.Sm.Identity.Options
{
    public class IdentityOptionsSettingAppService : SmAppService, IIdentityOptionsSettingAppService
    {
        private readonly ISettingManager _settingManager;

        public IdentityOptionsSettingAppService(ISettingManager settingManager)
        {
            _settingManager = settingManager;
        }
        public async Task<IdentityPasswordOptionsSettingDto> GetPasswordOptionsAsync()
        {
            return new IdentityPasswordOptionsSettingDto
            {
                RequiredLength = int.Parse((await SettingProvider.GetOrNullAsync(IdentitySettingNames.Password.RequiredLength))!),
                RequiredUniqueChars = int.Parse((await SettingProvider.GetOrNullAsync(IdentitySettingNames.Password.RequiredUniqueChars))!),
                RequireNonAlphanumeric = bool.Parse((await SettingProvider.GetOrNullAsync(IdentitySettingNames.Password.RequireNonAlphanumeric))!),
                RequireLowercase = bool.Parse((await SettingProvider.GetOrNullAsync(IdentitySettingNames.Password.RequireLowercase))!),
                RequireUppercase = bool.Parse((await SettingProvider.GetOrNullAsync(IdentitySettingNames.Password.RequireUppercase))!),
                RequireDigit = bool.Parse((await SettingProvider.GetOrNullAsync(IdentitySettingNames.Password.RequireDigit))!)
            };
        }

        public async Task UpdatePasswordOptionsAsync(IdentityPasswordOptionsSettingDto input)
        {
            await _settingManager.SetForCurrentTenantAsync(IdentitySettingNames.Password.RequiredLength, input.RequiredLength.ToString());
            await _settingManager.SetForCurrentTenantAsync(IdentitySettingNames.Password.RequiredUniqueChars, input.RequiredUniqueChars.ToString());
            await _settingManager.SetForCurrentTenantAsync(IdentitySettingNames.Password.RequireNonAlphanumeric, input.RequireNonAlphanumeric.ToString());
            await _settingManager.SetForCurrentTenantAsync(IdentitySettingNames.Password.RequireLowercase, input.RequireLowercase.ToString());
            await _settingManager.SetForCurrentTenantAsync(IdentitySettingNames.Password.RequireUppercase, input.RequireUppercase.ToString());
            await _settingManager.SetForCurrentTenantAsync(IdentitySettingNames.Password.RequireDigit, input.RequireDigit.ToString());
        }
    }
}
