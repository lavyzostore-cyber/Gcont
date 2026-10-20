import { execSync } from 'node:child_process';
import fs from 'node:fs';

const crops = [
  // Exact metallic logo graphic banner from flyer
  { name: 'flyer_brand_logo.jpg', src: '/assets/aistudio/Screenshot_2026-10-20-20-50-47-09_1c337646f29875672b5a61192b9010f9_ee9d32ea.jpg', sx: 20, sy: 540, sw: 1040, sh: 380 },
  // Exact story highlight circle for "Rines" (Wheel):
  { name: 'custom_wheel.jpg', src: '/assets/aistudio/Screenshot_2026-10-20-20-46-50-63_1c337646f29875672b5a61192b9010f9_7e68eb1b.jpg', sx: 560, sy: 460, sw: 190, sh: 190 }
];

for (const c of crops) {
  const evalCode = `(() => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = '${c.src}';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = ${c.sw};
        canvas.height = ${c.sh};
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, ${c.sx}, ${c.sy}, ${c.sw}, ${c.sh}, 0, 0, ${c.sw}, ${c.sh});
        resolve(canvas.toDataURL('image/jpeg', 0.95));
      };
    });
  })()`;

  const output = execSync(`playwright-cli eval "${evalCode.replace(/"/g, '\\"')}"`, {
    encoding: 'utf-8',
    maxBuffer: 15 * 1024 * 1024
  });

  const match = output.match(/data:image\/jpeg;base64,([A-Za-z0-9+/=]+)/);
  if (match) {
    fs.writeFileSync(`public/assets/real/${c.name}`, Buffer.from(match[1], 'base64'));
    console.log(`Saved public/assets/real/${c.name}`);
  }
}
