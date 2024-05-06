using Boc.Sm.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace Boc.Sm;

/* Inherit your controllers from this class.
 */
public abstract class SmController : AbpControllerBase
{
    protected SmController()
    {
        LocalizationResource = typeof(SmResource);
    }
}
