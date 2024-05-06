using Boc.Sm.Samples;
using Xunit;

namespace Boc.Sm.EntityFrameworkCore.Domains;

[Collection(SmTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<SmEntityFrameworkCoreTestModule>
{

}
