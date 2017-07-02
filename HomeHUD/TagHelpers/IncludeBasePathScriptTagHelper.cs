using HomeHUD.Services;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace HomeHUD.TagHelpers
{
    public class IncludeBasePathScriptTagHelper : TagHelper
    {
        private readonly IPathProvider _pathProvider;

        public IncludeBasePathScriptTagHelper(IPathProvider pathProvider)
        {
            _pathProvider = pathProvider;
        }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            output.TagName = "script";
            var scriptContent = string.Format("window.baseUrl = '{0}';", _pathProvider.GetAppBaseUrl());
            output.Content.SetHtmlContent(scriptContent);
        }
    }
}