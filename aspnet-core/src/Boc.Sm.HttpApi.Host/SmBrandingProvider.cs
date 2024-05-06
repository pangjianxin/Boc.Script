using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace Boc.Sm;

[Dependency(ReplaceServices = true)]
public class SmBrandingProvider : DefaultBrandingProvider
{
    public override string AppName => "Sm";
}
