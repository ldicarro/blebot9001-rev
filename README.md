# BLE Bot 9001 revised

This script updates Martin Kronberg's control.js for the BLE Bot 9000 (hence the 9001 designation). It adds several features that I felt improve the usage of the script and make the robot easier to control.

####Added features:####
 - speed control using 'o' to decrease and 'p' to increase
 - stores what the current command is so speed change refires the command
 - added ready message to know when the bot was available for commands
 
 ####How to use####
 - Follow instructions on the Hackster.io page to build the hardware
 - Load the specified Standard Firmata BLE onto the Arduino
 - Download this code into a directory on a BLE 4.0 enabled computer
 - In the terminal or cmd, run `npm install` to load the required node modules
 - Once the modules are installed, run `node control.js` to start the app
   - Use `a`,`s`,`w`,`d` to steer the robot
   - `q` stops the robot
   - Use `o` to decrease the speed, user `p` to increase the speed
   - `Ctrl-c` quits the app


Original code:
https://github.com/martinkronberg/Firmata-BLE-Bot

Project page:
https://www.hackster.io/29284/ble-bot-9000-c150b8?ref=search&ref_id=ble%20bot%209000&offset=0
