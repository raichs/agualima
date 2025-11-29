# 🚀 Instalación y Configuración -- AguaLima

Este documento describe los requisitos, pasos de instalación y comandos
necesarios para ejecutar el proyecto en tu entorno local.

------------------------------------------------------------------------

## 📌 Requisitos del Sistema

Laravel requiere algunos componentes esenciales. Si usas **Laravel
Homestead**, todos ya están preinstalados. Si no, asegúrate de tener lo
siguiente:

### **PHP ≥ 8.2** con extensiones:

-   BCMath
-   Ctype
-   Fileinfo
-   JSON
-   Mbstring
-   OpenSSL
-   PDO
-   Tokenizer
-   XML

### **Composer**

Descargar desde: https://getcomposer.org/

### **Node.js (LTS)**

Descargar desde: https://nodejs.org/en/download

Puedes usar cualquiera de estos administradores de paquetes:

-   **Bun** (Recomendado para macOS y Linux)
-   **Yarn**
-   **NPM**

------------------------------------------------------------------------

## 📦 Instalación del Frontend

Elige uno de estos gestores de paquetes:

------------------------------------------------------------------------

### **1. Bun (Recomendado en Linux/Mac)**

Si no lo tienes:

``` bash
npm i -g bun
# o
sudo npm i -g bun
```

**Comandos:**

  Comando           Descripción
  ----------------- -----------------------------------------
  `bun i`           Instala dependencias en `node_modules`.
  `bun dev`         Inicia el servidor de desarrollo.
  `bun run build`   Genera la build de producción.

------------------------------------------------------------------------

### **2. Yarn**

Si no lo tienes:

``` bash
npm i -g yarn
# o
sudo npm i -g yarn
```

**Comandos:**

  Comando        Descripción
  -------------- ----------------------------------
  `yarn`         Instala dependencias.
  `yarn dev`     Ejecuta el servidor local.
  `yarn build`   Genera la build para producción.

------------------------------------------------------------------------

### **3. NPM**

Viene incluido con Node.js.

**Comandos:**

  Comando           Descripción
  ----------------- --------------------------
  `npm i`           Instala dependencias.
  `npm run dev`     Servidor local.
  `npm run build`   Compila para producción.

------------------------------------------------------------------------

## 🖥️ Instalación del Backend (Laravel)

Ejecuta estos pasos en una **terminal separada**:

### Instalar dependencias

``` bash
composer i
```

### Crear archivo `.env`

``` bash
cp .env.example .env
```

### Generar APP_KEY

``` bash
php artisan key:generate
```

### Ejecutar migraciones

``` bash
php artisan migrate
```

### Poblar la base de datos con datos iniciales

``` bash
php artisan db:seed
```

### Iniciar el servidor Laravel

``` bash
php artisan serve
```

La app estará disponible en:

👉 http://127.0.0.1:8000
