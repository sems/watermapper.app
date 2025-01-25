const sharp = require("sharp");
const ico = require("sharp-ico");

const sourcePath = "./resources/icon-light.png";
const outputDir = "./resources";
const faviconDimensions = [16, 24, 32, 64];

generateFavicons(sourcePath, outputDir)
    .then(() => console.log("Favicons generated successfully!"))
    .catch((err) => console.error("Error generating favicons:", err));

async function generateFavicons(sourcePath, outputDir) {
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
    await ico
        .sharpsToIco(sharpInstances, icoOutputPath)
        .then((info) => {
            console.log(`Generated ICO: ${icoOutputPath} (Size: ${info.size} bytes)`);
        })
        .catch((err) => {
            throw new Error(`Error creating ICO file: ${err.message}`);
        });
}
