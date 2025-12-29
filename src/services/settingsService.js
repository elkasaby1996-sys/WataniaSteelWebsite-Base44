import { supabase } from '@/lib/supabaseClient';

export const fetchSettings = async () => {
  const { data, error } = await supabase.from('settings').select('key,value_json');
  if (error) {
    throw new Error(error.message);
  }

  return (data || []).reduce((acc, setting) => {
    acc[setting.key] = setting.value_json;
    return acc;
  }, {});
};

export const upsertSetting = async (key, value) => {
  const { error } = await supabase.from('settings').upsert({ key, value_json: value });
  if (error) {
    throw new Error(error.message);
  }
};
