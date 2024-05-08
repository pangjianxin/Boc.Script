#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER root
WORKDIR /app
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/Boc.Sm.HttpApi.Host/Boc.Sm.HttpApi.Host.csproj", "src/Boc.Sm.HttpApi.Host/"]
COPY ["src/Boc.Sm.Application/Boc.Sm.Application.csproj", "src/Boc.Sm.Application/"]
COPY ["src/Boc.Sm.Domain/Boc.Sm.Domain.csproj", "src/Boc.Sm.Domain/"]
COPY ["src/Boc.Sm.Domain.Shared/Boc.Sm.Domain.Shared.csproj", "src/Boc.Sm.Domain.Shared/"]
COPY ["src/Boc.Sm.Application.Contracts/Boc.Sm.Application.Contracts.csproj", "src/Boc.Sm.Application.Contracts/"]
COPY ["src/Boc.Sm.EntityFrameworkCore/Boc.Sm.EntityFrameworkCore.csproj", "src/Boc.Sm.EntityFrameworkCore/"]
COPY ["src/Boc.Sm.HttpApi/Boc.Sm.HttpApi.csproj", "src/Boc.Sm.HttpApi/"]
RUN dotnet restore "./src/Boc.Sm.HttpApi.Host/Boc.Sm.HttpApi.Host.csproj"
COPY . .
WORKDIR "/src/src/Boc.Sm.HttpApi.Host"
RUN dotnet build "./Boc.Sm.HttpApi.Host.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Boc.Sm.HttpApi.Host.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Boc.Sm.HttpApi.Host.dll"]