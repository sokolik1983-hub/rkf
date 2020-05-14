const PrtScr = async (page, name) => {
    let h = await page.evaluate('document.body.scrollHeight');
    await page.setViewport({width: await page.viewport().width, height: h});
    await page.screenshot({path: `./tests/screenshots/${name}.png`});
}

export default PrtScr;
