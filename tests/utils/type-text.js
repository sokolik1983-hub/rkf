const TypeText = async (page, selector, text, pressEnter = false) => { 
    await page.focus(selector)
    await page.keyboard.type(text)
    await (pressEnter ? page.keyboard.type(String.fromCharCode(13)) : '')
}

export default TypeText;
