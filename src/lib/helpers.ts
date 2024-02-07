import * as vscode from 'vscode';
import { get } from 'axios';
import { CountriesAPIResponse, Times } from '../types';

const API_URL = 'https://api.daynight-theme.dev';
export const extensionName = 'daynight-theme';

export async function checkTimes() {
  // Gets all the configuration settings for the extension
  let configuration = vscode.workspace.getConfiguration(extensionName);

  if (!configuration.get('location')) {
    return;
  }

  if (!configuration.get('dayTheme') || !configuration.get('nightTheme')) {
    return;
  }

  // Get the location from the configuration
  const location = configuration.get('location');

  const response = await get<Times>(API_URL + '/v1/times?location=' + location);
  if (response.data.success) {
    const times = response.data.data;
    const dayTheme = configuration.get('dayTheme') as string;
    const nightTheme = configuration.get('nightTheme') as string;

    const currentDate = new Date();
    const sunriseTime = new Date(`${currentDate.toISOString().split('T')[0]}T${times.sunrise}`);
    const sunsetTime = new Date(`${currentDate.toISOString().split('T')[0]}T${times.sunset}`);

    console.log('currentDate:', currentDate);
    console.log('sunriseTime:', sunriseTime);
    console.log('sunsetTime:', sunsetTime);

    if (currentDate >= sunriseTime && currentDate <= sunsetTime) {
      // Day theme
      console.log(dayTheme);
      changeTheme(dayTheme);
      console.log('Day theme');
      return;
    } else {
      // Night theme
      console.log(nightTheme);
      changeTheme(nightTheme);
      console.log('Night theme');
    }
  } else {
    console.error('Failed to fetch times:', response.data.message);
    vscode.window.showErrorMessage('Failed to fetch times');
  }
}

export async function setLocation() {
  try {
    const response = await get<CountriesAPIResponse>(API_URL + '/v1/countries');
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

export async function setThemes() {
  const themeExtensions = vscode.extensions.all.filter(extension => {
    return extension.packageJSON.contributes && extension.packageJSON.contributes.themes;
  });

  // Get the names of all themes
  const themeNames = themeExtensions.flatMap(extension => {
    return extension.packageJSON.contributes.themes.map((theme: any) => {
      if (!theme.id) {
        return theme.label;
      }
      return theme.id;
    });
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

export function changeTheme(themeName: string) {
  vscode.workspace.getConfiguration().update('workbench.colorTheme', themeName, true);
}

export function cleanUp() {
  let configuration = vscode.workspace.getConfiguration(extensionName);
  configuration.update('location', undefined, vscode.ConfigurationTarget.Global);
  configuration.update('dayTheme', undefined, vscode.ConfigurationTarget.Global);
  configuration.update('nightTheme', undefined, vscode.ConfigurationTarget.Global);
}