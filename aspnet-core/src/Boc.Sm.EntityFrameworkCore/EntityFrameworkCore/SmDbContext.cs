using Boc.Sm.Scripts;
using Microsoft.EntityFrameworkCore;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.BackgroundJobs.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Identity;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.OpenIddict.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.TenantManagement;
using Volo.Abp.TenantManagement.EntityFrameworkCore;
using Boc.Sm.Categories;

namespace Boc.Sm.EntityFrameworkCore;

[ReplaceDbContext(typeof(IIdentityDbContext))]
[ReplaceDbContext(typeof(ITenantManagementDbContext))]
[ConnectionStringName("Default")]
public class SmDbContext :
    AbpDbContext<SmDbContext>,
    IIdentityDbContext,
    ITenantManagementDbContext
{
    /* Add DbSet properties for your Aggregate Roots / Entities here. */

    #region Entities from the modules

    /* Notice: We only implemented IIdentityDbContext and ITenantManagementDbContext
     * and replaced them for this DbContext. This allows you to perform JOIN
     * queries for the entities of these modules over the repositories easily. You
     * typically don't need that for other modules. But, if you need, you can
     * implement the DbContext interface of the needed module and use ReplaceDbContext
     * attribute just like IIdentityDbContext and ITenantManagementDbContext.
     *
     * More info: Replacing a DbContext of a module ensures that the related module
     * uses this DbContext on runtime. Otherwise, it will use its own DbContext class.
     */

    //Identity
    public DbSet<IdentityUser> Users { get; set; }
    public DbSet<IdentityRole> Roles { get; set; }
    public DbSet<IdentityClaimType> ClaimTypes { get; set; }
    public DbSet<OrganizationUnit> OrganizationUnits { get; set; }
    public DbSet<IdentitySecurityLog> SecurityLogs { get; set; }
    public DbSet<IdentityLinkUser> LinkUsers { get; set; }
    public DbSet<IdentityUserDelegation> UserDelegations { get; set; }

    // Tenant Management
    public DbSet<Tenant> Tenants { get; set; }
    public DbSet<TenantConnectionString> TenantConnectionStrings { get; set; }

    #endregion
    public DbSet<Category> Categories { get; set; }
    public DbSet<Script> Scripts { get; set; }
    public SmDbContext(DbContextOptions<SmDbContext> options)
        : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.ConfigurePermissionManagement();
        builder.ConfigureSettingManagement();
        builder.ConfigureBackgroundJobs();
        builder.ConfigureAuditLogging();
        builder.ConfigureIdentity();
        builder.ConfigureOpenIddict();
        builder.ConfigureFeatureManagement();
        builder.ConfigureTenantManagement();

        builder.Entity<Script>(b =>
        {
            b.ToTable(SmConsts.DbTablePrefix + "Scripts", SmConsts.DbSchema);
            b.ConfigureByConvention();
            b.HasIndex(it => it.Title);
            b.Property(it => it.Title).IsRequired(true).HasMaxLength(256);
            b.Property(it => it.Description).IsRequired(false).HasMaxLength(1024);
            b.Property(it => it.Content).IsRequired(true).HasMaxLength(int.MaxValue);

            b.HasMany(it => it.Versions).WithOne().HasForeignKey(it => it.ScriptId);
        });

        builder.Entity<ScriptVersion>(b =>
        {
            b.ToTable(SmConsts.DbTablePrefix + "ScriptVersions", SmConsts.DbSchema);
            b.ConfigureByConvention();
            b.HasKey(it => it.Id);
            b.Property(it => it.Content).IsRequired().HasMaxLength(int.MaxValue);
        });

        builder.Entity<Category>(b =>
        {
            b.ToTable(SmConsts.DbTablePrefix + "Categories", SmConsts.DbSchema);
            b.ConfigureByConvention();

            b.Property(it => it.Title).IsRequired(true).HasMaxLength(256);
        });
    }
}
