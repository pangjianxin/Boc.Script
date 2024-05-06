using Volo.Abp.Settings;

namespace Boc.Sm.Settings;

public class SmSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(SmSettings.MySetting1));
    }
}
