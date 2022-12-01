module.exports = {}

module.exports.onload = async (plugin) => {
    async function copyFilePath(file, vault) {
        file = file.path.replaceAll('/', '\\');
        vault = plugin.app.vault.adapter.basePath;
        path = `${vault}\\${file}`;
        await navigator.clipboard.writeText(path);
        await new Notice('File path copied to clipboard');
    }

    async function copyFolderPath(file) {
        file = file.path.replaceAll('/', '\\').replace(file.name, '');
        vault = plugin.app.vault.adapter.basePath;
        path = `${vault}\\${file}`;
        await navigator.clipboard.writeText(path);
        await new Notice('Folder path copied to clipboard');
    }

    plugin.registerEvent(
        plugin.app.workspace.on('file-menu', (menu, file)=>{
            menu.addSeparator();
            menu.addItem((item) => {
                if (file.extension !== undefined) {
                    item.setTitle('Copy file path');
                    item.setIcon('link');
                    item.onClick(async () => {
                        await copyFilePath(file);
                    });
                }
        })}));
    plugin.registerEvent(
        plugin.app.workspace.on('file-menu', (menu, file)=>{
            menu.addItem((item) => {
                item.setTitle('Copy folder path');
                item.setIcon('link');
                item.onClick(async () => {
                    await copyFolderPath(file);
                })
            })
        })
    );
    plugin.registerEvent(
        plugin.app.workspace.on('editor-menu', (menu, editor, view)=>{
            menu.addSeparator();
            menu.addItem((item) => {
                item.setTitle('Copy file path');
                item.setIcon('link');
                item.onClick(async () => {
                    await copyFilePath(view.file);
                })
            })
        })
    );
    plugin.registerEvent(
        plugin.app.workspace.on('editor-menu', (menu, editor, view)=>{
            menu.addItem((item) => {
                item.setTitle('Copy folder path');
                item.setIcon('link');
                item.onClick(async () => {
                    await copyFolderPath(view.file);
                })
            })
        })
    );
}