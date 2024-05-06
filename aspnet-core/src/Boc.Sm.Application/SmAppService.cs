using System;
using System.Collections.Generic;
using System.Text;
using Boc.Sm.Localization;
using Volo.Abp.Application.Services;

namespace Boc.Sm;

/* Inherit your application services from this class.
 */
public abstract class SmAppService : ApplicationService
{
    protected SmAppService()
    {
        LocalizationResource = typeof(SmResource);
    }
}
