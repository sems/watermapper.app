const sharp = require("sharp");
const ico = require("sharp-ico");
const fsPromises = require("fs").promises;

const sourcePath = "./resources/icon-light.png";
const outputDir = "./resources/icons";
const faviconDimensions = [16, 24, 32, 64, 76, 120, 152, 180];

generateFavicons(sourcePath, outputDir)
    .then(() => console.log("Favicons generated successfully!"))
    .catch((err) => console.error("Error generating favicons:", err));

async function generateFavicons(sourcePath, outputDir) {
    try {
        await fsPromises.mkdir(outputDir, { recursive: true });

        const sharpInstances = await Promise.all(
            faviconDimensions.map(async (dimension) => {
                const outputFile = `${outputDir}/favicon-${dimension}x${dimension}.png`;
                await sharp(sourcePath)
                    .resize(dimension, dimension)
                    .toFile(outputFile);
                console.log(`Generated: ${outputFile}`);

                return sharp(outputFile);
            })
        );

        const icoOutputPath = `${outputDir}/favicon.ico`;
        const info = await ico.sharpsToIco(sharpInstances, icoOutputPath);
        console.log(`Generated ICO: ${icoOutputPath} (Size: ${info.size} bytes)`);
    } catch (err) {
        console.error("Error generating favicons:", err);
    }
}
