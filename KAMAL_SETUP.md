# Configuración Kamal para Agualima

✅ **Configuración completada exitosamente!**

## 📁 Archivos Creados

### Configuración de Deploy
- `config/deploy.yml` - Configuración de **production**
- `config/deploy.staging.yml` - Configuración de **staging**
- `.kamal/secrets` - Template de variables secretas
- `.kamal/secrets-production.example` - Ejemplo para production
- `.kamal/secrets-staging.example` - Ejemplo para staging

### Docker
- `Dockerfile` - Usando `serversideup/php:8.3-fpm-nginx`
- `.dockerignore` - Archivos excluidos del build

### Scripts y Hooks
- `deploy.sh` - Script helper para deploys fáciles
- `.kamal/hooks/post-deploy` - Migraciones + optimize automático

### Documentación
- `DEPLOY.md` - Guía completa de deployment

## 🚀 Primeros Pasos

### 1. Configurar Secrets

**Para Production:**
```bash
# Copiar el example
cp .kamal/secrets-production.example .kamal/secrets-production

# Editar con tus valores reales
nano .kamal/secrets-production
```

**Para Staging:**
```bash
# Copiar el example
cp .kamal/secrets-staging.example .kamal/secrets-staging

# Editar con tus valores reales
nano .kamal/secrets-staging
```

**Valores que necesitas:**
- `KAMAL_REGISTRY_PASSWORD` - Token de Docker Hub (https://hub.docker.com/settings/security)
- `APP_KEY` - Genera con: `php artisan key:generate --show`
- `DB_USERNAME` / `DB_PASSWORD` - Credenciales MySQL
- `MYSQL_ROOT_PASSWORD` - Password root de MySQL
- `MYSQL_DATABASE` - Nombre de la base de datos
- `MYSQL_USER` / `MYSQL_PASSWORD` - Usuario MySQL (mismo que DB_*)

### 2. Configurar DNS

Antes de deployar, configura tus dominios apuntando a: **194.163.134.202**

```
# Production
agualima.codevspro.com IN A 194.163.134.202

# Staging
agualima.codevspro.com IN A 194.163.134.202
```

### 3. Setup Inicial del Servidor

```bash
# Para production (usa .kamal/secrets-production)
kamal setup

# Para staging (usa .kamal/secrets-staging)
kamal setup -d staging
```

Esto instalará:
- Docker (si no está instalado)
- **MySQL 8.0** (production en puerto 3306, staging en 3307)
- **Traefik** (kamal-proxy) con SSL automático
- Volúmenes persistentes para storage y database

### 4. Primer Deploy

```bash
# Deploy a staging
kamal deploy -d staging

# Deploy a production
kamal deploy
```

## 📋 Comandos Rápidos

### Con el script helper

```bash
# Ver logs en tiempo real
./deploy.sh production logs

# Ejecutar migraciones
./deploy.sh production migrate

# Acceder al shell del container
./deploy.sh production shell

# Tinker
./deploy.sh production tinker

# Optimizar cache
./deploy.sh production cache

# Ver estado
./deploy.sh production status

# Restart
./deploy.sh production restart

# Rollback
./deploy.sh production rollback
```

### Comandos Kamal directos

```bash
# Aliases definidos
kamal console        # Bash en el container
kamal tinker         # Laravel Tinker
kamal app logs -f    # Ver logs

# Staging
kamal console -d staging
kamal app logs -f -d staging
```

## 🌐 URLs Configuradas

- **Production**: https://agualima.codevspro.com
- **Staging**: https://agualima.codevspro.com
- **Servidor**: 194.163.134.202

## 🗄️ Base de Datos

### Production
- Host: 194.163.134.202
- Puerto: 3306
- Database: agualima_production
- Container: agualima-db

### Staging
- Host: 194.163.134.202
- Puerto: 3307
- Database: agualima_staging
- Container: agualima-db-staging

**Conectar desde local:**
```bash
# Production
mysql -h 194.163.134.202 -P 3306 -u agualima_user -p agualima_production

# Staging
mysql -h 194.163.134.202 -P 3307 -u agualima_staging_user -p agualima_staging
```

## 🔐 SSL/TLS

**Traefik** (kamal-proxy) gestionará automáticamente los certificados **Let's Encrypt** para ambos dominios:
- agualima.codevspro.com
- agualima.codevspro.com

Los certificados se renovarán automáticamente cada 90 días.

## 📦 Características del Dockerfile

Basado en **serversideup/php:8.3-fpm-nginx**:
- ✅ **Nginx + PHP-FPM** ya configurado
- ✅ **Supervisor** incluido en la imagen base
- ✅ **Health checks** en `/up` (ruta de Laravel 11)
- ✅ **Assets compilados** en build time con Bun
- ✅ **Composer optimizado** con autoloader
- ✅ **SSL deshabilitado** (Traefik lo maneja)
- ✅ **Volúmenes persistentes** para storage

**Extensiones PHP instaladas:**
- pdo_mysql
- exif
- bcmath
- gd
- opcache

## ⚙️ Características de Kamal

- ✅ Zero-downtime deployments
- ✅ SSL automático con Let's Encrypt (Traefik)
- ✅ Health checks automáticos (`/up`)
- ✅ Rollback en segundos
- ✅ Logs centralizados
- ✅ Múltiples ambientes (staging/production)
- ✅ Proxy reverso con Traefik

## 📖 Documentación Completa

Lee `DEPLOY.md` para la guía completa de deployment y troubleshooting.

## ⚠️ Antes del Primer Deploy

1. ✅ Acceso SSH al servidor: `ssh root@194.163.134.202`
2. ✅ DNS configurados apuntando a 194.163.134.202
3. ✅ Token de Docker Hub creado
4. ✅ APP_KEY generado con Laravel
5. ✅ Secrets configurados (.kamal/secrets-production y .kamal/secrets-staging)
6. ✅ Laravel configurado para confiar en proxies (`bootstrap/app.php`)

## 🎯 Siguiente Paso

```bash
# 1. Configurar secrets
cp .kamal/secrets-production.example .kamal/secrets-production
nano .kamal/secrets-production

# 2. Setup inicial
kamal setup

# 3. Primer deploy!
kamal deploy
```

## 🔧 Diferencias con la configuración anterior

- ✅ Usa **MySQL** en lugar de PostgreSQL
- ✅ Dockerfile simplificado con **serversideup/php** (no más Nginx/Supervisor manual)
- ✅ Puerto **8080** para la app (estándar de serversideup/php)
- ✅ Secrets separados por ambiente (.kamal/secrets-production y .kamal/secrets-staging)
- ✅ Traefik maneja SSL (no Nginx)
- ✅ Configuración siguiendo ejemplos oficiales de Kamal 2.0

¡Listo para deployar! 🚀
