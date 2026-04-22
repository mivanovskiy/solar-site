const CLOUD_NAME = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME as string | undefined;

// Maps Cloudinary public IDs → local public/ fallback paths (used when env var isn't set)
const LOCAL_FALLBACKS: Record<string, string> = {
  "finished-installation_oe9con": "/images/photos/finished-installation.JPG",
  "finished-installation-2_buanra": "/images/photos/finished-installation-2.JPG",
  "finished-installation-3_ja63dr": "/images/photos/finished-installation-3.jpg",
  "finished-installation-top-view_abh6wg": "/images/photos/finished-installation-top-view.PNG",
  "intallation-in-progress_mbkjjk": "/images/photos/intallation-in-progress.JPG",
  "battery_pqgy0t": "/images/photos/battery.png",
};

export function img(src: string, width?: number): string {
  if (!CLOUD_NAME) {
    // Fall back to committed local file if we have a mapping, else pass through
    return LOCAL_FALLBACKS[src] ?? src;
  }
  const transforms = ["f_auto", "q_auto", ...(width ? [`w_${width}`] : [])].join(",");
  if (src.startsWith("http")) {
    // External URL — use Cloudinary fetch
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch/${transforms}/${encodeURIComponent(src)}`;
  }
  // Cloudinary public ID or local path — use upload delivery
  const publicId = src.replace(/^\//, ""); // strip leading slash if present
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}
