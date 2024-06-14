using Microsoft.AspNetCore.Authorization;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.DependencyInjection;

namespace Boc.Sm.Authorizations
{
    public class SmOperationAuthorizationHandler
        : AuthorizationHandler<SmOperationAuthorizationRequirement, SmResource>,
        ITransientDependency
    {
        private readonly IPermissionChecker _permissionChecker;

        public SmOperationAuthorizationHandler(IPermissionChecker permissionChecker)
        {
            _permissionChecker = permissionChecker;
        }
        protected override async Task HandleRequirementAsync(
            AuthorizationHandlerContext context,
            SmOperationAuthorizationRequirement requirement,
            SmResource resource)
        {
            await BasicCheckAsync(context, resource, requirement);
        }

        protected virtual async Task BasicCheckAsync(
            AuthorizationHandlerContext context,
            SmResource resource,
            SmOperationAuthorizationRequirement requirement)
        {
            MultiplePermissionGrantResult grantedResult = await _permissionChecker.IsGrantedAsync(requirement.OperationPermissions);

            if (grantedResult.Result.Any(it => it.Value == PermissionGrantResult.Granted))
            {
                context.Succeed(requirement);
                return;
            }
            if (resource.CreatorId == context.User.FindUserId())
            {
                context.Succeed(requirement);
                return;
            }
            context.Fail();
        }
    }
}
