using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

public abstract class LayoutResponsiveBase : LayoutComponentBase
{
    [Inject] protected IJSRuntime JS { get; set; } = default!;
    protected bool _open = true;
    protected bool _openBottom;
    protected bool _isMobile;
    protected bool _renderReady; 

    protected bool _isDarkMode;

     

    protected void HandleResize(double width)
    {
        var newState = width < 768;
        if (newState != _isMobile || !_renderReady)
        {
            _isMobile = newState;
            _renderReady = true;
            InvokeAsync(StateHasChanged);
        }
    }
 

    protected void SwithDrawerBottom() => _openBottom = !_openBottom;
    protected void OpenDrawer() => _open = !_open;

    protected async Task OnDrawerBottomChanged(bool isOpen)
    {
        if (isOpen)
            await JS.InvokeVoidAsync("document.body.style.setProperty", "overflow", "hidden");
        else
            await JS.InvokeVoidAsync("document.body.style.removeProperty", "overflow");
        StateHasChanged();
    }
}
