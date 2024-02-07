import * as vscode from 'vscode';
import { setLocation, setThemes, checkTimes, extensionName } from './lib/helpers';

export function activate(context: vscode.ExtensionContext) {

	console.log(`Congratulations, your extension "${extensionName}" is now active!`);

	let disposable = vscode.commands.registerCommand(`${extensionName}.setLocation`, setLocation);
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand(`${extensionName}.setThemes`, setThemes);
	context.subscriptions.push(disposable);

	setInterval(checkTimes, 5 * 60 * 1000);

}

// This method is called when your extension is deactivated
export function deactivate() { }
