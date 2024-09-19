FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
  && apt-get -y install --no-install-recommends \
  git-lfs \
  iputils-ping

RUN su node -c "npm install -g pnpm" \
  && su node -c "pnpm config --global set store-dir /pnpm-store"