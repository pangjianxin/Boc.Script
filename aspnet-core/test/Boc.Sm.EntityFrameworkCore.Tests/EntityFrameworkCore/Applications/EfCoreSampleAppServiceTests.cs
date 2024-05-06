using Boc.Sm.Samples;
using Xunit;

namespace Boc.Sm.EntityFrameworkCore.Applications;

[Collection(SmTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<SmEntityFrameworkCoreTestModule>
{

}
