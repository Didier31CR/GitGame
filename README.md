# GitGame - React + Supabase 🎮

Un juego interactivo para aprender Git construido con React, TypeScript y Supabase.

## 🚀 Características

- **Autenticación con Supabase**: Sistema seguro de registro e inicio de sesión
- **10 Niveles Progresivos**: Desde conceptos básicos hasta operaciones avanzadas
- **Sistema de Puntos**: Gana puntos por resolver desafíos correctamente
- **Tabla de Puntuaciones Global**: Compite con otros jugadores
- **Medallas y Logros**: Desbloquea medallas especiales
- **Persistencia en Base de Datos**: Tu progreso se guarda en Supabase
- **Interfaz Moderna**: Diseño responsivo y atractivo
- **TypeScript**: Código tipado y seguro

## 📋 Requisitos

- Node.js 16+
- npm o yarn
- Una cuenta en Supabase

## 🛠️ Instalación

### 1. Clonar o descargar el proyecto

```bash
cd GitGame
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Supabase

1. Crea una cuenta en [Supabase](https://supabase.com)
2. Crea un nuevo proyecto
3. Copia tu URL y clave anon (clave pública)
4. Crea un archivo `.env.local` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

### 4. Configurar la base de datos

Ejecuta las siguientes queries en el SQL Editor de Supabase:

```sql
-- Tabla de perfiles de usuario
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  totalPoints INTEGER DEFAULT 0,
  levelsCompleted INTEGER DEFAULT 0,
  createdAt TIMESTAMP DEFAULT NOW()
);

-- Tabla de progreso del juego
CREATE TABLE game_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  userId UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  levelId INTEGER NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  points INTEGER DEFAULT 0,
  timeSpent INTEGER DEFAULT 0,
  hintUsed BOOLEAN DEFAULT FALSE,
  completedAt TIMESTAMP DEFAULT NOW(),
  UNIQUE(userId, levelId)
);

-- Tabla de niveles (opcional, para gestión desde BD)
CREATE TABLE levels (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  scenario TEXT NOT NULL,
  hint TEXT NOT NULL,
  points INTEGER NOT NULL,
  medal TEXT NOT NULL
);

-- Índices para rendimiento
CREATE INDEX idx_game_progress_userId ON game_progress(userId);
CREATE INDEX idx_game_progress_levelId ON game_progress(levelId);
```

### 5. Habilitar políticas de seguridad

En Supabase, ve a Authentication > Policies y configura:

```sql
-- Para user_profiles
CREATE POLICY "Users can read their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Para game_progress
CREATE POLICY "Users can read their own progress" ON game_progress
  FOR SELECT USING (auth.uid() = userId);

CREATE POLICY "Users can insert their progress" ON game_progress
  FOR INSERT WITH CHECK (auth.uid() = userId);

CREATE POLICY "Users can update their progress" ON game_progress
  FOR UPDATE USING (auth.uid() = userId);
```

## 🎮 Iniciar el Desarrollo

```bash
npm run dev
```

El proyecto se abrirá automáticamente en `http://localhost:3000`

## 📦 Compilar para Producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`

## 📁 Estructura del Proyecto

```
src/
├── components/        # Componentes reutilizables
│   └── Navbar.tsx
├── pages/            # Páginas principales
│   ├── Home.tsx
│   ├── Auth.tsx
│   ├── Game.tsx
│   ├── Tutorial.tsx
│   └── Leaderboard.tsx
├── lib/              # Utilidades y configuración
│   ├── supabase.ts   # Configuración de Supabase
│   └── levels.ts     # Datos de niveles
├── styles/           # Estilos globales
├── App.tsx           # Componente principal
└── main.tsx          # Punto de entrada
```

## 🎓 Contenido Educativo

### Niveles del Juego

1. **Iniciar un Repositorio** - `git init`
2. **Ver el Estado** - `git status`
3. **Agregar Archivos** - `git add`
4. **Hacer Commit** - `git commit`
5. **Ver el Historial** - `git log`
6. **Crear una Rama** - `git checkout -b`
7. **Cambiar de Rama** - `git checkout`
8. **Fusionar Ramas** - `git merge`
9. **Enviar Cambios** - `git push`
10. **Obtener Cambios** - `git pull`

## 🔧 Tecnologías Utilizadas

- **React 19** - Interfaz de usuario
- **TypeScript** - Tipado estático
- **Vite** - Constructor rápido
- **React Router** - Enrutamiento
- **Supabase** - Backend y autenticación
- **CSS3** - Estilos modernos

## 🚀 Deploy

### Opción 1: Vercel

```bash
npm install -g vercel
vercel
```

### Opción 2: Netlify

```bash
npm run build
# Arrastra la carpeta dist a Netlify
```

### Opción 3: GitHub Pages

Actualiza `vite.config.ts` y ejecuta:

```bash
npm run build
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la licencia MIT.

## 👨‍💻 Soporte

Para reportar problemas o sugerencias, crea un issue en el repositorio.

---

**¡Disfruta aprendiendo Git con GitGame!** 🎉
