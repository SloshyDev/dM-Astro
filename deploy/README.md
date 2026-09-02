# Despliegue SSR de sloshy.cloud

El sitio se genera en modo híbrido: `/about` es estático y todas las otras rutas se renderizan bajo demanda mediante Node.js.

## Requisitos de la VPS

- Node.js 22 o superior en `/usr/bin/node`.
- Nginx con el certificado TLS existente de `sloshy.cloud`.
- El usuario de despliegue debe poder ejecutar `sudo systemctl` y `sudo nginx -t`.

## Configuración inicial

1. Copiar `deploy/systemd/sloshy-astro.service` a `/etc/systemd/system/sloshy-astro.service` y reemplazar `__SLOSHY_USER__` por el usuario que ejecuta los despliegues.
2. Incluir el contenido de `deploy/nginx/sloshy-astro-proxy.conf` dentro del bloque `server` existente de `sloshy.cloud`. Conserva sin cambios sus directivas SSL y su `server_name`.
3. Validar y activar los servicios:

   ```sh
   sudo systemctl daemon-reload
   sudo nginx -t
   sudo systemctl enable sloshy-astro
   sudo systemctl restart sloshy-astro
   sudo systemctl reload nginx
   ```

El workflow de despliegue debe publicar `dist/`, `package.json` y `package-lock.json` en cada release, ejecutar `npm ci --omit=dev` dentro del release, actualizar el enlace `current` y reiniciar `sloshy-astro`.
