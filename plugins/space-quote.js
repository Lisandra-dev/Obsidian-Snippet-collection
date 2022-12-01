module.exports = {}

module.exports.onload = async (plugin) => {
    plugin.addCommand({
        id: 'space-quote',
        name: 'Ajuster les espaces avant les citations',
        checkCallback: async (checking) => {
            const actualOpenedFile = plugin.app.workspace.getActiveFile();
            if (actualOpenedFile && actualOpenedFile.extension === 'md') {
                if (!checking) {
                    let contents = await plugin.app.vault.read(actualOpenedFile);
                    contents = contents.replace(/^(>+)\s*/gm, `$1 `)
                    await plugin.app.vault.modify(actualOpenedFile, contents);
                }
                return true;
            }
            return false;
        }
    });
};