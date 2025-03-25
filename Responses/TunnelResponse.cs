namespace UrlShare.Responses;

public record TunnelResponse
{
    public Guid Id { get; init; }

    public string LocalUrl { get; init; } = string.Empty;

    public string PublicUrl { get; init; } = string.Empty;
}