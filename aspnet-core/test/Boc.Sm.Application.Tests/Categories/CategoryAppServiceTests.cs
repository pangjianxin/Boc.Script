using Shouldly;
using System.Threading.Tasks;
using Xunit;

namespace Boc.Sm.Categories;

public class CategoryAppServiceTests : SmApplicationTestBase
{
    private readonly ICategoryAppService _categoryAppService;

    public CategoryAppServiceTests()
    {
        _categoryAppService = GetRequiredService<ICategoryAppService>();
    }

    /*
    [Fact]
    public async Task Test1()
    {
        // Arrange

        // Act

        // Assert
    }
    */
}

