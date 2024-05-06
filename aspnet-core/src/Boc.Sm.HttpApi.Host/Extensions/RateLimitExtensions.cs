using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Globalization;
using System.Threading.RateLimiting;
using System.Threading.Tasks;
using Volo.Abp.Modularity;
using Volo.Abp.Users;

namespace Boc.Sm.Extensions
{
    public static class RateLimitExtensions
    {
        public static ServiceConfigurationContext ConfigureRateLimiters(this ServiceConfigurationContext context)
        {
            //https://devblogs.microsoft.com/dotnet/announcing-rate-limiting-for-dotnet/
            //https://blog.maartenballiauw.be/post/2022/09/26/aspnet-core-rate-limiting-middleware.html
            context.Services.AddRateLimiter(limiterOptions =>
            {
                limiterOptions.OnRejected = (context, cancellationToken) =>
                {
                    if (context.Lease.TryGetMetadata(MetadataName.RetryAfter, out var retryAfter))
                    {
                        context.HttpContext.Response.Headers.RetryAfter = ((int)retryAfter.TotalSeconds).ToString(NumberFormatInfo.InvariantInfo);
                    }

                    context.HttpContext.Response.StatusCode = StatusCodes.Status429TooManyRequests;

                    context.HttpContext.RequestServices.GetService<ILoggerFactory>()?
                        .CreateLogger("Microsoft.AspNetCore.RateLimitingMiddleware")
                        .LogWarning("OnRejected: {RequestPath}", context.HttpContext.Request.Path);

                    return new ValueTask();
                };

                //limiterOptions.AddPolicy("UserBasedRateLimiting", context =>
                //{
                //    var currentUser = context.RequestServices.GetService<ICurrentUser>();

                //    if (currentUser is not null && currentUser.IsAuthenticated)
                //    {
                //        return RateLimitPartition.GetTokenBucketLimiter(currentUser.UserName, _ => new TokenBucketRateLimiterOptions
                //        {
                //            TokenLimit = 3,
                //            ReplenishmentPeriod = TimeSpan.FromSeconds(15),
                //            TokensPerPeriod = 2,
                //            AutoReplenishment = true,
                //            QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
                //            QueueLimit = 0,
                //        });
                //    }
                //    return RateLimitPartition.GetNoLimiter("");
                //});

                limiterOptions.AddPolicy("UserBasedRateLimiting", context =>
                {
                    var currentUser = context.RequestServices.GetService<ICurrentUser>();

                    if (currentUser is not null && currentUser.IsAuthenticated)
                    {
                        RateLimitPartition<string?> partition = RateLimitPartition.GetSlidingWindowLimiter(currentUser.UserName,
                                        _ => new SlidingWindowRateLimiterOptions
                                        {
                                            PermitLimit = 2,
                                            SegmentsPerWindow = 2,
                                            Window = TimeSpan.FromSeconds(6),
                                            AutoReplenishment = true,
                                            QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
                                            QueueLimit = 0,
                                        });
                        return partition!;
                    }
                    return RateLimitPartition.GetNoLimiter("");
                });


                //limiterOptions.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(context =>
                //{
                //    var currentTenant = context.RequestServices.GetService<ICurrentTenant>();

                //    if (currentTenant is not null && currentTenant.IsAvailable)
                //    {
                //        return RateLimitPartition.GetConcurrencyLimiter(currentTenant!.Name, _ => new ConcurrencyLimiterOptions
                //        {
                //            PermitLimit = 5,
                //            QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
                //            QueueLimit = 1
                //        });
                //    }

                //    return RateLimitPartition.GetNoLimiter("host");
                //});
            });

            return context;
        }
    }
}
