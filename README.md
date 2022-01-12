![Free DIALOG+ Logo](public/android-chrome-192x192.png)

# Free DIALOG+

Free DIALOG+ is a free, [open-source](https://en.wikipedia.org/wiki/Open_source), web-based implementation of the [DIALOG+ therapeutic intervention](https://dialog.elft.nhs.uk).

At the time of writing, it is compatible with all modern browsers, both on desktop and mobile. As a [progressive web application (PWA)](https://en.wikipedia.org/wiki/Progressive_web_application), it can be installed and used like a native app on many systems. Please refer to [this guide](https://mobilesyrup.com/2020/05/24/how-install-progressive-web-app-pwa-android-ios-pc-mac/) for detailed instructions.

## Demo

Visit [the demo page](https://dialogplus.layer9.technology) to see Free DIALOG+ in action.

## Data protection, data safety & compliance

Free DIALOG+ stores all data in the user's browser cache. No assessment data is transferred to the server under any circumstances.

This means that clearing your browser cache will delete all existing data in Free DIALOG+. Moreover, the browser may decide to delete the cache due to lack of resources.

You are encouraged to make regular backups using the export functionality (see below) and to install the app as a PWA, which usually causes a dedicated cache to be created.

To use Free DIALOG+ in a clinical setting, it is highly recommended that you deploy your own version of the application. You will probably want to adapt the code to satisfy your own technical and compliance requirements.

The demo deployment is intended for demonstration purposes, for use in more casual settings where loss of patient data is of little consequence and as a foundation for further development.

## Password recovery

Due to the lack of a data server, there is currently no way to recover a lost password. If you forget your password, clearing the cache/re-installing the PWA will reset the password, but also cause all existing data to be irretrievably lost. Please perform regular exports to mitigate the risk of losing your data.

## Device synchronisation

Due to the fact that all data remains on the users' devices, synchronising data between devices currently requires a manual export, followed by an import on the second device (see below).

## Export & import

### Export

In the clients or the assessments screen, tap the ![arrow out of box](public/box-arrow-up.svg) icon to start selecting clients/assessments to export. Tap the button again, enter a password to protect the export and confirm. A password-protected ZIP file containing your data in CSV format will be created.

### Import

In the clients screen, tap the ![arrow into box](public/box-arrow-in-down.svg) icon to import a ZIP file. You will be prompted for the password you specified during the export.

## Languages

The application is currently available in British English and German.

If you would like to contribute a new translation, your translator will need [this file](https://raw.githubusercontent.com/Layer9Berlin/free-dialog-plus/main/src/locales/de/messages.po) to know what to translate. They should be familiar with this file type and should be able to convert it into the required language. Once you have the translated file, either open a pull request (if you know this works) or simply [get in touch](https://layer9.berlin).

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run extract`

Extract strings into translation .po files located in the `locales` folder.\
Translations can be added or updated in these files.

### `npm run compile`

Use this command to compile new or updated translations into the app.\

For more information, see [the LinguiJS documentation](https://lingui.js.org).

## Licence

The application code is made freely available under a [GPLv3 licence](https://en.wikipedia.org/wiki/GNU_General_Public_License). In short, this means that you are free to use it for any purpose, provided that you release your changes under the same terms.

If you require a different licence, e.g. for use in a closed-source application, please [contact us](https://layer9.berlin).

This software is provided without warranty. The software author or license can not be held liable for any damages inflicted by the software.
