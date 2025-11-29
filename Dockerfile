FROM serversideup/php:8.3-fpm-nginx AS base

# Switch to root so we can do root things
USER root

# Install PHP extensions
RUN install-php-extensions pdo_mysql exif bcmath gd opcache

# Install JavaScript dependencies
ARG NODE_VERSION=20.18.0
ENV PATH=/usr/local/node/bin:$PATH
RUN curl -sL https://github.com/nodenv/node-build/archive/master.tar.gz | tar xz -C /tmp/ && \
    /tmp/node-build-master/bin/node-build "${NODE_VERSION}" /usr/local/node && \
    npm install -g bun && \
    rm -rf /tmp/node-build-master

# Drop back to our unprivileged user
USER www-data

FROM base

# Environment variables for serversideup/php image
ENV SSL_MODE="off"
ENV AUTORUN_ENABLED="true"
ENV PHP_OPCACHE_ENABLE="1"
ENV HEALTHCHECK_PATH="/up"

# Copy the app files
COPY --chown=www-data:www-data . /var/www/html

# Install PHP dependencies
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

# Install and build frontend assets
RUN bun install --frozen-lockfile && \
    bun run build && \
    rm -rf node_modules
