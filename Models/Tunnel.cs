namespace UrlShare.Models;

public class Tunnel
{
    public Guid Id { get; init; }

    public required string LocalUrl { get; init; }

    public required string PublicUrl { get; init; }
}