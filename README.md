<h1 align="center">markdown-note</h1>
<p align="center">
    <img src="https://img.shields.io/badge/made_by-vercel-D75F5B.svg"/>
    <img src="https://img.shields.io/badge/react-18.1.0-yellow.svg"/>
    <img src="https://img.shields.io/badge/next.js-12.1.6-green.svg"/>
    <img src="https://img.shields.io/github/languages/top/mawermeow/markdown-note?color=0075a2"/>
    <img src="https://badges.frapsoft.com/os/v1/open-source.svg"/>
</p>

## Demo

Live at [note.mawer.cc](https://note.mawer.cc)

## Description

I wanted a bullet note application that is concise, elegant and can help thinking, but I couldn't find a suitable one, so I made one myself with Next.js.

If you have tried all the note-taking software you have heard, you are welcome to try it out, clone it back and make your own if you like it, and share with me what you have done!


## How to use
It is a markdown-like rich text note with many additional functions, all additional functions are done through shortcut keys, toolbars or special menus.

### Status Indicator
![](https://media.giphy.com/media/O8GpZT879zZeO1cs1r/giphy.gif)

It is at the top right of the screen and will display the detailed information returned by fetch. If you find it annoying, you can click to close the text section, leaving it just a small dot.

### Change Title

![](https://media.giphy.com/media/VncacSxMgLOHzLEOaR/giphy.gif)

Click the active note label to edit the title.

### Toolbar

![](https://media.giphy.com/media/dowuWQY6EfuRPF1E34/giphy.gif)
![](https://media.giphy.com/media/He02ACSfKwilEwiQUx/giphy.gif)

The toolbar will float at the top of the window and can be edited and saved via the gear icon.

Note that the keyboard of the phone may make the toolbar error, please click the upper half of the screen to enter the editing mode to prevent this problem.

### Save
![](https://media.giphy.com/media/FfZlTmGBqWbnMOnp1q/giphy.gif)

You can use the save button in the toolbar or click outside the editor's window to save.

### Image
![](https://media.giphy.com/media/yBssSAcoFXNFxrho9p/giphy.gif)

After copying the image URL, click `Meta`+`J` on the keyboard to paste it directly, or use the image icon in the toolbar to paste the image URL.

### Delete
![](https://media.giphy.com/media/EifXYjGCBfJKzPd3hn/giphy.gif)

Click the delete icon and confirm to delete the note.

### Link
![](https://media.giphy.com/media/RgGyR6Q3Yt91bRjKhQ/giphy.gif)

After copying the link, select the text you want to inject the link, and then click `Meta`+`K` on the keyboard to paste it directly, or use the link icon in the toolbar to paste the URL.

### Other
Other functions and shortcut keys can be found in the shortcut key description in the [Demo](https://note.mawer.cc/).

## About the project

### Built With ⚡
* React
* Next JS & TypeScript
* Tiptap
* Next-Auth
* Bcryptjs
* Mongodb
* React-Icons

## Project setup

### Installation 🔧
1. Clone this repo by running `git clone mawermeow/markdown-note`
2. `cd markdown-note`
3. `npm install`
4. Edit `next.config.js`, add your own mongodb data
5. The files using this environment variables are stored in `lib/database.ts`
6. `npm run dev`

### next.config.js
```js
const nextConfig = () => {
    return {
        env: {
            mongodb_username: 'your-username',
            mongodb_password: 'your-password',
            mongodb_clustername: 'your-cluster',
            mongodb_database: 'your-database'
        }
    }
}
```