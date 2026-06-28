/**
 * Utility to parse and serialize custom avatar details using the existing 'department' database column.
 * This avoids requiring Supabase DDL/schema modifications.
 */

export const parseProfile = (profile) => {
  if (!profile) return null;
  
  const deptStr = profile.department || '';
  const parts = deptStr.split('|||');
  
  return {
    ...profile,
    department: parts[0] || '',
    avatar_theme: parts[1] || '',
    avatar_icon: parts[2] || '',
    avatar_img: parts[3] || ''
  };
};

export const serializeDepartment = (department, theme, icon, img) => {
  const d = (department || '').trim();
  const t = (theme || '').trim();
  const c = (icon || '').trim();
  const i = (img || '').trim();
  return `${d}|||${t}|||${c}|||${i}`;
};
