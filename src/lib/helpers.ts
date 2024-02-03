import * as vscode from 'vscode';

export const extensionName = 'daynight-dynamix';

export function changeThemeBasedOnTime() {
  //TODO: Add a API call to get the user's location and then use the sunrise-sunset API to get the sunrise and sunset times
  const hour = 20;
  // const hour = new Date().getHours();
  const configuration = vscode.workspace.getConfiguration();
  const dayTheme = configuration.get('dayTheme');
  const nightTheme = configuration.get('nightTheme');

  if (hour >= 6 && hour < 18) {
    // Day theme
    configuration.update('workbench.colorTheme', dayTheme, vscode.ConfigurationTarget.Global);
  } else {
    // Night theme
    configuration.update('workbench.colorTheme', nightTheme, vscode.ConfigurationTarget.Global);
  }
}

export async function setLocation() {
  const userInput = await vscode.window.showInputBox({ placeHolder: 'Enter your location' });
  if (userInput) {
    vscode.window.showInformationMessage(`You entered: ${userInput}`);
  }
}

export function changeTheme() {
  changeThemeBasedOnTime();
}

export async function setThemes() {
  const themeExtensions = vscode.extensions.all.filter(extension => {
    return extension.packageJSON.contributes && extension.packageJSON.contributes.themes;
  });

  // Get the names of all themes
  const themeNames = themeExtensions.flatMap(extension => {
    return extension.packageJSON.contributes.themes.map((theme: any) => theme.label);
  });

  // Ask the user to select a theme
  const selectedDayTheme = await vscode.window.showQuickPick(themeNames, {
    placeHolder: 'Select a day theme',
  });

  const selectedNightTheme = await vscode.window.showQuickPick(themeNames, {
    placeHolder: 'Select a night theme',
  });

  if (selectedDayTheme && selectedNightTheme) {
    let configuration = vscode.workspace.getConfiguration(extensionName);
    configuration.update('dayTheme', selectedDayTheme, vscode.ConfigurationTarget.Global);
    configuration.update('nightTheme', selectedNightTheme, vscode.ConfigurationTarget.Global);
  }
}