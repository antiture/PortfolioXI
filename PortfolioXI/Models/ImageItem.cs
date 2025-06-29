using PortfolioXI.Components;

namespace PortfolioXI.Models;

public class ImageItem
{
    public string Src { get; set; } = string.Empty;
    public string Id { get; set; } = string.Empty;
    public GrapImage? Ref { get; set; }
}
