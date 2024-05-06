using Boc.Sm.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace Boc.Sm.Permissions;

public class SmPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(SmPermissions.GroupName);
        var scriptPermission = myGroup.AddPermission(SmPermissions.Script.Default, L("Permission:Script"));
        scriptPermission.AddChild(SmPermissions.Script.Create, L("Permission:Create"));
        scriptPermission.AddChild(SmPermissions.Script.Update, L("Permission:Update"));
        scriptPermission.AddChild(SmPermissions.Script.Delete, L("Permission:Delete"));

        var categoryPermission = myGroup.AddPermission(SmPermissions.Category.Default, L("Permission:Category"));
        categoryPermission.AddChild(SmPermissions.Category.Create, L("Permission:Create"));
        categoryPermission.AddChild(SmPermissions.Category.Update, L("Permission:Update"));
        categoryPermission.AddChild(SmPermissions.Category.Delete, L("Permission:Delete"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<SmResource>(name);
    }
}
