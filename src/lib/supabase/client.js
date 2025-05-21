import { createClient } from '@supabase/supabase-js';

export const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL and anonymous key must be provided in environment variables');
  }
  
  return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabase = createSupabaseClient();

// Helper function to get user data
// supabaseClient.js

export async function getUserData() {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    console.error('No session found:', sessionError);
    return null;
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error('Error fetching user:', userError);
    return null;
  }

  return user;
}


// Helper function to save a roadmap to the database
export async function saveRoadmap(userId, roadmapData) {
  const { data, error } = await supabase
    .from('roadmaps')
    .insert([
      { 
        user_id: userId,
        current_job: roadmapData.currentJob,
        target_job: roadmapData.targetJob,
        timeframe: roadmapData.timeframe,
        roadmap_content: roadmapData.content,
        created_at: new Date().toISOString()
      }
    ])
    .select();

  if (error) {
    console.error('Error saving roadmap:', error);
    throw error;
  }
  
  return data[0];
}

// Helper function to get all roadmaps for a user
export async function getUserRoadmaps(userId) {
  const { data, error } = await supabase
    .from('roadmaps')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching roadmaps:', error);
    throw error;
  }
  
  return data;
}

// Helper function to get a specific roadmap by ID
export async function getRoadmapById(roadmapId) {
  const { data, error } = await supabase
    .from('roadmaps')
    .select('*')
    .eq('id', roadmapId)
    .single();

  if (error) {
    console.error('Error fetching roadmap:', error);
    throw error;
  }
  
  return data;
}