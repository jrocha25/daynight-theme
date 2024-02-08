import * as vscode from 'vscode';
import * as lib from './lib/helpers';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand(`${lib.extensionName}.setLocation`, lib.setLocation);
	context.subscriptions.push(disposable);
	disposable = vscode.commands.registerCommand(`${lib.extensionName}.setThemes`, lib.setThemes);
	context.subscriptions.push(disposable);
	disposable = vscode.commands.registerCommand(`${lib.extensionName}.turnOn`, lib.turnOn);
	context.subscriptions.push(disposable);
	disposable = vscode.commands.registerCommand(`${lib.extensionName}.turnOff`, lib.turnOff);
	context.subscriptions.push(disposable);

	lib.checkTimesRoutine();

	setInterval(lib.checkTimesRoutine, 5 * 60 * 1000);

	console.log(`${lib.extensionName} is now active!`);
}

// This method is called when your extension is deactivated
export function deactivate() {
	lib.cleanUp();
}
