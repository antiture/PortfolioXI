

using System.Reflection;
using global::PortfolioXI.Resources;
using Microsoft.Extensions.Localization;


namespace PortfolioXI.Services;
public class LanguageService
{
    private readonly IStringLocalizer _localizer;

    public LanguageService(IStringLocalizerFactory factory)
    {
        var type = typeof(SharedResources); // ← 确保你的 resx 是叫 SharedResources.resx
        var assemblyName = new AssemblyName(type.GetTypeInfo().Assembly.FullName);
        _localizer = factory.Create(nameof(SharedResources), assemblyName.Name);
    }

    public string Get(string key)
    {
        return _localizer[key];
    }

    public LocalizedString GetLocalized(string key)
    {
        return _localizer[key];
    }

    public bool TryGet(string key, out string? value)
    {
        var result = _localizer[key];
        if (result.ResourceNotFound)
        {
            value = null;
            return false;
        }

        value = result.Value;
        return true;
    }
}


