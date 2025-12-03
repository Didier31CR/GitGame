# Guía de Instalación de GitGame - React + Supabase

## 📋 Requisitos Previos

- Node.js 16+ ([Descargar](https://nodejs.org/))
- Git instalado ([Descargar](https://git-scm.com/))
- Cuenta en Supabase ([Crear](https://supabase.com))

## 🚀 Pasos de Instalación

### 1. Verificar Node.js y npm

```powershell
node --version  # Debería ser v16 o superior
npm --version   # Debería ser 7 o superior
```

### 2. Navegar a la carpeta del proyecto

```powershell
cd "C:\Users\Didie\OneDrive\Documents\GitGame"
```

### 3. Instalar dependencias (ya hecho)

```powershell
npm install
```

### 4. Crear cuenta en Supabase

1. Ve a https://supabase.com
2. Haz clic en "Sign Up"
3. Crea un nuevo proyecto
4. Espera 2-3 minutos a que se configure

### 5. Configurar variables de entorno

1. Obtén tus credenciales de Supabase:

   - Ve a Settings > API
   - Copia "Project URL"
   - Copia "anon" key

2. Crea archivo `.env.local` en la carpeta raíz:

```powershell
# En PowerShell, usa este comando:
Add-Content -Path ".env.local" -Value "VITE_SUPABASE_URL=https://tu-proyecto.supabase.co"
Add-Content -Path ".env.local" -Value "VITE_SUPABASE_ANON_KEY=tu-anon-key"
```

### 6. Configurar Base de Datos en Supabase

1. Abre Supabase > Tu Proyecto > SQL Editor
2. Haz clic en "New Query"
3. Copia y ejecuta el SQL desde `SETUP_DB.sql` (ver abajo)
4. Ejecuta cada query

### 7. Iniciar el servidor de desarrollo

```powershell
npm run dev
```

Deberías ver algo como:

```
VITE v7.2.6  ready in 456 ms

➜  Local:   http://localhost:3000/
```

4. Abre http://localhost:3000 en tu navegador

## 📝 SQL para Supabase

Copia este SQL en Supabase > SQL Editor:

```sql
-- Crear tabla de perfiles
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  totalPoints INTEGER DEFAULT 0,
  levelsCompleted INTEGER DEFAULT 0,
  createdAt TIMESTAMP DEFAULT NOW()
);

-- Crear tabla de progreso
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

-- Crear índices
CREATE INDEX idx_game_progress_userId ON game_progress(userId);
CREATE INDEX idx_game_progress_levelId ON game_progress(levelId);

-- Habilitar RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_progress ENABLE ROW LEVEL SECURITY;

-- Crear políticas
CREATE POLICY "Users can read their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can read profiles" ON user_profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can read their own progress" ON game_progress
  FOR SELECT USING (auth.uid() = userId);

CREATE POLICY "Users can insert their progress" ON game_progress
  FOR INSERT WITH CHECK (auth.uid() = userId);

CREATE POLICY "Users can update their progress" ON game_progress
  FOR UPDATE USING (auth.uid() = userId);

-- Crear trigger para perfiles automáticos
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

## 🧪 Probar la Aplicación

1. **Crear una cuenta**

   - Haz clic en "Iniciar Sesión"
   - Selecciona "Crear Cuenta"
   - Completa los datos
   - Verifica tu email

2. **Jugar**

   - Inicia sesión
   - Haz clic en "Jugar"
   - Completa los desafíos

3. **Ver puntuación**
   - Haz clic en "Puntuación"

## 🏗️ Compilar para Producción

```powershell
npm run build
```

La carpeta `dist/` contendrá tu aplicación compilada lista para deploy.

## 📦 Scripts Disponibles

```powershell
npm run dev      # Iniciar servidor de desarrollo
npm run build    # Compilar para producción
npm run preview  # Previsualizar build de producción
```

## 📚 Estructura del Proyecto

```
GitGame/
├── src/
│   ├── components/     # Componentes React
│   ├── pages/          # Páginas de la app
│   ├── lib/            # Lógica y utilidades
│   ├── App.tsx         # Componente principal
│   └── main.tsx        # Punto de entrada
├── public/             # Archivos estáticos
├── index.html          # HTML principal
├── vite.config.ts      # Config de Vite
├── tsconfig.json       # Config de TypeScript
├── package.json        # Dependencias
└── .env.local          # Variables de entorno
```

## 🎯 Próximos Pasos

1. **Personalizar el juego**

   - Edita `src/lib/levels.ts` para agregar más niveles
   - Modifica los estilos en `src/pages/*.css`

2. **Deploy**

   - Vercel: `npm install -g vercel && vercel`
   - Netlify: Sube la carpeta `dist/`

3. **Agregar features**
   - Sistema de logros
   - Multijugador
   - Guardado en el navegador

## 🆘 Ayuda

Si encuentras problemas:

1. Verifica que las variables de entorno están correctas
2. Limpia cache: `npm cache clean --force`
3. Reinstala: `rm -r node_modules && npm install`
4. Revisa la consola del navegador (F12 > Console)

## 📞 Contacto

Para más ayuda, consulta:

- [Documentación de Supabase](https://supabase.com/docs)
- [Documentación de React](https://react.dev)
- [Documentación de Vite](https://vitejs.dev)

---

¡Listo! Tu GitGame está configurado. 🎮✨
