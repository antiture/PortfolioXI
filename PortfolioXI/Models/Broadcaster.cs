public class Broadcaster
{
    public event Action<string, object?>? OnEvent;

    public void Broadcast(string eventName, object? data = null)
    {
        OnEvent?.Invoke(eventName, data);
    }
}
