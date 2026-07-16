# dataMares Astro

Sitio web bilingüe de **dataMares**, desarrollado con Astro, React y Tailwind CSS.

Incluye navegación adaptable para escritorio y móvil, páginas en inglés y español, selector de idioma, enlaces sociales y temas claro, oscuro y del sistema.

## Requisitos

- Node.js 22.12 o posterior
- npm

## Instalación

```bash
git clone <URL_DEL_REPOSITORIO>
cd dM-Astro
npm install
```

## Desarrollo

Inicia el sitio en segundo plano:

```bash
npm run astro -- dev --background
```

La página estará disponible en `http://localhost:4321`.

Comandos útiles:

```bash
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
npm run build
```

## Organización

```text
public/                  Imágenes, logos y banderas
src/components/          Componentes de la interfaz
src/components/Header/   Menú, idiomas y enlaces sociales
src/layouts/             Estructura general de las páginas
src/pages/               Páginas y rutas del sitio
src/styles/              Estilos globales y configuración de Tailwind
```

## Páginas e idiomas

El contenido principal está disponible en dos rutas:

- `/` para inglés
- `/es` para español

Las páginas del menú se definen en `src/components/Header/menuData.js`. Para agregar una página bilingüe, añade una entrada como esta:

```js
{
  id: "projects",
  label: { en: "Projects", es: "Proyectos" },
  page: { en: "projects", es: "proyectos" },
}
```

Astro generará automáticamente:

```text
/projects
/es/proyectos
```

Usa el mismo `id` en ambos idiomas para que el selector pueda relacionar las dos versiones.

## Tema de color

El botón flotante de la esquina inferior izquierda permite elegir:

- Claro
- Oscuro
- Sistema

La selección se guarda en el navegador. El modo oscuro se aplica con clases `dark:` de Tailwind.

## Antes de guardar cambios

Ejecuta:

```bash
npm run build
git diff --check
```

El build debe terminar sin errores y generar las páginas en ambos idiomas.

## Problemas comunes

### El servidor no inicia

Comprueba si ya está ejecutándose:

```bash
npm run astro -- dev status
npm run astro -- dev logs
```

Si es necesario, detenlo con `npm run astro -- dev stop` y vuelve a iniciarlo.

### Una página no aparece

Revisa que su entrada en `menuData.js` tenga `label` y `page` para el idioma correspondiente. Después ejecuta `npm run build`.

### El selector de idioma regresa al inicio

Comprueba que las versiones en inglés y español compartan el mismo `id`.

### Una bandera o imagen no carga

Verifica que el nombre y las mayúsculas de la ruta coincidan exactamente con el archivo dentro de `public/`.

### El editor muestra errores antiguos

Reinicia la ventana del editor para que Astro vuelva a cargar `tsconfig.json` y regenere sus tipos.
