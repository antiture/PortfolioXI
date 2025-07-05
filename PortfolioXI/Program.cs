using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using PortfolioXI;
using System.Globalization;
using Microsoft.Extensions.Localization;
using Microsoft.JSInterop;
using MudBlazor.Services;
using PortfolioXI.Services;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

// 加入 MudBlazor
builder.Services.AddMudServices();
builder.Services.AddSingleton<Broadcaster>();
// 加入本地化服务，指定资源文件路径
builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");
// 添加 HTTP 服务
builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddSingleton<LanguageService>();
var host = builder.Build();



var js = host.Services.GetRequiredService<IJSRuntime>();
var result = await js.InvokeAsync<string>("blazorCulture.get");

var culture = !string.IsNullOrWhiteSpace(result)
    ? new CultureInfo(result)
    : new CultureInfo("en-US");

CultureInfo.DefaultThreadCurrentCulture = culture;
CultureInfo.DefaultThreadCurrentUICulture = culture;

await host.RunAsync();

await host.RunAsync();
