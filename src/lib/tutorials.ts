export const TUTORIALS = {
  // NIVEL 1: Git Init
  git_init: {
    title: 'Inicializar un Repositorio Git',
    theory: `
Git es un sistema de control de versiones que permite rastrear cambios en tu código a lo largo del tiempo.
Un repositorio es una carpeta especial donde Git almacena todo el historial de cambios.

Para comenzar a usar Git en tu proyecto, necesitas inicializar un repositorio.
Esto crea una carpeta oculta ".git" que contiene toda la información de versión.

CONCEPTO CLAVE: El comando "git init" transforma una carpeta normal en un repositorio Git.
    `,
    examples: [
      {
        step: 1,
        description: 'Crear una carpeta para tu proyecto',
        command: 'mkdir mi-proyecto',
        output: '(crea la carpeta)',
      },
      {
        step: 2,
        description: 'Entrar a la carpeta',
        command: 'cd mi-proyecto',
        output: 'Ahora estás dentro de mi-proyecto/',
      },
      {
        step: 3,
        description: 'Inicializar Git',
        command: 'git init',
        output: 'Initialized empty Git repository in /ruta/a/mi-proyecto/.git/',
      },
    ],
    whyImportant:
      'Sin inicializar Git, no puedes rastrear cambios. Este es el primer paso de todo proyecto con Git.',
  },

  // NIVEL 2: Git Status
  git_status: {
    title: 'Ver el Estado del Repositorio',
    theory: `
Después de trabajar en tu proyecto, necesitas saber qué cambios has hecho.
"git status" muestra el estado actual del repositorio:
- Archivos no rastreados (nuevos)
- Archivos modificados
- Archivos listos para commit

Los colores rojo/verde indican:
- ROJO: Cambios sin preparar
- VERDE: Cambios listos para commit

CONCEPTO CLAVE: "git status" es tu brújula en Git. Úsalo frecuentemente.
    `,
    examples: [
      {
        step: 1,
        description: 'Crear un archivo nuevo',
        command: 'echo "console.log(\'Hola\');" > app.js',
        output: '(archivo creado)',
      },
      {
        step: 2,
        description: 'Ver el estado (archivo sin rastrear)',
        command: 'git status',
        output: `On branch main
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        app.js

nothing added to commit but untracked files present (use "git add" to track)`,
      },
    ],
    whyImportant:
      'Saber el estado es crucial para no perder cambios o hacer commits incompletos.',
  },

  // NIVEL 3: Git Add
  git_add: {
    title: 'Preparar Archivos para Commit',
    theory: `
Git tiene dos áreas principales:
1. WORKING DIRECTORY: Donde trabajas en los archivos (modificados pero sin guardar)
2. STAGING AREA: Área de preparación donde pones los cambios que quieres guardar

"git add" mueve archivos del working directory al staging area.
Es como empacar lo que quieres guardar antes de hacer commit.

VARIANTES:
- "git add archivo.txt" → prepara un archivo específico
- "git add ." → prepara TODOS los cambios
- "git add *.js" → prepara todos los .js

CONCEPTO CLAVE: El staging area te permite elegir exactamente qué guardar en cada commit.
    `,
    examples: [
      {
        step: 1,
        description: 'Modificar varios archivos',
        command: 'echo "v2" > app.js && echo "data" > data.json',
        output: '(archivos modificados)',
      },
      {
        step: 2,
        description: 'Ver estado (todo rojo/sin preparar)',
        command: 'git status',
        output: `modified: app.js
modified: data.json`,
      },
      {
        step: 3,
        description: 'Preparar solo app.js',
        command: 'git add app.js',
        output: '(app.js ahora en verde)',
      },
      {
        step: 4,
        description: 'Ver estado (mezcla de rojo y verde)',
        command: 'git status',
        output: `Changes to be committed:
  modified: app.js
Changes not staged for commit:
  modified: data.json`,
      },
    ],
    whyImportant:
      'El staging area te da control granular sobre tus commits. Puedes hacer commits lógicos y coherentes.',
  },

  // NIVEL 4: Git Commit
  git_commit: {
    title: 'Guardar Cambios Permanentemente',
    theory: `
Un COMMIT es una fotografía (snapshot) de tu proyecto en un momento específico.
Cada commit tiene:
- Un mensaje que describe qué cambió
- Un autor (tu nombre)
- Una fecha/hora
- Un ID único (hash SHA-1)

BUENOS MENSAJES DE COMMIT:
- ✅ "Agregar validación de email en registro"
- ✅ "Corregir bug en cálculo de total"
- ❌ "Cambios varios"
- ❌ "Fix"

CONVENCIÓN COMÚN (Conventional Commits):
- feat: nueva característica
- fix: corrección de bug
- docs: documentación
- refactor: cambio sin agregar función

CONCEPTO CLAVE: Los commits son el corazón de Git. Son momentos en el tiempo que puedes recuperar.
    `,
    examples: [
      {
        step: 1,
        description: 'Preparar cambios',
        command: 'git add .',
        output: '(todos los cambios preparados)',
      },
      {
        step: 2,
        description: 'Hacer commit con mensaje corto',
        command: 'git commit -m "Agregar validación de email"',
        output: `[main 1a2b3c4] Agregar validación de email
 1 file changed, 5 insertions(+)`,
      },
      {
        step: 3,
        description: 'Ver el commit en el historial',
        command: 'git log',
        output: `commit 1a2b3c4d5e6f7g8h9i0j (HEAD -> main)
Author: Tu Nombre <tu@email.com>
Date:   Mon Dec 2 15:30:00 2024

    Agregar validación de email`,
      },
    ],
    whyImportant:
      'Los commits son tu red de seguridad. Puedes volver atrás si algo sale mal.',
  },

  // NIVEL 5: Git Log
  git_log: {
    title: 'Ver el Historial de Cambios',
    theory: `
"git log" muestra el historial de todos los commits en tu rama actual.
Cada entrada muestra:
- commit ID (hash único)
- Author: quién hizo el cambio
- Date: cuándo
- Mensaje: qué cambió

VARIANTES ÚTILES:
- "git log" → historial completo
- "git log --oneline" → formato compacto
- "git log --graph --all" → árbol visual de ramas
- "git log -5" → últimos 5 commits
- "git log --author='nombre'" → commits de un autor

CONCEPTO CLAVE: El historial es tu libro de auditoría. Muestra la evolución completa del proyecto.
    `,
    examples: [
      {
        step: 1,
        description: 'Ver historial completo',
        command: 'git log',
        output: `commit 1a2b3c4d5e6f7g8h9i0j (HEAD -> main)
Author: Tu Nombre <tu@email.com>
Date:   Mon Dec 2 15:30:00 2024
    Agregar validación de email

commit 9i0j1a2b3c4d5e6f7g8h
Author: Tu Nombre <tu@email.com>
Date:   Mon Dec 2 14:20:00 2024
    Crear archivo inicial`,
      },
      {
        step: 2,
        description: 'Ver historial en formato compacto',
        command: 'git log --oneline',
        output: `1a2b3c4 Agregar validación de email
9i0j1a2 Crear archivo inicial`,
      },
    ],
    whyImportant:
      'Entender el historial te ayuda a entender cómo evolucionó tu proyecto y quién hizo cada cambio.',
  },

  // NIVEL 6: Ramas (Branching)
  git_branches: {
    title: 'Trabajar en Paralelo con Ramas',
    theory: `
Una RAMA es una línea independiente de desarrollo.
Imagina un árbol: el tronco es main/master, y las ramas son líneas de trabajo separadas.

CASOS DE USO:
- main/master: código estable en producción
- develop: código en desarrollo
- feature/nueva-funcionalidad: trabajar en algo nuevo
- bugfix/error-critico: arreglar un error

VENTAJAS:
- Varias personas pueden trabajar en paralelo
- Cambios aislados sin afectar main
- Fácil de revertir si algo sale mal

FLUJO TÍPICO:
1. Crear rama feature desde main
2. Trabajar y hacer commits en feature
3. Hacer Pull Request (PR)
4. Fusionar en main

CONCEPTO CLAVE: Las ramas permiten colaboración sin caos. Es fundamental en equipos.
    `,
    examples: [
      {
        step: 1,
        description: 'Ver rama actual (main/master)',
        command: 'git branch',
        output: '* main',
      },
      {
        step: 2,
        description: 'Crear nueva rama',
        command: 'git branch feature/login',
        output: '(rama creada)',
      },
      {
        step: 3,
        description: 'Ver ambas ramas',
        command: 'git branch',
        output: `  feature/login
* main`,
      },
      {
        step: 4,
        description: 'Cambiar a la nueva rama',
        command: 'git checkout feature/login',
        output: 'Switched to branch "feature/login"',
      },
      {
        step: 5,
        description: 'Ahora estás en feature/login',
        command: 'git branch',
        output: `* feature/login
  main`,
      },
    ],
    whyImportant:
      'Las ramas son esenciales para colaboración y mantenimiento de código limpio.',
  },

  // NIVEL 7: Merge
  git_merge: {
    title: 'Fusionar Ramas',
    theory: `
El MERGE es el proceso de integrar cambios de una rama a otra.
Típicamente fusionas tu rama feature a main cuando terminas.

TIPOS DE MERGE:
1. FAST-FORWARD: Si no hay conflictos, Git solo mueve el puntero
2. MERGE COMMIT: Si hay cambios en ambas ramas, Git crea un commit de merge

CONFLICTOS:
Si dos ramas modifican el mismo archivo en el mismo lugar, hay CONFLICTO.
Debes resolverlo manualmente eligiendo qué código mantener.

FLUJO:
1. Asegúrate de estar en la rama destino (main)
2. Ejecuta "git merge feature/rama"
3. Si hay conflictos, resuélvelos
4. Haz commit

CONCEPTO CLAVE: El merge es cómo integras trabajo en paralelo. Domínalo para colaboración efectiva.
    `,
    examples: [
      {
        step: 1,
        description: 'En feature/login, hacer cambios',
        command:
          'echo "function login() {}" > login.js && git add . && git commit -m "Agregar login"',
        output: '[feature/login abc123] Agregar login',
      },
      {
        step: 2,
        description: 'Cambiar a main',
        command: 'git checkout main',
        output: 'Switched to branch "main"',
      },
      {
        step: 3,
        description: 'Fusionar feature/login',
        command: 'git merge feature/login',
        output: `Updating 1a2b3c4..abc123
Fast-forward
 login.js | 1 +
 1 file changed, 1 insertion(+)`,
      },
    ],
    whyImportant:
      'El merge es cómo todo el trabajo viene junto. Es crítico en desarrollo en equipo.',
  },

  // NIVEL 8: Push
  git_push: {
    title: 'Enviar Cambios al Servidor Remoto',
    theory: `
El PUSH envía tus commits locales a un repositorio remoto (como GitHub).
Requiere conexión a internet y permisos en el repositorio remoto.

CONCEPTOS:
- LOCAL: tu computadora
- REMOTO: servidor (GitHub, GitLab, Bitbucket)
- ORIGIN: nombre por defecto del repositorio remoto principal

SINTAXIS:
- "git push" → envía cambios de rama actual
- "git push origin main" → especifica remoto y rama
- "git push origin feature/nueva" → envía rama nueva

ANTES DE PUSHEAR:
1. Asegúrate de que tus commits estén listos
2. Es buena práctica hacer "git pull" primero
3. Resuelve cualquier conflicto

CONCEPTO CLAVE: El push es cómo compartes tu trabajo con el equipo. Sin push, nadie más ve tus cambios.
    `,
    examples: [
      {
        step: 1,
        description: 'Hacer un commit',
        command: 'git add . && git commit -m "Agregar feature nueva"',
        output: '[main abc123] Agregar feature nueva',
      },
      {
        step: 2,
        description: 'Ver ramas remotas',
        command: 'git branch -r',
        output: 'origin/main',
      },
      {
        step: 3,
        description: 'Enviar cambios',
        command: 'git push origin main',
        output: `Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Delta compression using up to 4 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (2/2), 250 bytes
To github.com:usuario/repo.git
   1a2b3c4..abc123  main -> main`,
      },
    ],
    whyImportant:
      'Sin push, tu trabajo solo existe en tu máquina. El push lo hace disponible para otros.',
  },

  // NIVEL 9: Pull
  git_pull: {
    title: 'Obtener Cambios del Servidor Remoto',
    theory: `
El PULL trae los cambios del repositorio remoto a tu máquina local.
Es lo opuesto a push: recibir en lugar de enviar.

CÓMO FUNCIONA:
1. Git obtiene cambios del remoto (git fetch)
2. Git fusiona esos cambios en tu rama (git merge)

IMPORTANTE:
Pull = Fetch + Merge en un paso

FLUJO DE EQUIPO:
1. Compañero hace push de cambios
2. Tú haces pull para actualizar
3. Trabajas en tu copia actualizada
4. Haces push de tus cambios

ANTES DE TRABAJAR:
Siempre es buena práctica hacer pull primero para evitar conflictos.

CONCEPTO CLAVE: El pull te mantiene sincronizado con el equipo. Sin pull, trabajas con código desactualizado.
    `,
    examples: [
      {
        step: 1,
        description: 'Ver cambios disponibles sin descargar',
        command: 'git fetch',
        output: 'remote: Counting objects: 3, done.',
      },
      {
        step: 2,
        description: 'Traer cambios a tu rama',
        command: 'git pull origin main',
        output: `Updating 1a2b3c4..abc123
Fast-forward
 utils.js | 10 ++++++++
 1 file changed, 10 insertions(+)`,
      },
    ],
    whyImportant:
      'El pull sincroniza tu código con el remoto. Es fundamental para no perder cambios de otros.',
  },
};

export const LEVEL_THEORY = {
  1: TUTORIALS.git_init,
  2: TUTORIALS.git_status,
  3: TUTORIALS.git_add,
  4: TUTORIALS.git_commit,
  5: TUTORIALS.git_log,
  6: TUTORIALS.git_branches,
  8: TUTORIALS.git_merge,
  9: TUTORIALS.git_push,
  10: TUTORIALS.git_pull,
};
