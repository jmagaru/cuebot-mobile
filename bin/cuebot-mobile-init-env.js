/*
 * Copyright 2020 Jonathan Magaru <jonathan.magaru.code@gmail.com>
 * Licensed under the MIT license. See LICENSE.
 *
 * Cuebot-Mobile | Script for Setting mobile test environment on windows
 */
const fs = require("fs");

module.exports.default = () => {
  // Initiate folder creation
  const infraLocation = "./environment";

  process.stdout.write("[ ACTION ] - Creating environment folder...");
  if (!fs.existsSync(infraLocation)) {
    fs.mkdirSync(infraLocation);
    process.stdout.write("done.\n");
  } else {
    process.stdout.write("already exists.\n");
  }

  let archive_folder = process.cwd();

  // Creating Batch scripts and Property File
  process.stdout.write("[ ACTION ] - Creating Environment Setup batch file...");
  let env_batch_script =
    "@echo off\n"+
    "net.exe session 1>NUL 2>NUL || (Echo [ CRITICAL ] This script needs to be Run As Administrator & pause & Exit /b 1)\n"+
    "REM Declaring variables for archive sources \n"+
    "For /F \"tokens=1* delims==\" %%A IN ("+archive_folder+"\\environment\\archive.properties) DO ( \n"+
    "\t set %%A=%%B \n"+
    ")\n\n"+
    "REM Creating Folder List\n"+
    "set android-sdk-folder=c:\\workspace\\apps\\sdk\\android\n"+
    "set java-sdk-folder=c:\\workspace\\apps\\sdk\\java\n"+
    "set app-installer-folder=c:\\workspace\\apps\\installer\n"+
    "set folders=%android-sdk-folder% %app-installer-folder% %java-sdk-folder%\n"+
    "for %%a in (%folders%) do (  \n"+  
    "\t if not exist %%a ( \n"+
    "\t\t echo [ INFO ] - Creating folder : %%a\n"+
    "\t\t mkdir %%a\n"+
    "\t ) else ( \n"+
    "\t\t echo [ WARN ] - Folder already exist : %%a\n"+
    "\t )\n"+
    ") \n\n"+
    "REM Download and install 7zip tools\n"+
    "set download-url=%ZIP_EXE%\n"+
    "echo [ INFO ] - Downloading 7zip extracting tools from %download-url%\n"+
    "cd %app-installer-folder%\n"+
    "curl -o 7zip-installer.exe %download-url%\n"+
    "echo [ INFO ] - Installing 7zip extraction tool\n"+
    "start /wait 7zip-installer.exe /S\n"+
    "set zip-command-folder=C:\\Program Files\\7-Zip\n\n"+
    "REM Download the Android command-line tools\n"+
    "set download-url=%ANDROID_CMD_TOOLS%\n"+
    "echo [ INFO ] - Downloading android command-line tools from %download-url%\n"+
    "cd %app-installer-folder%\n"+
    "curl -o android-sdk.zip %download-url%\n"+
    "REM powershell Invoke-WebRequest -Uri %download-url% -OutFile android-sdk.zip\n"+
    "set zip-archive=%app-installer-folder%\\android-sdk.zip\n"+
    "echo [ INFO ] - Extracting android command-line tools\n"+
    "\"%zip-command-folder%\\7z.exe\" x %zip-archive% -o%android-sdk-folder%\\cmdline-tools \n\n"+
    "REM Download the JAVA JDK\n"+
    "set download-url=%JAVA_JDK%\n"+
    "echo [ INFO ] - Downloading JAVA JDK from %download-url%\n"+
    "cd %app-installer-folder%\n"+
    "curl  -L -b \"oraclelicense=a\" -o java-jdk-15.zip %download-url%\n"+
    "set zip-archive=%app-installer-folder%\\java-jdk-15.zip\n"+
    "echo [ INFO ] - Extracting JAVA JDK\n"+
    "\"%zip-command-folder%\\7z.exe\" x %zip-archive% -o%java-sdk-folder% \n\n"+
    "REM Setting system Environment Variables\n"+
    "echo [ INFO ] - Setting Up System Environment Variables\n"+
    "setx JAVA_HOME %java-sdk-folder%\\jdk-15.0.1 /m\n"+
    "setx ANDROID_SDK_ROOT %android-sdk-folder% /m\n"+
    "setx PATH \"%PATH%;%%ANDROID_SDK_ROOT%%\\cmdline-tools\\tools\\bin;%%ANDROID_SDK_ROOT%%\\cmdline-tools\\tools\\lib;%%ANDROID_SDK_ROOT%%\\cmdline-tools\\tools;%%ANDROID_SDK_ROOT%%\\platform-tools;%%ANDROID_SDK_ROOT%%\\emulator;%%JAVA_HOME%%\\bin;%%JAVA_HOME%%\\lib;\" /m \n\n"+
    "REM Installing Appium\n"+
    "echo [ INFO ] - Installing Appium Server\n"+
    "npm install -g appium\n\n"+
    "echo [ INFO ] - Environment Setup ... DONE\n"+
    "exit /b 0\n"+
    "\n"
  fs.writeFileSync(infraLocation + "/env-setup.bat", env_batch_script);
  process.stdout.write("Done.\n");

  process.stdout.write("[ ACTION ] - Creating Environment Setup Property file...");
  let env_prop_file =
  "ANDROID_CMD_TOOLS=https://dl.google.com/android/repository/commandlinetools-win-6609375_latest.zip \n"+
  "JAVA_JDK=https://download.oracle.com/otn-pub/java/jdk/15.0.1+9/51f4f36ad4ef43e39d0dfdbaf6549e32/jdk-15.0.1_windows-x64_bin.zip \n"+
  "ZIP_EXE=https://www.7-zip.org/a/7z1900-x64.exe \n"+
   "\n"
  fs.writeFileSync(infraLocation + "/archive.properties", env_prop_file);
  process.stdout.write("Done.\n");

  process.stdout.write("[ ACTION ] - Creating Emulator Setup Batch file...");
  let emu_batch_script =
  "REM @echo on \n"+
  "call sdkmanager --update\n"+
  "echo [ ACTION ] - Downloading System Images : Android-29\n"+
  "call echo yes | sdkmanager \"platform-tools\" \"platforms;android-29\" \"system-images;android-29;default;x86\"\n"+
  "echo [ ACTION ] - Activating licenses\n"+
  "call sdkmanager --licenses < file-y.txt\n"+
  "echo [ ACTION ] - Creating Default Emulator : generic_10\n"+ 
  "echo no | avdmanager --verbose create avd --force --name \"generic_10\" --package \"system-images;android-29;default;x86\" --tag \"default\" --abi \"x86\"\n"+
  "echo [ ACTION ] - Launching emulator : generic_10\n"+
  "start cmd /k emulator -avd generic_10 -no-snapshot-save -no-boot-anim\n"+
  "start cmd /k appium -a 0.0.0.0 -p 4723\n"+
  "timeout 30 /nobreak \n"+
   "\n"
  fs.writeFileSync(infraLocation + "/emu-setup.bat", emu_batch_script);
  process.stdout.write("Done.\n");

  process.stdout.write("[ ACTION ] - Creating Emulator Setup Support file...");
  let emu_support_file =
  "y\n"+
  "y\n"+
  "y\n"+
  "y\n"+
  "y\n"+
  "y\n"+
  "y\n"+
  "y\n"
  fs.writeFileSync(infraLocation + "/file-y.txt", emu_support_file);
  process.stdout.write("Done.\n");


};

