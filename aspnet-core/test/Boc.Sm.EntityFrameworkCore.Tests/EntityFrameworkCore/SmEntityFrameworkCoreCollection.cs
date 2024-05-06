using Xunit;

namespace Boc.Sm.EntityFrameworkCore;

[CollectionDefinition(SmTestConsts.CollectionDefinitionName)]
public class SmEntityFrameworkCoreCollection : ICollectionFixture<SmEntityFrameworkCoreFixture>
{

}
