# Todos por Brunito

Sitio estático (HTML/CSS/JS puro, sin build) para la campaña solidaria de Bruno.

## Ver en local

```bash
python3 -m http.server 8080
# abrir http://localhost:8080
```

## Deploy en Vercel

### Opción A — con la CLI (más rápida)

```bash
npm install -g vercel   # si no la tenés instalada
cd todos-por-brunito
vercel login
vercel --prod
```

No hace falta configurar nada: al ser HTML estático, Vercel lo detecta y lo sirve directo.

### Opción B — con GitHub

1. Crear un repo en GitHub y subir esta carpeta.
2. Entrar a https://vercel.com/new, importar el repo.
3. Framework Preset: "Other" (sitio estático) — no requiere build command ni output directory.
4. Deploy.

## Estructura

```
index.html      → contenido de la página
styles.css       → estilos (mobile-first)
script.js        → copiar alias / compartir por WhatsApp
images/flyer.jpg → flyer original de la familia
```

## Actualizar datos

- **Alias / monto**: buscar `todosporBrunito.uala` y `$7.260.550` en `index.html`.
- **WhatsApp**: buscar `5492984503869` en `index.html` (formato: 54 9 + código de área + número, sin espacios).
- **Fotos**: reemplazar `images/flyer.jpg` o agregar nuevas imágenes en `images/` y referenciarlas en `index.html`.
