
using Microsoft.AspNetCore.Components;

namespace PortfolioXI.Components;

public abstract class BroadcasterComponentBase : ComponentBase, IDisposable
{
    [Inject] private Broadcaster Broadcaster { get; set; } = default!;

    protected override void OnInitialized()
    {
        Broadcaster.OnEvent += HandleEvent;
    }

    protected virtual void HandleEvent(string eventName, object? data)
    {
        // ??????
        if (eventName == "LanguageChanged")
            InvokeAsync(StateHasChanged);
    }

    public void Dispose()
    {
        Broadcaster.OnEvent -= HandleEvent;
    }
}
