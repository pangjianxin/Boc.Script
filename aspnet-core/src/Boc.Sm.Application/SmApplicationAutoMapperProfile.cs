using AutoMapper;
using Boc.Sm.Categories;
using Boc.Sm.Categories.Dtos;
using Boc.Sm.Scripts;
using Boc.Sm.Scripts.Dtos;

namespace Boc.Sm;

public class SmApplicationAutoMapperProfile : Profile
{
    public SmApplicationAutoMapperProfile()
    {
        /* You can configure your AutoMapper mapping configuration here.
         * Alternatively, you can split your mapping configurations
         * into multiple profile classes for a better organization. */
        CreateMap<Category, CategoryDto>();
        CreateMap<Script, ScriptDto>();
        CreateMap<ScriptVersion, ScriptVersionDto>();
    }
}
