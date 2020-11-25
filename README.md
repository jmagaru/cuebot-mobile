# cuebot-mobile

Cuebot-mobile (CucumberJS for Mobile Application) is a test automation tool wraps CucumberJS Client

- Gherkin format testcases
- Presentable HTML Test Reports
- Interactive console activity logger

### Requirements

- Node Version Manager
- [Node.js](https://nodejs.org/) v10+

### Installation

---

#### NVM and NodeJ installation on Ubuntu

To install NVM, just follow the following shell scripts

```sh
$ sudo apt-get upgrade
$ wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
$ export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

To test if you successfully installed the NVM, get the NMV version by executing the following:

```sh
$  nvm version
#1.1.7
```

After installing the NVM, you can now install the NodeJS using NVM by executing the following command on terminal.

```sh
$ nvm install node
```

To check if you successfully installed the nodejs, just get the version of nodejs by executing this on terminal.

```sh
$ node --version
#v14.5.0
```

To install specific node version just execute the following ( e.g. v13.12.0 )

```sh
$ nvm install v.13.12.0
```

And finally, to use the specific nodeJS version execute the following script ( e.g. v13.12.0 )

```sh
$ nvm use v.13.12.0
```

---

#### NVM and NodeJS installation on Windows

Follow the following steps fopr NMV installation on Windows.

1.  Download the latest nvm-setup.zip on [NVM Releases page](https://github.com/coreybutler/nvm-windows/releases).
2.  Go into the downloaded zip file on your computer and double click the installer.
3.  Continue through all of the prompts. Then, click install.

To check that Node Version Manager actually installed open Command Prompt run the following command.

```
c:\nvm version
1.17
```

To install the latest version of NodeJS using NVM:

```cmd
c:\ nvm install latest
```

To install a specific version of NodeJS using NVM (e.g. v13.12.0):

```cmd
c:\ nvm install 13.12.0
```

To use specific version of NodeJS using NVM (e.g. v13.12.0):

```cmd
c:\ nvm use 13.12.0
```

To see available version of NodeJS from your NVM:

```cmd
c:\ nvm list
```

---

#### Initial Setup for cuebot-mobile

Create you project folder and create initial package file:

```cmd
 mkdir myproject
 cd myproject
 npm init -y
```

Now download and install latest cuebot-mobile

```cmd
 npm install cuebot-mobile@latest
```

To create and initialize sample project, execute the following command

```cmd
 node_modules\.bin\cuebot-mobile --init
```

To run the sample project and display the test report, execute the following command

```cmd
 node_modules\.bin\cuebot-mobile --exec
```

---

### Setting up local mobile test environment (for now, only for Windows)

#### Prepare local machine to support Virtualization

- To be able to run Emulator on your local machine, you must first enable Virtualization (VT-x/AMD/V) by switching it on through BIOS Setup. [Here's some guide on how to enable it.](https://2nwiki.2n.cz/pages/viewpage.action?pageId=75202968#:~:text=Press%20or%20Tap%20F1to%20enter,Press%20F10.)

#### Install HAXM to local machine (for now, only for Windows)

- [Download, extract and install HAXM](https://github.com/intel/haxm/releases/tag/v7.6.5)

#### Generate batch scripts/ Property file

- Run the following to generate the batch scripts and property file

```cmd
node_modules\.bin\cuebot-mobile --setenv
```

#### Setup JAVA and Android SDK

- After the batch scripts has been generated (_under environment folder_),
  right-click on **env-setup.bat** then click **Run as Administrator**

#### Setup and Run default Android emulator and Appium Server

- Double click on **emu-setup.bat**

#### Run Sample Mobile Test

- Run the following to execute sample mobile testcase.

```cmd
node_modules\.bin\cuebot-mobile --exec
```

---

### How to create the test script ???

> By checking the initial feature file (sample.feature under feature folder) and using the available keyword implementations,
> You can get immediately get the idea on how easy to create your next test scenario
> ( please open the sample.feature file on your favorite IDE app )

```
#sample.feature
@cuebot
Feature: My Sample Feature
	As Automation engineer
	I want to verify that all functionality are working as they should

	@testmobile
	Scenario: My Sample Mobile Scenario
		Given that I set "Android" as platform with version of "10"
		Given that I set "emulator-5554" as device
		Given that app is located at "http://apksample.ueuo.com/apk/Kids.apk"
		When I create new session on "http://0.0.0.0:4723/wd/hub"
		Then I wait 5 seconds
		Then I close the session
```

### Final Thoughts

---

- To get the list of available keyword implementation please checkout the docs folder of this [Git repository](https://github.com/jmagaru/cuebot-mobile)
- You can use [VSCode as your IDE](https://code.visualstudio.com/)

###### Just follow the given sample feature format, and you're done!!

###### Happy Automating!!!
