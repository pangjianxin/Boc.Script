namespace Boc.Sm.Permissions;

public static class SmPermissions
{
    public const string GroupName = "Sm";

    public class Script
    {
        public const string Default = GroupName + ".Script";
        public const string Update = Default + ".Update";
        public const string Create = Default + ".Create";
        public const string Delete = Default + ".Delete";
    }
    public class Category
    {
        public const string Default = GroupName + ".Category";
        public const string Update = Default + ".Update";
        public const string Create = Default + ".Create";
        public const string Delete = Default + ".Delete";
    }
}
