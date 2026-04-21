const CLOUD_NAME = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME as string | undefined;

export function img(src: string, width?: number): string {
  if (!CLOUD_NAME) return src;
  const transforms = ['f_auto', 'q_auto', ...(width ? [`w_${width}`] : [])].join(',');
  if (src.startsWith('http')) {
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch/${transforms}/${encodeURIComponent(src)}`;
  }
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${src.replace(/^\//, '')}`;
}
