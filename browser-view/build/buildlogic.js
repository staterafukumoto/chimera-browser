var electronInstaller = require('electron-winstaller');

function getInstallDir(){
    var inst = __dirname.replace("browser-view\\build","")
    return inst
}

function makeBuild(){
    resultPromise = electronInstaller.createWindowsInstaller({
        appDirectory: getInstallDir(),
        outputDirectory: 'C:\\ch-installer',
        authors: urlsafevendor,
        exe: appname + ".exe",
        setupExe: appname + "_installer.exe"
      });
      resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));
}