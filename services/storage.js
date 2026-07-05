import { supabase } from '../config/supabase.js';

export const storage = {
  async uploadFile(folder, file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from('portfolio-media')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      throw uploadError;
    }

    const { data: publicUrlData } = supabase.storage
      .from('portfolio-media')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  },

  async removeFile(url) {
    if (!url) return;
    
    try {
      const urlParts = url.split('/portfolio-media/');
      if (urlParts.length === 2) {
        const filePath = urlParts[1];
        const { error } = await supabase.storage
          .from('portfolio-media')
          .remove([filePath]);
          
        if (error) {
          console.error('Error removing file:', error);
        }
      }
    } catch (err) {
      console.error('Failed to parse and remove file:', err);
    }
  }
};
