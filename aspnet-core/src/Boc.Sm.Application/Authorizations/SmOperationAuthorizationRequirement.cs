using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;

namespace Boc.Sm.Authorizations
{
    public class SmOperationAuthorizationRequirement : IAuthorizationRequirement
    {
        public string[] OperationPermissions { get; set; } = default!;

        /// <inheritdoc />
        public override string ToString()
        {
            return $"{nameof(SmOperationAuthorizationRequirement)}:OperationPermission={OperationPermissions.JoinAsString(",")}";
        }
    }
}
