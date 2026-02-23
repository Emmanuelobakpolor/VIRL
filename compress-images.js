const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'assets/img';
const outputDir = 'assets/img/compressed';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const compressImage = async (filePath, outputPath) => {
    try {
        const metadata = await sharp(filePath).metadata();
        
        if (metadata.width && metadata.width > 800) {
            await sharp(filePath)
                .resize(800, null, { fit: 'inside', withoutEnlargement: true })
                .jpeg({ quality: 70, progressive: true })
                .toFile(outputPath);
            console.log(`Compressed: ${path.basename(filePath)}`);
        } else {
            await sharp(filePath)
                .jpeg({ quality: 70, progressive: true })
                .toFile(outputPath);
            console.log(`Compressed (no resize): ${path.basename(filePath)}`);
        }
        
    } catch (error) {
        console.error(`Error compressing ${path.basename(filePath)}:`, error);
    }
};

const processDirectory = async (dir) => {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        
        if (stats.isDirectory()) {
            const subOutputDir = path.join(outputDir, file);
            if (!fs.existsSync(subOutputDir)) {
                fs.mkdirSync(subOutputDir, { recursive: true });
            }
            await processDirectory(filePath);
        } else if (/\.(jpe?g|png|webp)$/i.test(file)) {
            const outputPath = path.join(outputDir, file);
            await compressImage(filePath, outputPath);
        }
    }
};

const main = async () => {
    console.log('Starting image compression...');
    console.log(`Input directory: ${inputDir}`);
    console.log(`Output directory: ${outputDir}`);
    
    const start = Date.now();
    
    await processDirectory(inputDir);
    
    const end = Date.now();
    const duration = (end - start) / 1000;
    
    console.log(`\nCompression completed in ${duration.toFixed(2)} seconds!`);
    console.log('All images compressed to 70% quality with max width 800px');
};

main();
