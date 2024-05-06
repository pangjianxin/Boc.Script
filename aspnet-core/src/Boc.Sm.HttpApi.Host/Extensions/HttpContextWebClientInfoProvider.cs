using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using Volo.Abp.AspNetCore.WebClientInfo;
using Volo.Abp.DependencyInjection;

namespace Boc.Sm.Extensions
{
    public class HttpContextWebClientInfoProvider : IWebClientInfoProvider, ITransientDependency
    {
        protected ILogger<Volo.Abp.AspNetCore.WebClientInfo.HttpContextWebClientInfoProvider> Logger { get; }
        protected IHttpContextAccessor HttpContextAccessor { get; }

        public HttpContextWebClientInfoProvider(
            ILogger<Volo.Abp.AspNetCore.WebClientInfo.HttpContextWebClientInfoProvider> logger,
            IHttpContextAccessor httpContextAccessor)
        {
            Logger = logger;
            HttpContextAccessor = httpContextAccessor;
        }

        public string? BrowserInfo => GetBrowserInfo();

        public string? ClientIpAddress => GetClientIpAddress();

        protected virtual string? GetBrowserInfo()
        {
            return HttpContextAccessor.HttpContext?.Request?.Headers?["User-Agent"];
        }

        protected virtual string? GetClientIpAddress()
        {
            try
            {
                var clientIp = HttpContextAccessor.HttpContext?.Request.Headers["X-Real-IP"];

                if (clientIp.HasValue)
                {
                    return clientIp.Value;
                }

                return HttpContextAccessor.HttpContext?.Connection?.RemoteIpAddress?.ToString();
            }
            catch (Exception ex)
            {
                Logger.LogException(ex, LogLevel.Warning);
                return null;
            }
        }
    }
}
