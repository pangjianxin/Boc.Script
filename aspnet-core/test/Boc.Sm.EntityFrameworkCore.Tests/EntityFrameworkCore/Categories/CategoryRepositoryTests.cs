using System;
using System.Threading.Tasks;
using Boc.Sm.Categories;
using Volo.Abp.Domain.Repositories;
using Xunit;

namespace Boc.Sm.EntityFrameworkCore.Categories;

public class CategoryRepositoryTests : SmEntityFrameworkCoreTestBase
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryRepositoryTests()
    {
        _categoryRepository = GetRequiredService<ICategoryRepository>();
    }

    /*
    [Fact]
    public async Task Test1()
    {
        await WithUnitOfWorkAsync(async () =>
        {
            // Arrange

            // Act

            //Assert
        });
    }
    */
}
