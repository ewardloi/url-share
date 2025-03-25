using System.Diagnostics;
using System.Text.RegularExpressions;
using UrlShare.Helpers;

namespace UrlShare.Services;

public class CloudflaredTunnelProcess
{
    private readonly string _cloudflaredPath = EnvHelper.GetString("CLOUDFLARED_PATH", "cloudflared");
    
    private readonly string _cloudflaredUrlPattern = EnvHelper.GetString("CLOUDFLARED_URL_PATTERN", "https://[a-zA-Z0-9.-]*trycloudflare.com");
    
    private Process? _process;
    
    public async Task<string> Start(string url, TimeSpan timeout)
    {
        if (_process is not null)
            Stop();
        
        var processStartInfo = new ProcessStartInfo
        {
            FileName = _cloudflaredPath,
            Arguments = $"tunnel --url {url}",
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = true
        };

        _process = Process.Start(processStartInfo);

        if (_process is null)
            throw new Exception($"Failed to start cloudflare tunnel process: {_cloudflaredPath}");

        return await GetPublicUrl(timeout);
    }
    
    private Regex PublicUrlRegex => new(_cloudflaredUrlPattern);

    private async Task<string> GetPublicUrl(TimeSpan timeout)
    {
        var taskCompletionSource = new TaskCompletionSource<string>();

        _process!.OutputDataReceived += (_, args) => ProcessOutput(args.Data);
        _process!.ErrorDataReceived += (_, args) => ProcessOutput(args.Data);
        
        _process.BeginOutputReadLine();
        _process.BeginErrorReadLine();
        
        var completedTask = await Task.WhenAny(taskCompletionSource.Task, Task.Delay(timeout));

        _process.CancelOutputRead();
        _process.CancelErrorRead();
        
        if (completedTask == taskCompletionSource.Task)
            return await taskCompletionSource.Task;

        Stop();
        throw new TimeoutException("Timeout waiting for start cloudflare tunnel process");

        void ProcessOutput(string? line)
        {
            if (line is null) return;
            
            var matches = PublicUrlRegex.Matches(line);
            
            if (matches.Count > 0) 
                taskCompletionSource.SetResult(matches.First().Value);
        };
    }

    public void Stop()
    {
        _process?.Kill();
        _process = null;
    }
}