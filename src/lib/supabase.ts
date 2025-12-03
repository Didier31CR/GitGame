import { createClient } from '@supabase/supabase-js';

// Configura estas variables con tus credenciales de Supabase
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://tu-proyecto.supabase.co';
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'tu-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Tipos para la base de datos
export interface GameLevel {
  id: number;
  title: string;
  description: string;
  scenario: string;
  correctCommands: string[];
  hint: string;
  points: number;
  medal: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  totalPoints: number;
  levelsCompleted: number;
  medals: string[];
  createdAt: string;
}

export interface GameProgress {
  id: string;
  userId: string;
  levelId: number;
  completed: boolean;
  points: number;
  timeSpent: number;
  hintUsed: boolean;
  completedAt: string;
}

// Funciones de autenticación
export async function signUp(
  email: string,
  password: string,
  username: string
) {
  try {
    // Primero, intenta crear el usuario en auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      throw authError;
    }

    if (!authData.user) {
      throw new Error('No user returned from signup');
    }

    // Luego, crea el perfil en user_profiles
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: authData.user.id,
        username: username.trim() || email.split('@')[0],
        email: email.trim().toLowerCase(),
        totalpoints: 0,
        levelscompleted: 0,
      })
      .select();

    if (profileError) {
      console.error('Profile creation error:', profileError);
      throw new Error(`Error creating profile: ${profileError.message}`);
    }

    return { data: authData, error: null };
  } catch (err: any) {
    console.error('SignUp error:', err);
    return { data: null, error: err };
  }
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// Funciones para obtener niveles
export async function getLevels() {
  const { data, error } = await supabase.from('levels').select('*').order('id');
  return { data, error };
}

// Funciones para obtener perfil del usuario
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
}

// Funciones para actualizar progreso
export async function saveGameProgress(
  userId: string,
  levelId: number,
  points: number,
  timeSpent: number,
  hintUsed: boolean
) {
  const { data, error } = await supabase.from('game_progress').upsert({
    userid: userId,
    levelid: levelId,
    completed: true,
    points,
    timespent: timeSpent,
    hintused: hintUsed,
    completedat: new Date().toISOString(),
  });
  return { data, error };
}

// Obtener progreso del usuario
export async function getUserProgress(userId: string) {
  const { data, error } = await supabase
    .from('game_progress')
    .select('*')
    .eq('userid', userId)
    .order('levelid');
  return { data, error };
}

// Obtener tabla de puntuaciones
export async function getLeaderboard(limit: number = 10) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .order('totalPoints', { ascending: false })
    .limit(limit);
  return { data, error };
}

// Actualizar perfil del usuario
export async function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>
) {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('id', userId);
  return { data, error };
}
