# velostics-app-workspace

# velostics-mobile-workspace

# starting up the project

This project needs few steps to start,


## IOS:

After cloning the project, 
`yarn install or npm install` to install dependencies

Note: It will also run a `postinstall` script, which copies all the content of `shared` folder to `velosticsdriver/node_modules/@velostics/shared`

`cd ios && pod install` to install pods

after the pods are finished,
open the project in `xcode workspace` and you will see `GoogleInfo.plist` in the project, buy sometimes `xcode` doesn't link the files properly. So to be on the safer side.

`right click on the project directory` and `add files to velosticsdriver` and add `googleinfo.plist`. It will make sure the `plist` is linked to our project

after these steps are finished. run `yarn ios` to start the project.



## Android:
After cloning the project, 
`yarn install or npm install` to install dependencies

Make sure you emulator is running or a device is connected to your system with usb debugging enabled.
Run `yarn android` to start android.

You will see an error while running the android (Expression ...). Don't worry, you see this because by default android runs an old node version. and that node version doesn't support `intl` correctly.
You can solve this:

https://github.com/formatjs/react-intl/issues/1356
https://github.com/formatjs/react-intl/issues/992

Or if you don't want to, you can just enable `remote js debugging` by shaking your phone, what will happen is that it will run the node from the chrome as it is debugging.


## Development
As you may have noticed, a lot of code sits in the `shared` folder, its because we might need some of the code for velostics app as well, so it has been archetectured this way. (Reusability).

So when you change something in shared folder, you may want to make sure that the code gets copied to `velosticsdriver/node_modules/@velostics/shared` or `velostics-app....`, For now there isn't a good way to use symlinks with react native.
So what we can do is,
First install the tool called `wml`

https://github.com/wix/wml

Then you can add a watcher, which will watch for the changes inside shared folder and copies it to respective folders.

Example:
`wml add ~/my-package ~/main-project/node_modules/my-package`

in our case it would be `wml add ../shared ./node_modules/@velostics/shared`
Note: For these paths to work, make sure you are inside `velsoticsdriver`

You can do this outside velosticsdriver as well, just make sure the paths are right.
