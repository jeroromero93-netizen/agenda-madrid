# 🎭 Agenda Cultural Madrid

Tu agenda cultural personalizada para no perderte ningún evento en Madrid.

## 📱 Ver la app

👉 **https://jeroromero93-netizen.github.io/agenda-madrid**

## 🚀 Cómo subir esto a GitHub Pages

### Opción 1: Usando GitHub Desktop (MÁS FÁCIL)

1. **Descarga GitHub Desktop:** https://desktop.github.com
2. **Instala** y abre GitHub Desktop
3. **File → New Repository**
   - Name: `agenda-madrid`
   - Local path: Selecciona la carpeta donde descargaste estos archivos
   - Click "Create Repository"
4. **Publish repository**
   - Click "Publish repository" arriba
   - Desmarca "Keep this code private" (para que sea público)
   - Click "Publish Repository"
5. **Activar GitHub Pages:**
   - Ve a: https://github.com/jeroromero93-netizen/agenda-madrid
   - Click en **Settings**
   - En el menú izquierdo: **Pages**
   - En "Source": Selecciona **main** branch
   - Click **Save**
6. **Espera 1-2 minutos**
7. Tu app estará en: **https://jeroromero93-netizen.github.io/agenda-madrid**

### Opción 2: Desde la terminal (para usuarios avanzados)

```bash
cd agenda-madrid
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/jeroromero93-netizen/agenda-madrid.git
git push -u origin main
```

Luego activa GitHub Pages desde Settings → Pages.

---

## 📝 Cómo añadir eventos

### Mientras la app funciona con localStorage:

1. Abre la app en Safari
2. Click en "+ Añadir evento"
3. Llena el formulario
4. Los eventos se guardan en tu navegador

### Cuando me pases eventos para añadir:

1. Mándame screenshot o link del evento por aquí
2. Yo actualizo el archivo `events.js`
3. Tú haces:
   ```bash
   git pull
   git push
   ```
4. La app se actualiza automáticamente

---

## 🎨 Características

✅ Vista de eventos ordenados por fecha
✅ Filtros: Hoy, Esta semana, Próximos
✅ Categorías: Música, Teatro, Cine, Exposición, Fiesta, etc.
✅ Estados: Interesado, Confirmado, Asistido, No fui
✅ Funciona offline
✅ Se instala como app en iPhone
✅ Guardado automático en el navegador

---

## 📱 Instalar en iPhone

1. Abre **Safari**
2. Ve a: https://jeroromero93-netizen.github.io/agenda-madrid
3. Toca el botón **Compartir** (cuadrado con flecha)
4. Scroll y selecciona **"Añadir a pantalla de inicio"**
5. Toca **"Añadir"**

¡Listo! Ahora tienes la app en tu iPhone 🎉

---

## 🔄 Actualizar la app con nuevos eventos

Cuando yo actualice `events.js` con nuevos eventos:

**Opción A: GitHub Desktop**
1. Abre GitHub Desktop
2. Click en "Fetch origin" arriba
3. Si hay cambios, click "Pull origin"
4. ¡Listo! La app se actualiza

**Opción B: Terminal**
```bash
git pull
```

Los cambios se publican automáticamente en GitHub Pages en 1-2 minutos.

---

## 📂 Estructura de archivos

```
agenda-madrid/
├── index.html       # Página principal
├── style.css        # Estilos
├── app.js          # Lógica de la app
├── events.js       # Base de datos de eventos (este es el que yo edito)
├── manifest.json   # Configuración PWA
└── README.md       # Este archivo
```

---

## 💾 Cómo funciona el guardado

La app usa **localStorage** para guardar eventos que añadas manualmente.

Los eventos en `events.js` son los "predeterminados" que yo añado.

Cuando abres la app por primera vez, carga los de `events.js`. Luego, cualquier cambio que hagas (añadir, editar, eliminar) se guarda en tu navegador.

---

## 🆘 Problemas comunes

### La app no carga
- Verifica que GitHub Pages esté activado
- Espera 2-3 minutos después de subir cambios
- Refresca la página con Cmd+R (Mac) o Ctrl+R (Windows)

### Los eventos no se guardan
- Verifica que no estés en modo incógnito
- Comprueba que el navegador permita localStorage

### No puedo instalarla en iPhone
- Asegúrate de usar **Safari** (no Chrome ni Firefox)
- iOS debe ser versión 11.3 o superior

---

¡Disfruta de la cultura madrileña! 🎭🎨🎵
