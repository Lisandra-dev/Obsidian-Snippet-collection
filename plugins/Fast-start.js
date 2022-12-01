module.exports = {}

module.exports.onload = async (plugin) => {
    plugin.addCommand({
        id: 'List-plugins',
        name: 'List installed plugins',
        checkCallback: async (checking) => {
            var plugins = Object.values(plugin.app.plugins.manifests).map(p=>p.id).sort((a, b)=>a.localeCompare(b));
            let written = [];
            const actualOpenedFile = plugin.app.workspace.getActiveFile();
            if (actualOpenedFile && actualOpenedFile.extension === 'md') {
                if (!checking) {
                    let contents = await plugin.app.vault.read(actualOpenedFile);
                    const listedPlugin = contents.split(/\r?\n/);
                    written = listedPlugin.map(p=>p.slice(6));
                    let missingPlugin = plugins.filter(val=>!written.includes(val));
                    let removedPlugin = written.filter(val=>!plugins.includes(val));
                    let msg = 'Updated List! ';
                    if (missingPlugin.length === 0 && removedPlugin.length === 0) {
                        msg = 'List sorted alphabetically.';  
                    } 
                    if (removedPlugin.length > 0) {
                        removedPlugin.forEach(p=>{
                            const replacer = new RegExp('\\- \\[.?\\] ' + p, "i");
                            contents = contents.replace(replacer, '');
                        });
                        msg += `${removedPlugin.length} plugin(s) deleted `;
                    }
                    contents = contents.split('\n')
                        .sort((a, b) => a.replace(/\- ((\[{2})|(\[.\]) )?/i, '')
                        .toLowerCase()
                        .localeCompare(b.replace(/\- ((\[{2})|(\[.\]) )?/i, '')
                        .toLowerCase()))
                        .join('\n');
                    if (missingPlugin.length > 0) {
                        contents = contents + '\n- [ ] ' + missingPlugin.join('\n- [ ] ');
                        msg += `${missingPlugin.length} plugin(s) added`;
                    }
                    await plugin.app.vault.modify(actualOpenedFile, contents.trim());
                    await new Notice(msg);
                }
                return true;
            }
            return false;
        }
    });

    async function fastStart(file, shortDelay, longDelay){
      const contents = await plugin.app.vault.read(file);
        let allPlugins = contents.split(/r?\n/);
        let short = [];
        let long = [];
        let disable = [];
        for (let i = 0; i<allPlugins.length; i++) {
            if (allPlugins[i].startsWith('- [x]')) {
                short.push(allPlugins[i].slice(6, allPlugins.lenth))
            } else if (allPlugins[i].startsWith('- [>]')) {
                long.push(allPlugins[i].slice(6, allPlugins.lenth))
            } else if (allPlugins[i].startsWith('- [c]')) {
                disable.push(allPlugins[i].slice(6, allPlugins.lenth))
            }
        }
        setTimeout(async () => {
            short.forEach(async p => {
                await plugin.app.plugins.enablePlugin(p)
            }, shortDelay * 1000);
        });
        setTimeout(async () => {
            long.forEach(async p => {
                await plugin.app.plugins.enablePlugin(p)
            }, longDelay * 1000);
        });
        disable.forEach(async p => {
            await plugin.app.plugins.disablePlugin(p)
        });
    }


    plugin.addCommand({
        id: 'Startup-script',
        name: 'Startup script',
        callback: async () => {
            const findFile = plugin.app.vault.getFiles()
            console.log(findFile);
            try{
            if (!plugin.app.isMobile) {
                const PCFile = findFile.find(f=>f.name === 'PC.md');
                await fastStart(PCFile, 2, 8);
            } else {
                const MobileFile = findFile.find(f=>f.name === 'Mobile.md');
                await fastStart(MobileFile, 8, 15);
            }} catch(e){
              new Notice(e)
            }
        }
    });
}
