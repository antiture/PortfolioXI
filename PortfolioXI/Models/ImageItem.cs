using PortfolioXI.Components;

namespace PortfolioXI.Models;

public class ImageItem
{
    public string Src { get; set; } = string.Empty;
    public string Alt { get; set; } = string.Empty;
    public string Id { get; set; } = Guid.NewGuid().ToString(); 
    public ImageDirection Dir { get; set; } = ImageDirection.Verti;
}

public enum ImageDirection
{
    Ori,
    Verti 
}
