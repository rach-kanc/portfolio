import { supabase } from '../config/supabase.js';

export const api = {
  async getProfile() {
    const { data, error } = await supabase.from('profile').select('*').single();
    if (error && error.code !== 'PGRST116') console.error('Error fetching profile:', error);
    return data;
  },
  
  async getProjects() {
    const { data, error } = await supabase.from('projects')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) console.error('Error fetching projects:', error);
    return data;
  },

  async getCertificates() {
    const { data, error } = await supabase.from('certificates')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) console.error('Error fetching certificates:', error);
    return data;
  },

  async getLeadership() {
    const { data, error } = await supabase.from('leadership')
      .select('*')
      .order('priority', { ascending: true });
    if (error) console.error('Error fetching leadership:', error);
    return data;
  },

  async getEvents() {
    const { data, error } = await supabase.from('events')
      .select('*')
      .order('date', { ascending: false });
    if (error) console.error('Error fetching events:', error);
    return data;
  },

  async getSkills() {
    const { data, error } = await supabase.from('skills')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) console.error('Error fetching skills:', error);
    return data;
  },
  
  async getExperience() {
    const { data, error } = await supabase.from('experience')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) console.error('Error fetching experience:', error);
    return data;
  }
};
