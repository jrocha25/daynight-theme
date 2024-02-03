// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const extensionName = 'daynight-dynamix';

function changeThemeBasedOnTime() {

	//TODO: Add a API call to get the user's location and then use the sunrise-sunset API to get the sunrise and sunset times
	const hour = 20;
	// const hour = new Date().getHours();
	const configuration = vscode.workspace.getConfiguration();

	if (hour >= 6 && hour < 18) {
		// Day theme
		configuration.update('workbench.colorTheme', 'Default Light+', vscode.ConfigurationTarget.Global);
	} else {
		// Night theme
		configuration.update('workbench.colorTheme', 'Default Dark+', vscode.ConfigurationTarget.Global);
	}
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	changeThemeBasedOnTime();

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log(`Congratulations, your extension "${extensionName}" is now active!`);

	let disposable = vscode.commands.registerCommand(`${extensionName}.setLocation`, async () => {
		const userInput = await vscode.window.showInputBox({ placeHolder: 'Enter your location' });
		if (userInput) {
			vscode.window.showInformationMessage(`You entered: ${userInput}`);
		}
	});

	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand(`${extensionName}.changeTheme`, () => {
		changeThemeBasedOnTime();
	});

	context.subscriptions.push(disposable);

	// setInterval(changeThemeBasedOnTime, 1000 * 60 * 5); // 5 minutes
	setInterval(changeThemeBasedOnTime, 10 * 1000);
}

// This method is called when your extension is deactivated
export function deactivate() { }
