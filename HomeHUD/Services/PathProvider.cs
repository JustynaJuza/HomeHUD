using Microsoft.AspNetCore.Http;

namespace HomeHUD.Services
{
    public interface IPathProvider
    {
        string GetAppBaseUrl();
        string ConvertToDirectImageUrl(string url);
        //string GetAppAbsolutePath(string relativePath);
        //string GetServerPath(string relativePath);
    }

    public class PathProvider : IPathProvider
    {
        private readonly IPathProviderContext _pathProviderContext;

        public PathProvider(
            IPathProviderContext pathProviderContext)
        {
            _pathProviderContext = pathProviderContext;
        }

        public string GetAppBaseUrl()
        {
            return string.Format("{0}://{1}", _pathProviderContext.Scheme, _pathProviderContext.Host);
        }

        public string ConvertToDirectImageUrl(string url)
        {
            return GetAppBaseUrl() + url;
        }

        //public string GetAppAbsolutePath(string relativePath)
        //{
        //    relativePath = AmendAppRelativePath(relativePath);
        //    return VirtualPathUtility.ToAbsolute(relativePath);
        //}

        //public string GetServerPath(string relativePath)
        //{
        //    return _hostingEnvironment.ContentRootPath.MapPath(GetAppAbsolutePath(relativePath));
        //}

        //private string AmendAppRelativePath(string filePath)
        //{
        //    return filePath[0] == '~' ? filePath : '~' + filePath;
        //}
    }

    //public static class PathHelper
    //{
    //    public static string GetAppBaseUrl()
    //    {
    //        var pathProvider = new PathProvider();
    //        return pathProvider.GetAppBaseUrl();
    //    }

    //    public static string ConvertToDirectImageUrl(string url)
    //    {
    //        var pathProvider = new PathProvider();
    //        return pathProvider.ConvertToDirectImageUrl(url);
    //    }
    //}

    public interface IPathProviderContext
    {
        string Scheme { get; }
        HostString Host { get; }
    }

    public sealed class PathProviderContext : IPathProviderContext
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public PathProviderContext(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string Scheme => _httpContextAccessor.HttpContext.Request.Scheme;
        public HostString Host => _httpContextAccessor.HttpContext.Request.Host;
    }

}
