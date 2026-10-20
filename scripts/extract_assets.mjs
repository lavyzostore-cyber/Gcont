import { execSync } from 'node:child_process';
import fs from 'node:fs';

const crops = [
  // Circle logo from profile picture: center is at x=166, y=177 in the screenshot
  { name: 'logo_circle.jpg', src: '/assets/aistudio/Screenshot_2026-10-20-20-46-50-63_1c337646f29875672b5a61192b9010f9_7e68eb1b.jpg', sx: 46, sy: 124, sw: 240, sh: 240 },
  // Alfa Romeo in driveway
  { name: 'alfa_romeo.jpg', src: '/assets/aistudio/Screenshot_2026-10-20-20-46-50-63_1c337646f29875672b5a61192b9010f9_7e68eb1b.jpg', sx: 360, sy: 1535, sw: 358, sh: 475 },
  // Black Suburban SUV
  { name: 'suburban_suv.jpg', src: '/assets/aistudio/Screenshot_2026-10-20-20-46-50-63_1c337646f29875672b5a61192b9010f9_7e68eb1b.jpg', sx: 0, sy: 1535, sw: 358, sh: 475 },
  // Silverado Snow Foam Truck
  { name: 'snow_foam_truck.jpg', src: '/assets/aistudio/Screenshot_2026-10-20-20-46-50-63_1c337646f29875672b5a61192b9010f9_7e68eb1b.jpg', sx: 722, sy: 1535, sw: 358, sh: 475 },
  // G Contreras Mobile Service Truck with Water Tank
  { name: 'mobile_rig_truck.jpg', src: '/assets/aistudio/Screenshot_2026-10-20-20-46-50-63_1c337646f29875672b5a61192b9010f9_7e68eb1b.jpg', sx: 360, sy: 2020, sw: 358, sh: 380 },
  // Chrome wheel detail
  { name: 'custom_wheel.jpg', src: '/assets/aistudio/Screenshot_2026-10-20-20-46-50-63_1c337646f29875672b5a61192b9010f9_7e68eb1b.jpg', sx: 554, sy: 450, sw: 200, sh: 200 },
  // Full Brand Logo Banner from Flyer (Screenshot 2: y=230 to 760)
  { name: 'flyer_brand_header.jpg', src: '/assets/aistudio/Screenshot_2026-10-20-20-50-47-09_1c337646f29875672b5a61192b9010f9_ee9d32ea.jpg', sx: 0, sy: 220, sw: 1080, sh: 580 },
  // Vehicles row from flyer
  { name: 'flyer_vehicle_lineup.jpg', src: '/assets/aistudio/Screenshot_2026-10-20-20-50-47-09_1c337646f29875672b5a61192b9010f9_ee9d32ea.jpg', sx: 0, sy: 400, sw: 1080, sh: 900 }
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
