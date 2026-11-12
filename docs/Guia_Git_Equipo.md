# Guía de Git para el equipo

Pasos para configurar Git, descargar el proyecto y subir cambios. Los comandos se escriben en **Git Bash** (se instala junto con Git) o en la terminal de VS Code.

> **Regla principal:** nadie sube directo a `main`. Cada quien trabaja en su rama (`fase1/su-nombre`) y pide que se una con un Pull Request. Pablo revisa y une.

---

## 0. Antes de empezar (solo una vez)

1. Instalar **Git**: <https://git-scm.com/download/win> (dejar todo como viene y dar «Siguiente»).
2. Instalar **Node.js 22 LTS**: <https://nodejs.org>
3. **Aceptar la invitación** al repositorio que llegó por correo. Sin eso no se puede descargar ni subir nada.
4. Abrir **Git Bash** y comprobar que todo quedó instalado (cada comando debe mostrar un número de versión):

```bash
git --version
```

```bash
node --version
```

---

## 1. Configurar Git (solo una vez)

Cada quien pone **su nombre y el correo de su cuenta de GitHub**:

```bash
git config --global user.name "Tu Nombre"
```

```bash
git config --global user.email "tu-correo-de-github@ejemplo.com"
```

```bash
git config --global core.autocrlf true
```

```bash
git config --global init.defaultBranch main
```

---

## 2. Descargar el proyecto (solo una vez)

```bash
cd ~/Documents
```

```bash
git clone https://github.com/TheCubick/Proyecto_colegio-ing-civiles-web.git
```

```bash
cd Proyecto_colegio-ing-civiles-web/visuales
```

```bash
npm install
```

La primera vez que hagan `clone` o `push` se abre una ventana para **iniciar sesión en GitHub** desde el navegador. Inician sesión, autorizan y listo.

---

## 3. Crear su rama (una vez por fase)

Cambien `su-nombre` por el suyo, **sin acentos ni espacios**: `maria-fernanda`, `josue`, `ignacio`, `daniel`, `jocelyn`, `jose-maria`.

```bash
git checkout main
```

```bash
git pull
```

```bash
git checkout -b fase1/su-nombre
```

```bash
git push -u origin fase1/su-nombre
```

En la fase 2 se repite lo mismo, pero con `fase2/su-nombre`.

---

## 4. Todos los días al trabajar

### Al empezar: traer lo último de `main` a su rama

```bash
git checkout fase1/su-nombre
```

```bash
git pull origin main
```

### Ver el sitio en su computadora

Dentro de la carpeta `visuales`. El sitio se abre en <http://localhost:5173> (para detenerlo: `Ctrl + C`).

```bash
npm run dev
```

### Antes de subir: revisar que no haya errores

Los tres deben terminar sin errores. GitHub los vuelve a correr en cada Pull Request.

```bash
npm run lint
```

```bash
npm run build
```

```bash
npm run verificar
```

### Guardar y subir sus cambios

Siempre pongan el ID de su tarea en el mensaje (por ejemplo `F1-JB1`).

```bash
git add .
```

```bash
git commit -m "F1-XX: qué hice"
```

```bash
git push
```

---

## 5. Pedir que se una a `main` (Pull Request)

1. Entrar al repositorio en GitHub. Aparece un botón amarillo **«Compare & pull request»**.
2. Dar clic y revisar que diga **base: `main` ← compare: `fase1/su-nombre`**.
3. Título con el ID de la tarea, por ejemplo: `F1-JB1: tamaños de letra`. Llenar la plantilla.
4. Dar clic en **Create pull request**. Pablo lo revisa y lo une.

Si Pablo pide cambios, se hacen en la misma rama y se repite la sección «Guardar y subir sus cambios». El Pull Request se actualiza solo.

---

## Problemas comunes

| Mensaje o situación | Qué hacer |
|---|---|
| `Permission denied` o `Repository not found` | No han aceptado la invitación, o iniciaron sesión con otra cuenta de GitHub |
| `Please tell me who you are` | Les faltó el paso 1 (configurar nombre y correo) |
| `npm: command not found` | Falta instalar Node.js; después cierren y vuelvan a abrir Git Bash |
| `CONFLICT` al hacer `pull` | **No borren nada.** Avisen a Pablo |
| No saben en qué rama están | `git status` lo dice en la primera línea |
| `rejected` al hacer `push` a `main` | Es normal: `main` está protegida. Cambien a su rama con `git checkout fase1/su-nombre` |

## Cuidados

- Solo toquen **los archivos de su tarea** (vienen en `docs/Plan_Fases_Equipo.md` y `docs/Instrucciones_Tareas.md`).
- Nombres de archivos **sin espacios, sin «ñ» y sin acentos**.
- Imágenes de menos de 350 KB y 1600 px; videos de menos de 4 MB.
- Nunca suban contraseñas, claves ni datos personales.
