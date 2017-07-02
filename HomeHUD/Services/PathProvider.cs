using Microsoft.AspNetCore.Hosting;
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
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public PathProvider(
            IHostingEnvironment hostingEnvironment,
            IHttpContextAccessor httpContextAccessor)
        {
            _hostingEnvironment = hostingEnvironment;
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetAppBaseUrl()
        {
            var request = _httpContextAccessor.HttpContext.Request;
            return string.Format("{0}://{1}", request.Scheme, request.Host);
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
}