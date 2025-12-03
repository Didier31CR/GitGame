# 🚀 Guía de Inicio Rápido - GitGame React + Supabase

## Paso 1: Configurar Supabase

### 1.1 Crear Proyecto en Supabase

1. Ve a https://supabase.com y crea una cuenta
2. Crea un nuevo proyecto (nota el nombre, región y contraseña)
3. Espera a que se cree el proyecto (2-3 minutos)

### 1.2 Obtener Credenciales

1. En el dashboard, ve a **Settings > API**
2. Copia:
   - `Project URL` → Será tu `VITE_SUPABASE_URL`
   - `anon` key → Será tu `VITE_SUPABASE_ANON_KEY`

### 1.3 Crear Archivo `.env.local`

En la carpeta raíz del proyecto, crea un archivo `.env.local`:

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...tu-key
```

## Paso 2: Configurar Base de Datos

### 2.1 Ejecutar SQL

1. En Supabase, ve a **SQL Editor**
2. Haz clic en **New Query**
3. Copia y pega el siguiente código:

```sql
-- Tabla de perfiles de usuario
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  totalPoints INTEGER DEFAULT 0,
  levelsCompleted INTEGER DEFAULT 0,
  createdAt TIMESTAMP DEFAULT NOW()
);

-- Tabla de progreso del juego
CREATE TABLE IF NOT EXISTS game_progress (
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

-- Índices para rendimiento
CREATE INDEX IF NOT EXISTS idx_game_progress_userId ON game_progress(userId);
CREATE INDEX IF NOT EXISTS idx_game_progress_levelId ON game_progress(levelId);

-- Habilitar Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_progress ENABLE ROW LEVEL SECURITY;
```

4. Haz clic en **Run** (botón azul con ▶️)

### 2.2 Configurar Políticas de Seguridad

Ejecuta cada query en el SQL Editor:

**Para `user_profiles`:**

```sql
CREATE POLICY "Users can read their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can read profiles" ON user_profiles
  FOR SELECT USING (true);
```

**Para `game_progress`:**

```sql
CREATE POLICY "Users can read their own progress" ON game_progress
  FOR SELECT USING (auth.uid() = userId);

CREATE POLICY "Users can insert their progress" ON game_progress
  FOR INSERT WITH CHECK (auth.uid() = userId);

CREATE POLICY "Users can update their progress" ON game_progress
  FOR UPDATE USING (auth.uid() = userId);
```

### 2.3 Crear Trigger para Crear Perfil Automático

```sql
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, username, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'username', NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_user_profile();
```

## Paso 3: Ejecutar el Proyecto

### 3.1 Terminal

```bash
cd c:\Users\Didie\OneDrive\Documents\GitGame
npm run dev
```

### 3.2 Espera el Mensaje

Deberías ver algo como:

```
VITE v7.2.6  ready in 456 ms

➜  Local:   http://localhost:3000/
```

### 3.3 Acceder

- Abre tu navegador en `http://localhost:3000`
- La aplicación se abrirá automáticamente

## Paso 4: Probar la Aplicación

1. **Crear Cuenta**

   - Haz clic en "Iniciar Sesión"
   - Selecciona "Crear Cuenta"
   - Completa el formulario
   - Verifica tu email (mira tu carpeta de spam)

2. **Jugar**

   - Inicia sesión
   - Haz clic en "Comenzar Juego"
   - Resuelve el primer desafío

3. **Ver Progreso**
   - Haz clic en "Puntuación"
   - Verás tus puntos y medallas

## 🎯 Características Principales

- ✅ Autenticación con Supabase
- ✅ 10 niveles de dificultad progresiva
- ✅ Sistema de puntos y medallas
- ✅ Tabla de puntuaciones global
- ✅ Persistencia de datos
- ✅ Interfaz moderna y responsiva

## 🆘 Solución de Problemas

### Error: "Cannot find module '@supabase/supabase-js'"

```bash
npm install @supabase/supabase-js
```

### Error: Variables de entorno no encontradas

- Verifica que `.env.local` existe en la carpeta raíz
- Reinicia el servidor (`Ctrl+C` y `npm run dev`)

### Error: "Unauthorized" en Supabase

- Verifica que las políticas RLS están creadas
- Confirma que el UUID en el JWT coincide

### La tabla no existe

- Ejecuta de nuevo el SQL de creación de tablas
- Verifica que el SQL no tuvo errores

## 📚 Próximos Pasos

1. **Deploy a Producción**

   ```bash
   npm run build
   ```

   Luego sube la carpeta `dist/` a Vercel, Netlify u otro hosting

2. **Agregar Más Niveles**

   - Edita `src/lib/levels.ts`
   - Agrega nuevos objetos al array `GAME_LEVELS`

3. **Personalizar Estilos**
   - Edita los archivos `.css` en `src/pages/` y `src/components/`

## 🎓 Documentación Útil

- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Git Docs](https://git-scm.com/doc)

## 💡 Tips

- Usa `npm run preview` para ver la build de producción localmente
- Los cambios en TypeScript requieren reiniciar el servidor
- Limpia el cache del navegador si algo se ve raro

---

¡Listo! Tu GitGame está configurado y listo para jugar. 🎮✨
