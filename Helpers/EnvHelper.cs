namespace UrlShare.Helpers;

public static class EnvHelper
{
    public static string GetString(string key)
        => Environment.GetEnvironmentVariable(key) ?? throw new Exception($"Environment variable {key} not found");
    
    public static string? GetNullableString(string key)
        => Environment.GetEnvironmentVariable(key);
    public static string GetString(string key, string defaultValue)
        => Environment.GetEnvironmentVariable(key) ?? defaultValue;

    public static int? GetNullableInt(string key)
        => int.TryParse(Environment.GetEnvironmentVariable(key), out var result) ? result : null;
    
    public static int GetInt(string key)
        => int.TryParse(Environment.GetEnvironmentVariable(key), out var result)
            ? result
            : throw new Exception($"Environment variable {key} not found");
    
    public static int GetInt(string key, int defaultValue)
        => int.TryParse(Environment.GetEnvironmentVariable(key), out var result) ? result : defaultValue;
    
    public static bool? GetNullableBool(string key)
        => bool.TryParse(Environment.GetEnvironmentVariable(key), out var result) ? result : null;
    
    public static bool GetBool(string key)
        => bool.TryParse(Environment.GetEnvironmentVariable(key), out var result)
            ? result
            : throw new Exception($"Environment variable {key} not found");
    
    public static bool GetBool(string key, bool defaultValue)
        => bool.TryParse(Environment.GetEnvironmentVariable(key), out var result) ? result : defaultValue;
    
    public static void Set(string key, string? value) =>
        Environment.SetEnvironmentVariable(key, value);
}