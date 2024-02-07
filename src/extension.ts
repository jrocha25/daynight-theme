import * as vscode from 'vscode';
import { setLocation, setThemes, checkTimesRoutine, extensionName, cleanUp } from './lib/helpers';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand(`${extensionName}.setLocation`, setLocation);
	context.subscriptions.push(disposable);
	disposable = vscode.commands.registerCommand(`${extensionName}.setThemes`, setThemes);
	context.subscriptions.push(disposable);

	checkTimesRoutine();

	// setInterval(checkTimes, 5 * 60 * 1000);
	setInterval(checkTimesRoutine, 10 * 1000);

	console.log(`${extensionName} is now active!`);
}

// This method is called when your extension is deactivated
export function deactivate() {
	cleanUp();
}
