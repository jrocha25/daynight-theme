# DayNight Theme

## Description

DayNight Theme is a Visual Studio Code extension that automatically changes your VS Code theme based on the time of day. It uses your location to determine the sunrise and sunset times, and switches between a day theme and a night theme accordingly.

This extension is ***powered by the [SunriseSunset.io](https://sunrisesunset.io/) API***, which provides accurate sunrise and sunset times for any location in the world.

## Installation

1. Open Visual Studio Code
2. Go to the Extensions view (Ctrl+Shift+X)
3. Search for "DayNight Theme"
4. Click on the Install button

## Usage

After installing the extension, you need to set your location and choose your preferred day and night themes. You can do this by running the following commands from the Command Palette (Ctrl+Shift+P):

- `DayNight Theme: Set Location`
- `DayNight Theme: Set Themes`

You can also manually toggle the automatic theme change feature with these commands:

- `DayNight Theme: Turn on Day/Night Theme Cycle`
- `DayNight Theme: Turn off Day/Night Theme Cycle`

## Extension Settings

This extension contributes the following settings:

- `daynight-theme.location`: The location to use for the day/night cycle
- `daynight-theme.dayTheme`: The theme to use during the day
- `daynight-theme.nightTheme`: The theme to use during the night
- `daynight-theme.isTurnedOn`: Whether the day/night cycle is turned on

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) for details on how to contribute to this project.

## Changelog

See the [CHANGELOG.md](CHANGELOG.md) file for the changes made in each version of the extension.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you encounter any issues or have any questions about this extension, please open an issue on our [GitHub repository](https://github.com/joaorocha281/daynight-theme).
