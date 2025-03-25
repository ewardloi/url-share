# URL Share

This is a .net webapi + react app that allows sharing URLs via cloudflared tunnels.

## Installation

#### Clone this repository:

```bash
git clone <repository-url>
```

#### Navigate into the project directory:

```bash
cd <project-name>
```

#### Install dependencies:

```bash
dotnet restore "UrlShare.csproj"
```

#### Navigate into the UI project directory:

```bash
cd <project-name>/wwwroot
```

#### Install UI dependencies:

```bash
npm install
```

## Environment Variables

- ```USERNAME```: The username used for authentication.
- ```PASSWORD_SHA256_HASH```: The SHA256 hash of the password for secure authentication.
- ```JWT_SECRET```: (Optional) A secret key used to sign JWT. By default, it is randomly generated at startup.
- ```JWT_EXPIRES```: (Optional) The expiration time for the JWT, in seconds. The default value is **3600** (**1 hour**).
- ```JWT_ISSUER```: (Optional) The issuer of the JWT, which typically represents the application or service generating the token. Default is **UrlShare**
- ```JWT_AUDIENCE```: (Optional) The intended audience for the JWT. Default is **UrlShare**
- ```PORT```: (Optional) The port on which the application will run. Default is **10000**.
- ```FRONTEND_ENABLED```: (Optional) A flag to enable or disable the frontend. Default is **true**, meaning the frontend is enabled.
- ```CLOUDFLARED_TIMEOUT```: (Optional) The timeout in seconds for Cloudflared operations. Default is **30** seconds.
- ```CLOUDFLARED_PATH```: (Optional) The path to the Cloudflared binary. Default is cloudflared.
- ```CLOUDFLARED_URL_PATTERN```: (Optional) The URL pattern for Cloudflared, which defaults to **https://[a-zA-Z0-9.-]*trycloudflare.com**.


## Docker

```yaml
services:
  urlshare:
    image: urlshare
    container_name: urlshare
    ports:
      - "10000:10000"
    environment:
      - USERNAME=user
      - PASSWORD_SHA256_HASH=5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8
    restart: unless-stopped
    build:
      context: .
      dockerfile: Dockerfile

```

## License

This project is licensed under the MIT License.
