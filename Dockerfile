FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app

ENV PORT=10000
ENV ASPNETCORE_HTTP_PORTS=""
ENV CLOUDFLARED_PATH=/usr/local/bin/cloudflared
ENV CLOUDFLARED_URL_PATTERN=https://[a-zA-Z0-9.-]*trycloudflare.com
ENV CLOUDFLARED_TIMEOUT=30

EXPOSE $PORT

RUN apt update && apt install -y wget curl \
    && ARCH=$(dpkg --print-architecture) \
    && case "$ARCH" in \
        "amd64") CLOUDFARED_URL="https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64" ;; \
        "arm64") CLOUDFARED_URL="https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64" ;; \
        "arm") CLOUDFARED_URL="https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm" ;; \
        *) echo "Unsupported architecture: $ARCH" && exit 1 ;; \
    esac \
    && wget -O /usr/local/bin/cloudflared $CLOUDFARED_URL \
    && chmod +x /usr/local/bin/cloudflared

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS base-build
RUN apt update && apt install -y wget curl \
    && curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
    && apt install -y nodejs \
    && npm install -g npm@latest 

FROM base-build AS build
WORKDIR /src
ARG BUILD_CONFIGURATION=Release

COPY ["UrlShare.csproj", "./"]
RUN dotnet restore "UrlShare.csproj"

COPY . .
WORKDIR "/src/wwwroot"
RUN npm install && npm run build

WORKDIR "/src/"
RUN dotnet build "UrlShare.csproj" -c $BUILD_CONFIGURATION -o /app/build
RUN dotnet publish "UrlShare.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "UrlShare.dll"]