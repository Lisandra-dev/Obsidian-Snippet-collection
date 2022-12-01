Each script here must be used with [User Plugins](https://github.com/mnowotnik/obsidian-user-plugins)

# [Fast Start](Fast-start.js)

This script allow to start your Obsidian Vault without waiting for the vault to load all plugins, with delayed it.
First, identify on PC & mobile plugin that lengthen the loading time of your vault.

1. Create "Mobile.md" & "PC.md" file in your vault
2. In each file run `List installed plugins`
   - `[>]` indicate a long delay
   - `[x]` indicate a short delay
   - `[c]` indicate a plugin that will be disabled
   - `[ ]` indicate a plugin that will be enabled (default) => There are the plugins you need to keep to run at startup!
3. Register the startup script command with [Commander](https://github.com/phibr0/obsidian-commander) (Macro -> Startup script ; Auto-Run on Startup -> true)
   Depending on the device, you maybe need to add a little delay for the macro to run after the vault is loaded.

# [Links copy](filepath_copy.js)

Create a new file menu and editor menu commands, that allow to copy the **hard link** of the current file or folder.

Usefull if you need to do some work on folder or file in another editor. 

# [Add space to quote](space-quote.js)

Just add a space after the `>` when you forgot it.
Useful when used with linter.

