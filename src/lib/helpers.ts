import * as vscode from 'vscode';
import { get } from 'axios';

type CountriesAPIResponse = {
  success: boolean;
  message: string;
  data: {
    name: string;
  }[];
};

export const extensionName = 'daynight-theme';

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
  try {
    const response = await get<CountriesAPIResponse>('http://localhost:8080/v1/countries');
    const locations = response.data.data.map(location => location.name);

    const selectedLocation = await vscode.window.showQuickPick(locations, {
      placeHolder: 'Select your location',
    });

    if (selectedLocation) {
      let configuration = vscode.workspace.getConfiguration(extensionName);
      configuration.update('location', selectedLocation, vscode.ConfigurationTarget.Global);
      vscode.window.showInformationMessage(`You selected: ${selectedLocation}`);
    }
  } catch (error) {
    console.error('Failed to fetch locations:', error);
    vscode.window.showErrorMessage('Failed to fetch locations');
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