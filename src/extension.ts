import * as vscode from 'vscode';
import { setLocation, setThemes, checkTimes, extensionName } from './lib/helpers';

export function activate(context: vscode.ExtensionContext) {

	console.log(`Congratulations, your extension "${extensionName}" is now active!`);

	let disposable = vscode.commands.registerCommand(`${extensionName}.setLocation`, setLocation);
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand(`${extensionName}.setThemes`, setThemes);
	context.subscriptions.push(disposable);

	// setInterval(changeThemeBasedOnTime, 1000 * 60 * 5); // 5 minutes

	setInterval(checkTimes, 10 * 1000);

}

// This method is called when your extension is deactivated
export function deactivate() { }
