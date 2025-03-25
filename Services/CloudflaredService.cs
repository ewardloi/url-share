using UrlShare.Helpers;
using UrlShare.Models;

namespace UrlShare.Services;

public class CloudflaredService
{    
    private readonly List<Tunnel> _tunnels = [];
    
    private readonly Dictionary<Guid, CloudflaredTunnelProcess> _processes = [];

    private readonly IHttpClientFactory _httpClientFactory;
 
    private readonly TimeSpan _timeout = TimeSpan.FromSeconds(EnvHelper.GetInt("CLOUDFLARED_TIMEOUT", 30));
    
    public CloudflaredService(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }
    
    public async Task<Tunnel?> GetTunnel(Guid id)
    {
        var tunnel = _tunnels.FirstOrDefault(t => t.Id == id);

        if (tunnel is null) return null;

        if (await IsUrlAvailable(tunnel.PublicUrl))
            return tunnel;

        KillProcess(id);
        return null;
    }

    public async Task<List<Tunnel>> GetAllTunnels()
    {
        var tasks = _tunnels.Select(IsTunnelUrlAvailable);
        
        var tunnelsInfo = await Task.WhenAll(tasks);

        foreach (var (tunnel, _) in tunnelsInfo.Where(t => !t.avaliable))
        {
            KillProcess(tunnel.Id);   
        }
        
        return _tunnels;

        async Task<(Tunnel tunnel, bool avaliable)> IsTunnelUrlAvailable(Tunnel tunnel)
        {
            return (tunnel, await IsUrlAvailable(tunnel.PublicUrl));
        }
    }

    public async Task<Tunnel> CreateTunnel(string url)
    {
        var id = Guid.NewGuid();

        var process = new CloudflaredTunnelProcess();

        var publicUrl = await process.Start(url, _timeout);
        
        var tunnel = new Tunnel
        {
            Id = id,
            LocalUrl = url,
            PublicUrl = publicUrl
        };
        
        _tunnels.Add(tunnel);
        _processes.Add(id, process);

        return tunnel;
    }

    public async Task CloseTunnel(Guid id)
    {
        var tunnel = await GetTunnel(id);
        
        if (tunnel is null) return;

        KillProcess(id);
    }

    private void KillProcess(Guid id)
    {
        _processes[id].Stop();
        _processes.Remove(id);
        _tunnels.Remove(_tunnels.First(t => t.Id == id));
    }
    
    private async Task<bool> IsUrlAvailable(string url)
    {
        var client = _httpClientFactory.CreateClient();
        
        try
        {
            await client.SendAsync(new HttpRequestMessage(HttpMethod.Options, url));
            return true;
        }
        catch
        {
            return false;
        }
    }
}