using AutoMapper;

namespace HomeHUD.Models.Mappings
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<LightViewModel, Light>();

        }
    }
}
