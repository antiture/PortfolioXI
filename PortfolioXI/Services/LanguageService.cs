using System.Globalization;
using System.Reflection;
using Microsoft.Extensions.Localization;
using PortfolioXI.Resources;

namespace PortfolioXI.Services;

public class LanguageService
{
    private readonly IStringLocalizerFactory _factory;

    private CultureInfo _currentCulture;
    public event Action? OnLanguageChanged;

    public LanguageService(IStringLocalizerFactory factory)
    {
        _factory = factory;
        _currentCulture = CultureInfo.CurrentUICulture;
    }

    // 当前文化
    public CultureInfo CurrentCulture => _currentCulture;

    // 获取当前 culture 下的本地化器
    public IStringLocalizer GetLocalizer()
    {
        var type = typeof(SharedResources);
        var assemblyName = new AssemblyName(type.GetTypeInfo().Assembly.FullName);
        return _factory.Create(nameof(SharedResources), assemblyName.Name);
    }

    public string Get(string key) => GetLocalizer()[key];

    public void ChangeCulture(string cultureCode)
    {
        var newCulture = new CultureInfo(cultureCode);
        _currentCulture = newCulture;

        CultureInfo.DefaultThreadCurrentCulture = newCulture;
        CultureInfo.DefaultThreadCurrentUICulture = newCulture;

        OnLanguageChanged?.Invoke(); // 通知组件刷新
    }
}
